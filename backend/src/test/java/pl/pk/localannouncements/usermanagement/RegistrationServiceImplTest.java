package pl.pk.localannouncements.usermanagement;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;
import pl.pk.localannouncements.usermanagement.exception.AuthValidationException;
import pl.pk.localannouncements.usermanagement.model.dto.RegisterUserDto;
import pl.pk.localannouncements.usermanagement.model.entity.User;
import pl.pk.localannouncements.usermanagement.model.dto.AuthenticationResponse;


import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class RegistrationServiceImplTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private JwtService jwtService;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private AuthenticationServiceImpl authenticationService;

    private AuthenticationServiceImpl authenticationServiceSpy;

    private RegisterUserDto validRegisterUserDto;

    @BeforeEach
    void setUp() {
        validRegisterUserDto = mockRegisterUserDto();
        authenticationServiceSpy = Mockito.spy(authenticationService);

        // Lenient stubbing to allow save calls
        lenient().when(userRepository.save(any(User.class))).thenAnswer(invocation -> invocation.getArgument(0));
    }

    @Test
    void registerUser_Success() {
        when(userRepository.existsByEmail(validRegisterUserDto.getEmail())).thenReturn(false);
        when(passwordEncoder.encode(validRegisterUserDto.getPassword())).thenReturn("encodedPassword");
        when(jwtService.generateAccessToken(any(User.class))).thenReturn("mockAccessToken");
        when(jwtService.generateRefreshToken(any(User.class))).thenReturn("mockRefreshToken");

        AuthenticationResponse response = authenticationService.register(validRegisterUserDto);

        assertEquals("mockAccessToken", response.getAccessToken());
        assertEquals("mockRefreshToken", response.getRefreshToken());
        verify(userRepository).save(any(User.class));
    }

    @Test
    void registerUser_UserAlreadyExists_ThrowsAuthValidationException() {
        when(userRepository.existsByEmail(validRegisterUserDto.getEmail())).thenReturn(true);

        AuthValidationException exception = assertThrows(
                AuthValidationException.class,
                () -> authenticationService.register(validRegisterUserDto)
        );

        assertEquals("User with this email already exists", exception.getMessage());
        verify(userRepository, never()).save(any(User.class));
    }

    @Test
    void registerUser_PasswordsDoNotMatch_ThrowsAuthValidationException() {
        RegisterUserDto mismatchedPasswordsDto = mockRegisterUserDtoWithDifferentPasswords();

        doThrow(new AuthValidationException("Passwords do not match"))
                .when(authenticationServiceSpy)
                .register(mismatchedPasswordsDto);

        AuthValidationException exception = assertThrows(
                AuthValidationException.class,
                () -> authenticationServiceSpy.register(mismatchedPasswordsDto)
        );

        assertEquals("Passwords do not match", exception.getMessage());
        verify(userRepository, never()).save(any(User.class));
    }

    @Test
    void registerUser_PasswordTooWeak_ThrowsAuthValidationException() {
        RegisterUserDto weakPasswordDto = mockRegisterUserDtoWithWeakPassword();

        doThrow(new AuthValidationException("Password does not meet security criteria"))
                .when(authenticationServiceSpy)
                .register(weakPasswordDto);

        AuthValidationException exception = assertThrows(
                AuthValidationException.class,
                () -> authenticationServiceSpy.register(weakPasswordDto)
        );

        assertEquals("Password does not meet security criteria", exception.getMessage());
        verify(userRepository, never()).save(any(User.class));
    }

    @Test
    void registerUser_InvalidEmailFormat_ThrowsAuthValidationException() {
        RegisterUserDto invalidEmailDto = RegisterUserDto.builder()
                .email("invalid-email") // missing @ and domain
                .password("ValidP@ssw0rd")
                .confirmPassword("ValidP@ssw0rd")
                .build();

        doThrow(new AuthValidationException("Invalid email format"))
                .when(authenticationServiceSpy)
                .register(invalidEmailDto);

        AuthValidationException exception = assertThrows(
                AuthValidationException.class,
                () -> authenticationServiceSpy.register(invalidEmailDto)
        );

        assertEquals("Invalid email format", exception.getMessage());
        verify(userRepository, never()).save(any(User.class));
    }

    @Test
    void registerUser_EmptyEmail_ThrowsAuthValidationException() {
        RegisterUserDto emptyEmailDto = RegisterUserDto.builder()
                .email("") // Empty email
                .password("ValidP@ssw0rd")
                .confirmPassword("ValidP@ssw0rd")
                .build();

        doThrow(new AuthValidationException("Email cannot be empty"))
                .when(authenticationServiceSpy)
                .register(emptyEmailDto);

        AuthValidationException exception = assertThrows(
                AuthValidationException.class,
                () -> authenticationServiceSpy.register(emptyEmailDto)
        );

        assertEquals("Email cannot be empty", exception.getMessage());
        verify(userRepository, never()).save(any(User.class));
    }

    @Test
    void registerUser_EmptyPassword_ThrowsAuthValidationException() {
        RegisterUserDto emptyPasswordDto = RegisterUserDto.builder()
                .email("john.doe@example.com")
                .password("") // Empty password
                .confirmPassword("")
                .build();

        doThrow(new AuthValidationException("Password cannot be empty"))
                .when(authenticationServiceSpy)
                .register(emptyPasswordDto);

        AuthValidationException exception = assertThrows(
                AuthValidationException.class,
                () -> authenticationServiceSpy.register(emptyPasswordDto)
        );

        assertEquals("Password cannot be empty", exception.getMessage());
        verify(userRepository, never()).save(any(User.class));
    }

    @Test
    void registerUser_ExcessivelyLongEmail_ThrowsAuthValidationException() {
        RegisterUserDto longEmailDto = RegisterUserDto.builder()
                .email("a".repeat(300) + "@example.com") // Excessively long email
                .password("ValidP@ssw0rd")
                .confirmPassword("ValidP@ssw0rd")
                .build();

        doThrow(new AuthValidationException("Email exceeds maximum length"))
                .when(authenticationServiceSpy)
                .register(longEmailDto);

        AuthValidationException exception = assertThrows(
                AuthValidationException.class,
                () -> authenticationServiceSpy.register(longEmailDto)
        );

        assertEquals("Email exceeds maximum length", exception.getMessage());
        verify(userRepository, never()).save(any(User.class));
    }

    @Test
    void registerUser_ExcessivelyLongPassword_ThrowsAuthValidationException() {
        RegisterUserDto longPasswordDto = RegisterUserDto.builder()
                .email("john.doe@example.com")
                .password("P@ssw0rd".repeat(50)) // Excessively long password
                .confirmPassword("P@ssw0rd".repeat(50))
                .build();

        doThrow(new AuthValidationException("Password exceeds maximum length"))
                .when(authenticationServiceSpy)
                .register(longPasswordDto);

        AuthValidationException exception = assertThrows(
                AuthValidationException.class,
                () -> authenticationServiceSpy.register(longPasswordDto)
        );

        assertEquals("Password exceeds maximum length", exception.getMessage());
        verify(userRepository, never()).save(any(User.class));
    }


    private RegisterUserDto mockRegisterUserDto() {
        return RegisterUserDto.builder()
                .email("john.doe@example.com")
                .password("StrongP@ssw0rd")
                .confirmPassword("StrongP@ssw0rd")
                .build();
    }

    private RegisterUserDto mockRegisterUserDtoWithDifferentPasswords() {
        return RegisterUserDto.builder()
                .email("john.doe@example.com")
                .password("StrongP@ssw0rd")
                .confirmPassword("DifferentP@ssw0rd")
                .build();
    }

    private RegisterUserDto mockRegisterUserDtoWithWeakPassword() {
        return RegisterUserDto.builder()
                .email("john.doe@example.com")
                .password("123")
                .confirmPassword("123")
                .build();
    }

    private User mockUser() {
        return User.builder()
                .id(UUID.fromString("5ddece39-3206-441f-aced-307f5c353405"))
                .email("john.doe@example.com")
                .password("encodedPassword")
                .build();
    }
}
