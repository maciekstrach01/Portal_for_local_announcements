package pl.pk.localannouncements.usermanagement.model.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;
import pl.pk.localannouncements.usermanagement.validator.ChangedPasswordMatches;

@Data
@Schema(description = "Data Transfer Object for changing password of an existing user")
@ChangedPasswordMatches()
public class ChangePasswordDto {

    @NotBlank(message = "Current password field is mandatory")
    @Schema(description = "User's current password", example = "strongpassword123")
    private String currentPassword;

    @NotBlank(message = "New password field is mandatory")
    @Size(min = 8, message = "New password must be at least 8 characters long")
    @Schema(description = "User's new password", example = "strongpassword123")
    private String newPassword;

    @NotBlank(message = "Confirm new password field is mandatory")
    @Schema(description = "User's new password confirmation", example = "strongpassword123")
    private String confirmNewPassword;

}
