package pl.pk.localannouncements.usermanagement;
import pl.pk.localannouncements.usermanagement.exception.RefreshTokenValidationException;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import pl.pk.localannouncements.usermanagement.model.dto.AuthenticateUserDto;
import pl.pk.localannouncements.usermanagement.model.dto.AuthenticationResponse;
import pl.pk.localannouncements.usermanagement.model.dto.RefreshTokenOperationsDto;
import pl.pk.localannouncements.usermanagement.model.entity.User;

import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class TokensServiceImplTest {
    @Mock
    private UserRepository userRepository;

    @Mock
    private JwtService jwtService;

    @InjectMocks
    private AuthenticationServiceImpl authenticationService;

    @Test
    void refreshToken_ValidToken_Success() {
        String validToken = "validRefreshToken";

        RefreshTokenOperationsDto dto = new RefreshTokenOperationsDto();
        dto.setRefreshToken(validToken);

        User user = mockUser();
        when(jwtService.extractUser(validToken)).thenReturn(user);
        when(jwtService.isRefreshTokenValid(validToken, user)).thenReturn(true); // Simulate valid token

        // Assuming successful token generation returns an AuthenticationResponse
        when(jwtService.generateAccessToken(user)).thenReturn("newAccessToken");
        when(jwtService.generateRefreshToken(user)).thenReturn("newRefreshToken");

        AuthenticationResponse response = authenticationService.refreshToken(dto);

        assertEquals("newAccessToken", response.getAccessToken());
        assertEquals("newRefreshToken", response.getRefreshToken());

        verify(jwtService).extractUser(validToken);
        verify(jwtService).isRefreshTokenValid(validToken, user);
        verify(jwtService).generateAccessToken(user);
        verify(jwtService).generateRefreshToken(user);
    }


    @Test
    void refreshToken_ExpiredRefreshToken_ThrowsRefreshTokenValidationException() {
        String expiredToken = "expiredRefreshToken";

        RefreshTokenOperationsDto dto = new RefreshTokenOperationsDto();
        dto.setRefreshToken(expiredToken);

        User user = mockUser();
        when(jwtService.extractUser(expiredToken)).thenReturn(user);
        when(jwtService.isRefreshTokenValid(expiredToken, user)).thenReturn(false); // Simulate expired token

        RefreshTokenValidationException exception = assertThrows(
                RefreshTokenValidationException.class,
                () -> authenticationService.refreshToken(dto)
        );

        assertEquals("Invalid refresh token", exception.getMessage());
    }

    @Test
    void refreshToken_InvalidRefreshToken_ThrowsRefreshTokenValidationException() {
        String invalidToken = "invalidRefreshToken";

        RefreshTokenOperationsDto dto = new RefreshTokenOperationsDto();
        dto.setRefreshToken(invalidToken);

        User user = mockUser();
        when(jwtService.extractUser(invalidToken)).thenReturn(user);
        when(jwtService.isRefreshTokenValid(invalidToken, user)).thenReturn(false); // Simulate invalid token

        RefreshTokenValidationException exception = assertThrows(
                RefreshTokenValidationException.class,
                () -> authenticationService.refreshToken(dto)
        );

        assertEquals("Invalid refresh token", exception.getMessage());
    }

    @Test
    void refreshToken_MissingRefreshToken_ThrowsRefreshTokenValidationException() {
        RefreshTokenOperationsDto dto = new RefreshTokenOperationsDto();
        dto.setRefreshToken(null); // Simulate missing token

        RefreshTokenValidationException exception = assertThrows(
                RefreshTokenValidationException.class,
                () -> authenticationService.refreshToken(dto)
        );

        assertEquals("Invalid refresh token", exception.getMessage());
    }


    private User mockUser() {
        return User.builder()
                .id(UUID.fromString("5ddece39-3206-441f-aced-307f5c353405"))
                .email("john.doe@example.com")
                .password("encodedPassword")
                .build();
    }

    private AuthenticateUserDto mockAuthenticateUserDto() {
        return AuthenticateUserDto.builder()
                .email("john.doe@example.com")
                .password("password")
                .build();
    }
}