package pl.pk.localannouncements.usermanagement;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import pl.pk.localannouncements.usermanagement.model.dto.AuthenticateUserDto;
import pl.pk.localannouncements.usermanagement.model.dto.AuthenticationResponse;
import pl.pk.localannouncements.usermanagement.model.dto.RegisterUserDto;
import java.lang.reflect.Constructor;

@SpringBootTest
@ActiveProfiles("test")
public class AuthenticationServiceImplTestIT {

    @Autowired
    private AuthenticationServiceImpl authenticationService;

    @Autowired
    private UserRepository userRepository;

    @Test
    public void shouldRegisterUserSuccessfully() {
        // Given
        RegisterUserDto dto = createRegisterUserDto(
                "admin8@example.com",
                "password6",
                "admin5",
                "admin5",
                "password6"
        );

        // When
        AuthenticationResponse response = authenticationService.register(dto);

        // Then
        Assertions.assertNotNull(response.getAccessToken());
        Assertions.assertNotNull(response.getRefreshToken());
        Assertions.assertTrue(userRepository.existsByEmailIgnoreCase("admin8@example.com"));
    }

    @Test
    public void shouldAuthenticateUserSuccessfully() {
        // Given
        AuthenticateUserDto authDto = createAuthenticateUserDto("admin@example.com", "password");

        // When
        AuthenticationResponse response = authenticationService.authenticate(authDto);

        // Then
        Assertions.assertNotNull(response.getAccessToken());
        Assertions.assertNotNull(response.getRefreshToken());
    }

    private RegisterUserDto createRegisterUserDto(String email, String password, String firstName, String lastName, String confirmPassword) {
        try {
            Constructor<RegisterUserDto> constructor = RegisterUserDto.class.getDeclaredConstructor(String.class, String.class, String.class, String.class, String.class);
            constructor.setAccessible(true);
            return constructor.newInstance(email, firstName, lastName, password, confirmPassword);
        } catch (Exception e) {
            throw new RuntimeException("Failed to create RegisterUserDto instance", e);
        }
    }

    private AuthenticateUserDto createAuthenticateUserDto(String email, String password) {
        try {
            Constructor<AuthenticateUserDto> constructor = AuthenticateUserDto.class.getDeclaredConstructor(String.class, String.class);
            constructor.setAccessible(true);
            return constructor.newInstance(email, password);
        } catch (Exception e) {
            throw new RuntimeException("Failed to create AuthenticateUserDto instance", e);
        }
    }
}
