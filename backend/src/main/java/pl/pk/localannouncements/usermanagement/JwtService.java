package pl.pk.localannouncements.usermanagement;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.security.core.userdetails.UserDetails;
import pl.pk.localannouncements.usermanagement.model.entity.User;

import java.util.Optional;

public interface JwtService {

    UserDetails extractUser(String token);

    String generateAccessToken(User user);

    String generateRefreshToken(User user);

    Optional<String> extractAndValidateAccessToken(HttpServletRequest request);

    boolean isRefreshTokenValid(String refreshToken, UserDetails userDetails);

    void authenticateUser(String jwt, HttpServletRequest request);

    void revokeToken(String token);

}
