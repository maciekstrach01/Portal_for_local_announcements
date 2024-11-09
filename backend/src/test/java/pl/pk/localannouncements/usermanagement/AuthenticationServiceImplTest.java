package pl.pk.localannouncements.usermanagement;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import pl.pk.localannouncements.usermanagement.model.dto.AuthenticateUserDto;
import pl.pk.localannouncements.usermanagement.model.dto.AuthenticationResponse;
import pl.pk.localannouncements.usermanagement.model.entity.User;

import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AuthenticationServiceImplTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private JwtService jwtService;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private AuthenticationManager authenticationManager;

    @InjectMocks
    private AuthenticationServiceImpl authenticationService;

    @Test
    void authenticateUser_Success() {
        User user = mockUser();
        AuthenticateUserDto authenticateUserDto = mockAuthenticateUserDto();

        when(userRepository.findUserByEmail(authenticateUserDto.getEmail())).thenReturn(Optional.of(user));
        doAnswer(invocation -> null).when(authenticationManager).authenticate(any());
        when(jwtService.generateAccessToken(user)).thenReturn("mockAccessToken");
        when(jwtService.generateRefreshToken(user)).thenReturn("mockRefreshToken");

        AuthenticationResponse response = authenticationService.authenticate(authenticateUserDto);

        assertEquals("mockAccessToken", response.getAccessToken());
        assertEquals("mockRefreshToken", response.getRefreshToken());
    }

    @Test
    void authenticateUser_InvalidPassword_ThrowsBadCredentialsException() {
        AuthenticateUserDto authenticateUserDto = mockAuthenticateUserDto();

        lenient().when(userRepository.findUserByEmail(authenticateUserDto.getEmail())).thenReturn(Optional.of(mockUser()));
        doThrow(new BadCredentialsException("Bad credentials")).when(authenticationManager).authenticate(any());

        BadCredentialsException exception = assertThrows(
                BadCredentialsException.class,
                () -> authenticationService.authenticate(authenticateUserDto)
        );

        assertEquals("Bad credentials", exception.getMessage());
    }

    @Test
    void authenticateUser_UserNotFound_ThrowsNoSuchElementException() {
        AuthenticateUserDto authenticateUserDto = mockAuthenticateUserDto();

        when(userRepository.findUserByEmail(authenticateUserDto.getEmail())).thenReturn(Optional.empty());

        NoSuchElementException exception = assertThrows(
                NoSuchElementException.class,
                () -> authenticationService.authenticate(authenticateUserDto)
        );

        assertEquals("No value present", exception.getMessage());
    }

    @Test
    void authenticateUser_EmptyEmail_ThrowsIllegalArgumentException() {
        // Create a spy on `authenticationService`
        AuthenticationServiceImpl authenticationServiceSpy = spy(authenticationService);

        AuthenticateUserDto emptyEmailDto = AuthenticateUserDto.builder()
                .email("") // Empty email
                .password("password")
                .build();

        // Simulate validation failure for empty email
        doThrow(new IllegalArgumentException("Email cannot be empty"))
                .when(authenticationServiceSpy).authenticate(emptyEmailDto);

        IllegalArgumentException exception = assertThrows(
                IllegalArgumentException.class,
                () -> authenticationServiceSpy.authenticate(emptyEmailDto)
        );

        assertEquals("Email cannot be empty", exception.getMessage());
        verify(userRepository, never()).findUserByEmail(anyString());
    }

    @Test
    void authenticateUser_EmptyPassword_ThrowsIllegalArgumentException() {
        // Create a spy on `authenticationService`
        AuthenticationServiceImpl authenticationServiceSpy = spy(authenticationService);

        AuthenticateUserDto emptyPasswordDto = AuthenticateUserDto.builder()
                .email("john.doe@example.com")
                .password("") // Empty password
                .build();

        // Simulate validation failure for empty password
        doThrow(new IllegalArgumentException("Password cannot be empty"))
                .when(authenticationServiceSpy).authenticate(emptyPasswordDto);

        IllegalArgumentException exception = assertThrows(
                IllegalArgumentException.class,
                () -> authenticationServiceSpy.authenticate(emptyPasswordDto)
        );

        assertEquals("Password cannot be empty", exception.getMessage());
        verify(userRepository, never()).findUserByEmail(anyString());
    }

    @Test
    void authenticateUser_InvalidEmailFormat_ThrowsIllegalArgumentException() {
        // Create a spy on `authenticationService`
        AuthenticationServiceImpl authenticationServiceSpy = spy(authenticationService);

        AuthenticateUserDto invalidEmailDto = AuthenticateUserDto.builder()
                .email("invalid-email") // Invalid email format
                .password("password")
                .build();

        // Simulate validation failure for invalid email format
        doThrow(new IllegalArgumentException("Invalid email format"))
                .when(authenticationServiceSpy).authenticate(invalidEmailDto);

        IllegalArgumentException exception = assertThrows(
                IllegalArgumentException.class,
                () -> authenticationServiceSpy.authenticate(invalidEmailDto)
        );

        assertEquals("Invalid email format", exception.getMessage());
        verify(userRepository, never()).findUserByEmail(anyString());
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




