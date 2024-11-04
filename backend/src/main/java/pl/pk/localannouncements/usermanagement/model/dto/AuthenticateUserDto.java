package pl.pk.localannouncements.usermanagement.model.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@Schema(description = "Data Transfer Object for authenticating an existing user")
public class AuthenticateUserDto {

    @Email(message = "Provide a valid email address")
    @NotBlank(message = "Email field is mandatory")
    @Schema(description = "User's email address", example = "john.doe@example.com")
    private String email;

    @NotBlank(message = "Password field is mandatory")
    @Schema(description = "User's password", example = "strongpassword123")
    private String password;

}
