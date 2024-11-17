package pl.pk.localannouncements.usermanagement;

import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import pl.pk.localannouncements.usermanagement.exception.AuthValidationException;
import pl.pk.localannouncements.usermanagement.exception.RefreshTokenValidationException;
import pl.pk.localannouncements.usermanagement.model.dto.AuthenticateUserDto;
import pl.pk.localannouncements.usermanagement.model.dto.AuthenticationResponse;
import pl.pk.localannouncements.usermanagement.model.dto.RefreshTokenOperationsDto;
import pl.pk.localannouncements.usermanagement.model.dto.RegisterUserDto;
import pl.pk.localannouncements.usermanagement.model.entity.User;
import pl.pk.localannouncements.utils.UnitTest;

import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

@UnitTest
class AuthenticationServiceImplTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private JwtService jwtService;

    @Mock
    private AuthenticationManager authenticationManager;

    @InjectMocks
    private AuthenticationServiceImpl authenticationService;

    @Test
    void authenticateUser_Success() {
        User user = mockUser();
        AuthenticateUserDto authenticateUserDto = mockAuthenticateUserDto();
        AuthenticationResponse expectedResponse = AuthenticationResponse.builder()
                .accessToken("generated-access-token")
                .refreshToken("generated-refresh-token")
                .build();

        // Arrange
        when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class)))
                .thenReturn(null); // simulate successful authentication
        when(userRepository.findUserByEmail(authenticateUserDto.getEmail()))
                .thenReturn(Optional.of(user));
        when(jwtService.generateAccessToken(user)).thenReturn("generated-access-token");
        when(jwtService.generateRefreshToken(user)).thenReturn("generated-refresh-token");

        // Act
        AuthenticationResponse response = authenticationService.authenticate(authenticateUserDto);

        // Assert
        assertEquals(expectedResponse, response);
        verify(authenticationManager).authenticate(any(UsernamePasswordAuthenticationToken.class));
        verify(userRepository).findUserByEmail(authenticateUserDto.getEmail());
        verify(jwtService).generateAccessToken(user);
        verify(jwtService).generateRefreshToken(user);
    }

    @Test
    void authenticateUser_InvalidPassword_ThrowsBadCredentialsException() {
        AuthenticateUserDto authenticateUserDto = mockAuthenticateUserDto();
        // Arrange
        when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class)))
                .thenThrow(new BadCredentialsException("Invalid credentials"));

        // Act & Assert
        assertThrows(BadCredentialsException.class, () -> authenticationService.authenticate(authenticateUserDto));
        verify(authenticationManager).authenticate(any(UsernamePasswordAuthenticationToken.class));
        verify(userRepository, never()).findUserByEmail(anyString());
        verify(jwtService, never()).generateAccessToken(any());
        verify(jwtService, never()).generateRefreshToken(any());
    }

    @Test
    void authenticateUser_UserNotFound_ThrowsNoSuchElementException() {
        // Arrange
        AuthenticateUserDto authenticateUserDto = mockAuthenticateUserDto();
        when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class)))
                .thenReturn(null); // simulate successful authentication
        when(userRepository.findUserByEmail(authenticateUserDto.getEmail()))
                .thenReturn(Optional.empty());

        // Act & Assert
        assertThrows(NoSuchElementException.class, () -> authenticationService.authenticate(authenticateUserDto));
        verify(authenticationManager).authenticate(any(UsernamePasswordAuthenticationToken.class));
        verify(userRepository).findUserByEmail(authenticateUserDto.getEmail());
        verify(jwtService, never()).generateAccessToken(any());
        verify(jwtService, never()).generateRefreshToken(any());
    }

    @Test
    void registerUser_Success() {
        RegisterUserDto registerUserDto = mockRegisterUserDto();
        User newUser = mockUser();
        AuthenticationResponse expectedResponse = AuthenticationResponse.builder()
                .accessToken("generated-access-token")
                .refreshToken("generated-refresh-token")
                .build();

        // Arrange
        when(userRepository.existsByEmail(registerUserDto.getEmail())).thenReturn(false);
        when(passwordEncoder.encode(registerUserDto.getPassword())).thenReturn("encodedPassword");
        when(userRepository.save(any(User.class))).thenReturn(newUser);
        when(jwtService.generateAccessToken(newUser)).thenReturn("generated-access-token");
        when(jwtService.generateRefreshToken(newUser)).thenReturn("generated-refresh-token");

        // Act
        AuthenticationResponse response = authenticationService.register(registerUserDto);

        // Assert
        assertEquals(expectedResponse, response);
        verify(userRepository).existsByEmail(registerUserDto.getEmail());
        verify(passwordEncoder).encode(registerUserDto.getPassword());
        verify(userRepository).save(any(User.class));
        verify(jwtService).generateAccessToken(newUser);
        verify(jwtService).generateRefreshToken(newUser);
    }

    @Test
    void registerUser_UserAlreadyExists_ThrowsAuthValidationException() {
        RegisterUserDto registerUserDto = mockRegisterUserDto();

        // Arrange
        when(userRepository.existsByEmail(registerUserDto.getEmail())).thenReturn(true);

        // Act & Assert
        assertThrows(AuthValidationException.class, () -> authenticationService.register(registerUserDto));
        verify(userRepository).existsByEmail(registerUserDto.getEmail());
        verify(userRepository, never()).save(any(User.class));
        verify(jwtService, never()).generateAccessToken(any());
        verify(jwtService, never()).generateRefreshToken(any());
    }

    @Test
    void refreshToken_Success() {
        String validToken = "valid-refresh-token";
        User user = mockUser();
        AuthenticationResponse expectedResponse = AuthenticationResponse.builder()
                .accessToken("new-access-token")
                .refreshToken("new-refresh-token")
                .build();

        // Arrange
        when(jwtService.extractUser(validToken)).thenReturn(user);
        when(jwtService.isRefreshTokenValid(validToken, user)).thenReturn(true);
        when(jwtService.generateAccessToken(user)).thenReturn("new-access-token");
        when(jwtService.generateRefreshToken(user)).thenReturn("new-refresh-token");

        RefreshTokenOperationsDto refreshTokenOperationsDto = new RefreshTokenOperationsDto();
        refreshTokenOperationsDto.setRefreshToken(validToken);

        // Act
        AuthenticationResponse response = authenticationService.refreshToken(refreshTokenOperationsDto);

        // Assert
        assertEquals(expectedResponse, response);
        verify(jwtService).extractUser(validToken);
        verify(jwtService).isRefreshTokenValid(validToken, user);
        verify(jwtService).generateAccessToken(user);
        verify(jwtService).generateRefreshToken(user);
    }

    @Test
    void refreshToken_InvalidToken_ThrowsRefreshTokenValidationException() {
        String invalidToken = "invalid-refresh-token";

        // Arrange
        when(jwtService.extractUser(invalidToken)).thenThrow(new RefreshTokenValidationException("Invalid refresh token"));

        RefreshTokenOperationsDto refreshTokenOperationsDto = new RefreshTokenOperationsDto();
        refreshTokenOperationsDto.setRefreshToken(invalidToken);

        // Act & Assert
        assertThrows(RefreshTokenValidationException.class,
                () -> authenticationService.refreshToken(refreshTokenOperationsDto));
        verify(jwtService).extractUser(invalidToken);
        verify(jwtService, never()).isRefreshTokenValid(any(), any());
        verify(jwtService, never()).generateAccessToken(any());
        verify(jwtService, never()).generateRefreshToken(any());
    }

    @Test
    void logout_Success() {
        String validToken = "valid-refresh-token";
        User user = mockUser();

        // Arrange
        when(jwtService.extractUser(validToken)).thenReturn(user);
        when(jwtService.isRefreshTokenValid(validToken, user)).thenReturn(true);

        RefreshTokenOperationsDto refreshTokenOperationsDto = new RefreshTokenOperationsDto();
        refreshTokenOperationsDto.setRefreshToken(validToken);

        // Act
        authenticationService.logout(refreshTokenOperationsDto);

        // Assert
        verify(jwtService).extractUser(validToken);
        verify(jwtService).revokeToken(validToken);
        verifyNoMoreInteractions(jwtService);
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

    private AuthenticateUserDto mockAuthenticateUserDto() {
        return AuthenticateUserDto.builder()
                .email("john.doe@example.com")
                .password("password")
                .build();
    }

    private RegisterUserDto mockRegisterUserDto() {
        return RegisterUserDto.builder()
                .email("john.doe@example.com")
                .password("password")
                .firstName("John")
                .lastName("Doe")
                .build();
    }

}
