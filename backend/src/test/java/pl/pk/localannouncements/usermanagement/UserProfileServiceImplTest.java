package pl.pk.localannouncements.usermanagement;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;
import pl.pk.localannouncements.usermanagement.exception.InvalidPasswordException;
import pl.pk.localannouncements.usermanagement.model.dto.ChangePasswordDto;
import pl.pk.localannouncements.usermanagement.model.entity.User;
import pl.pk.localannouncements.utils.UnitTest;

import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@UnitTest
@ExtendWith(MockitoExtension.class)
class UserProfileServiceImplTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private UserProfileServiceImpl userProfileService;

    @Test
    void changePassword_Success() {
        // Mock required objects
        User user = mockUser();
        ChangePasswordDto changePasswordDto = mockChangePasswordDto();

        // Simulate matching current password
        when(passwordEncoder.matches(changePasswordDto.getCurrentPassword(), user.getPassword())).thenReturn(true);
        when(passwordEncoder.encode(changePasswordDto.getNewPassword())).thenReturn("newEncodedPassword");

        // Call the method
        userProfileService.changePassword(user, changePasswordDto);

        // Verify the password update
        verify(passwordEncoder).encode(changePasswordDto.getNewPassword());
        verify(userRepository).save(user);

        // Assert that the password was updated
        assertEquals("newEncodedPassword", user.getPassword());
    }

    @Test
    void changePassword_InvalidCurrentPassword_ThrowsInvalidPasswordException() {
        // Mock required objects
        User user = mockUser();
        ChangePasswordDto changePasswordDto = mockChangePasswordDto();

        // Simulate non-matching current password
        when(passwordEncoder.matches(changePasswordDto.getCurrentPassword(), user.getPassword())).thenReturn(false);

        // Expect InvalidPasswordException to be thrown
        assertThrows(InvalidPasswordException.class, () -> userProfileService.changePassword(user, changePasswordDto));
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

    private ChangePasswordDto mockChangePasswordDto() {
        return ChangePasswordDto.builder()
                .currentPassword("password")
                .newPassword("newPassword")
                .confirmNewPassword("newPassword")
                .build();
    }

}