package pl.pk.localannouncements.usermanagement;

import pl.pk.localannouncements.usermanagement.model.dto.ChangePasswordDto;
import pl.pk.localannouncements.usermanagement.model.entity.User;

public interface UserProfileService {

    void changePassword(User user, ChangePasswordDto changePasswordDto);

}
