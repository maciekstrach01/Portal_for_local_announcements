package pl.pk.localannouncements.usermanagement;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.HttpServletRequest;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.test.util.ReflectionTestUtils;
import pl.pk.localannouncements.usermanagement.model.entity.Token;
import pl.pk.localannouncements.usermanagement.model.entity.User;
import pl.pk.localannouncements.usermanagement.model.enums.TokenType;
import pl.pk.localannouncements.utils.UnitTest;

import java.time.Instant;
import java.util.Collections;
import java.util.Date;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@UnitTest
class JwtServiceImplTest {

    @Mock
    private TokenRepository tokenRepository;

    @Mock
    private UserService userService;

    @InjectMocks
    private JwtServiceImpl jwtService;

    @BeforeEach
    void setup() {
        ReflectionTestUtils.setField(jwtService, "secretKey", "Y29tcGxleC1zZWN1cmUta2V5LXdpdGgtYS1zdWZmaWNpZW50LWxlbmd0aA=="); // 256-bit klucz
    }

    @Test
    void extractUser_Success() {
        String username = "john.doe@example.com";
        User user = mockUser();

        // Arrange
        ReflectionTestUtils.setField(jwtService, "secretKey", "Y29tcGxleC1zZWN1cmUta2V5LXdpdGgtYS1zdWZmaWNpZW50LWxlbmd0aA=="); // Base64 klucz 256-bit
        String token = Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60)) // 1 godzina
                .signWith(Keys.hmacShaKeyFor(Decoders.BASE64.decode("Y29tcGxleC1zZWN1cmUta2V5LXdpdGgtYS1zdWZmaWNpZW50LWxlbmd0aA==")), SignatureAlgorithm.HS256)
                .compact();

        when(userService.findUserByEmail(username)).thenReturn(Optional.of(user));

        // Act
        UserDetails result = jwtService.extractUser(token);

        // Assert
        assertEquals(user, result);
        verify(userService).findUserByEmail(username);
    }

    @Test
    void extractUser_InvalidToken_ThrowsUsernameNotFoundException() {
        String token = "invalid-token";

        // Act & Assert
        assertThrows(UsernameNotFoundException.class, () -> jwtService.extractUser(token));
    }

    @Test
    void generateAccessToken_Success() {
        User user = mockUser();

        // Act
        String token = jwtService.generateAccessToken(user);

        // Assert
        assertNotNull(token);
    }

    @Test
    void generateRefreshToken_Success() {
        User user = mockUser();

        // Act
        String token = jwtService.generateRefreshToken(user);

        // Assert
        assertNotNull(token);
    }

    @Test
    void generateRefreshToken_SavesTokenInRepository() {
        User user = mockUser();
        String secretKey = "Y29tcGxleC1zZWN1cmUta2V5LXdpdGgtYS1zdWZmaWNpZW50LWxlbmd0aA==";
        ReflectionTestUtils.setField(jwtService, "jwtRefreshTokenExpiration", 1000 * 60 * 60);
        ReflectionTestUtils.setField(jwtService, "secretKey", secretKey);

        // Arrange
        Instant expectedExpirationInstant = Instant.now().plusSeconds(3600);

        when(tokenRepository.findAllValidTokenByUser(user.getId())).thenReturn(Collections.emptyList());

        // Act
        String generatedToken = jwtService.generateRefreshToken(user);

        // Assert
        assertNotNull(generatedToken);

        verify(tokenRepository).save(argThat(savedToken ->
                savedToken.getToken().equals(generatedToken) &&
                        !savedToken.isRevoked() &&
                        savedToken.getTokenType() == TokenType.BEARER &&
                        savedToken.getExpirationDate().isBefore(expectedExpirationInstant.plusMillis(1000)) &&
                        savedToken.getExpirationDate().isAfter(expectedExpirationInstant.minusMillis(1000)) &&
                        savedToken.getUser().equals(user)
        ));

        verify(tokenRepository).findAllValidTokenByUser(user.getId());
    }

    @Test
    void isRefreshTokenValid_ValidToken_ReturnsTrue() {
        String username = "john.doe@example.com";
        String secretKey = "Y29tcGxleC1zZWN1cmUta2V5LXdpdGgtYS1zdWZmaWNpZW50LWxlbmd0aA==";

        String token = Jwts.builder()
                .setSubject(username)
                .claim("type", "refresh_token")
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60))
                .signWith(Keys.hmacShaKeyFor(Decoders.BASE64.decode(secretKey)), SignatureAlgorithm.HS256)
                .compact();

        Token validToken = Token.builder()
                .token(token)
                .tokenType(TokenType.BEARER)
                .revoked(false)
                .expirationDate(new Date(System.currentTimeMillis() + 1000 * 60 * 60).toInstant())
                .build();

        UserDetails userDetails = mock(UserDetails.class);

        when(userDetails.getUsername()).thenReturn(username);
        when(tokenRepository.findByToken(token)).thenReturn(Optional.of(validToken));

        // Act
        boolean result = jwtService.isRefreshTokenValid(token, userDetails);

        // Assert
        assertTrue(result);
        verify(tokenRepository).findByToken(token);
    }

    @Test
    void revokeToken_Success() {
        String token = "revoked-token";
        Token storedToken = mockToken();

        // Arrange
        when(tokenRepository.findByToken(token)).thenReturn(Optional.of(storedToken));

        // Act
        jwtService.revokeToken(token);

        // Assert
        verify(tokenRepository).findByToken(token);
        verify(tokenRepository).save(storedToken);
        assertTrue(storedToken.isRevoked());
    }

    @Test
    void revokeToken_TokenNotFound_NoInteraction() {
        String token = "non-existent-token";

        // Arrange
        when(tokenRepository.findByToken(token)).thenReturn(Optional.empty());

        // Act
        jwtService.revokeToken(token);

        // Assert
        verify(tokenRepository).findByToken(token);
        verify(tokenRepository, never()).save(any(Token.class));
    }

    @Test
    void extractAndValidateAccessToken_ValidToken_ReturnsToken() {
        String username = "john.doe@example.com";
        String token = Jwts.builder()
                .setSubject(username)
                .claim("type", "access_token")
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60))
                .signWith(Keys.hmacShaKeyFor(Decoders.BASE64.decode("Y29tcGxleC1zZWN1cmUta2V5LXdpdGgtYS1zdWZmaWNpZW50LWxlbmd0aA==")), SignatureAlgorithm.HS256)
                .compact();

        HttpServletRequest request = mock(HttpServletRequest.class);

        // Arrange
        when(request.getHeader("Authorization")).thenReturn("Bearer " + token);
        when(userService.findUserByEmail(username)).thenReturn(Optional.of(mockUser()));

        // Act
        Optional<String> result = jwtService.extractAndValidateAccessToken(request);

        // Assert
        assertTrue(result.isPresent());
        assertEquals(token, result.get());
    }

    @Test
    void extractAndValidateAccessToken_InvalidToken_ReturnsEmpty() {
        String invalidToken = "invalid.token.signature";
        HttpServletRequest request = mock(HttpServletRequest.class);

        // Arrange
        when(request.getHeader("Authorization")).thenReturn("Bearer " + invalidToken);

        // Act
        Optional<String> result = jwtService.extractAndValidateAccessToken(request);

        // Assert
        assertFalse(result.isPresent());
    }

    @Test
    void extractAndValidateAccessToken_NoHeader_ReturnsEmpty() {
        HttpServletRequest request = mock(HttpServletRequest.class);

        // Arrange
        when(request.getHeader("Authorization")).thenReturn(null);

        // Act
        Optional<String> result = jwtService.extractAndValidateAccessToken(request);

        // Assert
        assertFalse(result.isPresent());
    }

    @Test
    void authenticateUser_ValidToken_SetsAuthenticationContext() {
        String username = "john.doe@example.com";
        String token = Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60))
                .signWith(Keys.hmacShaKeyFor(Decoders.BASE64.decode("Y29tcGxleC1zZWN1cmUta2V5LXdpdGgtYS1zdWZmaWNpZW50LWxlbmd0aA==")), SignatureAlgorithm.HS256)
                .compact();

        HttpServletRequest request = mock(HttpServletRequest.class);

        // Arrange
        when(userService.findUserByEmail(username)).thenReturn(Optional.of(mockUser()));

        // Act
        jwtService.authenticateUser(token, request);

        // Assert
        assertNotNull(SecurityContextHolder.getContext().getAuthentication());
        assertEquals(username, SecurityContextHolder.getContext().getAuthentication().getName());
    }

    @Test
    void authenticateUser_ExistingContext_DoesNotOverride() {
        String username = "john.doe@example.com";
        String token = Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60))
                .signWith(Keys.hmacShaKeyFor(Decoders.BASE64.decode("Y29tcGxleC1zZWN1cmUta2V5LXdpdGgtYS1zdWZmaWNpZW50LWxlbmd0aA==")), SignatureAlgorithm.HS256)
                .compact();

        HttpServletRequest request = mock(HttpServletRequest.class);
        Authentication existingAuthentication = mock(Authentication.class);

        // Arrange
        SecurityContextHolder.getContext().setAuthentication(existingAuthentication);
        when(userService.findUserByEmail(username)).thenReturn(Optional.of(mockUser()));

        // Act
        jwtService.authenticateUser(token, request);

        // Assert
        assertEquals(existingAuthentication, SecurityContextHolder.getContext().getAuthentication());
    }

    @Test
    void authenticateUser_InvalidToken_ThrowsUsernameNotFoundException() {
        String invalidToken = Jwts.builder()
                .setSubject("invalid-user@example.com")
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60))
                .signWith(Keys.hmacShaKeyFor(Decoders.BASE64.decode("Y29tcGxleC1zZWN1cmUta2V5LXdpdGgtYS1zdWZmaWNpZW50LWxlbmd0aA==")), SignatureAlgorithm.HS256)
                .compact();

        HttpServletRequest request = mock(HttpServletRequest.class);

        // Arrange
        when(userService.findUserByEmail("invalid-user@example.com")).thenReturn(Optional.empty());

        // Act & Assert
        assertThrows(UsernameNotFoundException.class, () -> jwtService.authenticateUser(invalidToken, request));
        assertNull(SecurityContextHolder.getContext().getAuthentication());
    }

    private User mockUser() {
        return User.builder()
                .id(UUID.fromString("5ddece39-3206-441f-aced-307f5c353405"))
                .email("john.doe@example.com")
                .firstName("John")
                .lastName("Doe")
                .password("encodedPassword")
                .build();
    }

    private Token mockToken() {
        return Token.builder()
                .id(UUID.fromString("123e4567-e89b-12d3-a456-426614174000"))
                .token("some-token-value")
                .tokenType(TokenType.BEARER)
                .revoked(false)
                .expirationDate(new Date().toInstant())
                .build();
    }

}
