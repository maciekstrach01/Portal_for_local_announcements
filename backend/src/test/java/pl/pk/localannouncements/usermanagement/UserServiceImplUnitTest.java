package pl.pk.localannouncements.usermanagement;

import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import pl.pk.localannouncements.usermanagement.model.entity.User;
import pl.pk.localannouncements.utils.UnitTest;

import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@UnitTest
class UserServiceImplUnitTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserServiceImpl userService;

    @Test
    void findUserByEmail_UserExists_ReturnsUser() {
        // Mock required objects
        User user = mockUser();
        String email = user.getEmail();

        // Simulate repository behavior
        when(userRepository.findUserByEmail(email)).thenReturn(Optional.of(user));

        // Call the method
        Optional<User> result = userService.findUserByEmail(email);

        // Verify the repository interaction
        verify(userRepository).findUserByEmail(email);

        // Assert the result
        assertTrue(result.isPresent());
        assertEquals(user, result.get());
    }

    @Test
    void findUserByEmail_UserDoesNotExist_ReturnsEmpty() {
        // Mock required objects
        String email = "nonexistent@example.com";

        // Simulate repository behavior
        when(userRepository.findUserByEmail(email)).thenReturn(Optional.empty());

        // Call the method
        Optional<User> result = userService.findUserByEmail(email);

        // Verify the repository interaction
        verify(userRepository).findUserByEmail(email);

        // Assert the result
        assertTrue(result.isEmpty());
    }

    private User mockUser() {
        return User.builder()
                .id(UUID.fromString("5ddece39-3206-441f-aced-307f5c353405"))
                .email("john.doe@example.com")
                .firstName("John")
                .lastName("Doe")
                .password("password")
                .build();
    }

}
