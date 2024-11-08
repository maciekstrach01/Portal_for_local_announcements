package pl.pk.localannouncements.usermanagement.validator;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import pl.pk.localannouncements.usermanagement.model.dto.ChangePasswordDto;

public class ChangedPasswordMatchesValidator implements ConstraintValidator<ChangedPasswordMatches, ChangePasswordDto> {

    @Override
    public boolean isValid(ChangePasswordDto dto, ConstraintValidatorContext context) {
        if (dto.getNewPassword() == null || dto.getConfirmNewPassword() == null) {
            return false;
        }
        return dto.getNewPassword().equals(dto.getConfirmNewPassword());
    }

}
