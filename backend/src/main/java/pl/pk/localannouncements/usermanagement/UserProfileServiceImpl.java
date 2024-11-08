package pl.pk.localannouncements.usermanagement;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import pl.pk.localannouncements.usermanagement.exception.InvalidPasswordException;
import pl.pk.localannouncements.usermanagement.model.dto.ChangePasswordDto;
import pl.pk.localannouncements.usermanagement.model.entity.User;

@Service
@RequiredArgsConstructor
class UserProfileServiceImpl implements UserProfileService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void changePassword(User user, ChangePasswordDto changePasswordDto) {
        validateCurrentPassword(user, changePasswordDto.getCurrentPassword());
        validateNewPasswordIsNotSameAsOld(changePasswordDto.getNewPassword(), user.getPassword());
        updatePassword(user, changePasswordDto.getNewPassword());
    }

    private void validateCurrentPassword(User user, String currentPassword) {
        if (!passwordEncoder.matches(currentPassword, user.getPassword())) {
            throw new InvalidPasswordException("Current password is incorrect");
        }
    }

    private void validateNewPasswordIsNotSameAsOld(String newPassword, String currentEncodedPassword) {
        if (passwordEncoder.matches(newPassword, currentEncodedPassword)) {
            throw new InvalidPasswordException("New password cannot be the same as the old password");
        }
    }

    private void updatePassword(User user, String newPassword) {
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
    }

}
