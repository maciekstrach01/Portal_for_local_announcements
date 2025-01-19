package pl.pk.localannouncements.usermanagement;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import pl.pk.localannouncements.usermanagement.model.dto.AuthenticateUserDto;
import pl.pk.localannouncements.usermanagement.model.dto.AuthenticationResponse;
import pl.pk.localannouncements.usermanagement.model.dto.RegisterUserDto;

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
        RegisterUserDto dto = DtoTestHelper.createRegisterUserDto(
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
        AuthenticateUserDto authDto = DtoTestHelper.createAuthenticateUserDto("admin@example.com", "password");

        // When
        AuthenticationResponse response = authenticationService.authenticate(authDto);

        // Then
        Assertions.assertNotNull(response.getAccessToken());
        Assertions.assertNotNull(response.getRefreshToken());
    }

}
