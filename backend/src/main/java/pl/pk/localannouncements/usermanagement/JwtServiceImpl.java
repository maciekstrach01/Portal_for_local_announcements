package pl.pk.localannouncements.usermanagement;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Service;
import pl.pk.localannouncements.usermanagement.model.entity.Token;
import pl.pk.localannouncements.usermanagement.model.entity.User;
import pl.pk.localannouncements.usermanagement.model.enums.TokenType;

import java.security.Key;
import java.util.*;
import java.util.function.Function;
import java.util.function.Predicate;

@Service
@RequiredArgsConstructor
class JwtServiceImpl implements JwtService {

    private static final String ACCESS_TOKEN = "access_token";
    private static final String REFRESH_TOKEN = "refresh_token";

    @Value("${application.security.jwt.secret-key}")
    private String secretKey;
    @Value("${application.security.jwt.access-token.expiration}")
    private long jwtAccessTokenExpiration;
    @Value("${application.security.jwt.refresh-token.expiration}")
    private long jwtRefreshTokenExpiration;

    private final TokenRepository tokenRepository;
    private final UserService userService;

    @Override
    public UserDetails extractUser(String token) {
        try {
            String username = extractUsername(token);
            return userService.findUserByEmail(username)
                    .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        } catch (Exception e) {
            throw new UsernameNotFoundException("User not found");
        }
    }

    @Override
    public String generateAccessToken(User user) {
        Date expirationDate = new Date(System.currentTimeMillis() + jwtAccessTokenExpiration);
        return buildToken(user.getUsername(), ACCESS_TOKEN, expirationDate);
    }

    @Override
    public String generateRefreshToken(User user) {
        revokeAllUserTokens(user);
        Date expirationDate = new Date(System.currentTimeMillis() + jwtRefreshTokenExpiration);
        String token = buildToken(user.getUsername(), REFRESH_TOKEN, expirationDate);
        saveUserToken(user, token, expirationDate);
        return token;
    }

    @Override
    public Optional<String> extractAndValidateAccessToken(HttpServletRequest request) {
        return extractAndValidateToken(request, this::isAccessToken);
    }

    @Override
    public Optional<String> extractAndValidateRefreshToken(HttpServletRequest request) {
        return extractAndValidateToken(request, this::isRefreshToken);
    }

    private Optional<String> extractAndValidateToken(HttpServletRequest request, Predicate<String> tokenTypeChecker) {
        try {
            return Optional.ofNullable(extractJwtFromHeader(request))
                    .filter(tokenTypeChecker)
                    .flatMap(jwt -> {
                        UserDetails userDetails = extractUser(jwt);
                        return isTokenValid(jwt, userDetails) ? Optional.of(jwt) : Optional.empty();
                    });
        } catch (Exception e) {
            return Optional.empty();
        }
    }

    @Override
    public void authenticateUser(String jwt, HttpServletRequest request) {
        UserDetails userDetails = extractUser(jwt);
        if (SecurityContextHolder.getContext().getAuthentication() == null) {
            UsernamePasswordAuthenticationToken authToken = createAuthToken(userDetails, request);
            SecurityContextHolder.getContext().setAuthentication(authToken);
        }
    }

    @Override
    public void revokeToken(String token) {
        Token storedToken = tokenRepository.findByToken(token)
                .orElse(null);
        if (storedToken != null) {
            storedToken.setRevoked(true);
            tokenRepository.save(storedToken);
        }
    }

    private UsernamePasswordAuthenticationToken createAuthToken(UserDetails userDetails, HttpServletRequest request) {
        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                userDetails,
                null,
                userDetails.getAuthorities()
        );
        authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
        return authToken;
    }

    private boolean isTokenExpired(String token) {
        return tokenRepository.findByToken(token)
                .map(storedToken -> extractExpiration(token).before(new Date()) || storedToken.isRevoked())
                .orElseGet(() -> extractExpiration(token).before(new Date()));
    }

    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    private void revokeAllUserTokens(User user) {
        List<Token> validUserTokens = tokenRepository.findAllValidTokenByUser(user.getId());
        validUserTokens.forEach(token -> token.setRevoked(true));
        tokenRepository.saveAll(validUserTokens);
    }

    private void saveUserToken(User user, String jwtToken, Date expirationDate) {
        var token = Token.builder()
                .user(user)
                .token(jwtToken)
                .tokenType(TokenType.BEARER)
                .revoked(false)
                .expirationDate(expirationDate.toInstant())
                .build();
        tokenRepository.save(token);
    }

    private String buildToken(String username, String type, Date expirationDate) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("type", type);
        claims.put("jti", UUID.randomUUID().toString());

        return Jwts.builder()
                .setClaims(claims)
                .setSubject(username)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(expirationDate)
                .signWith(getSignInKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    private <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        return Jwts
                .parserBuilder()
                .setSigningKey(getSignInKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    private Key getSignInKey() {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    private String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    private String extractJwtFromHeader(HttpServletRequest request) {
        final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
        if (authHeader == null || !authHeader.startsWith("Bearer")) {
            return null;
        }
        return authHeader.substring(7);
    }

    private boolean isAccessToken(String token) {
        return ACCESS_TOKEN.equals(extractClaim(token, claims -> claims.get("type")));
    }

    private boolean isRefreshToken(String token) {
        return REFRESH_TOKEN.equals(extractClaim(token, claims -> claims.get("type")));
    }

    private boolean isTokenValid(String token, UserDetails userDetails) {
        if (isTokenExpired(token)) {
            return false;
        }
        String username = extractUsername(token);
        return username.equals(userDetails.getUsername());
    }

}
