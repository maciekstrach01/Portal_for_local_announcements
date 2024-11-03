package pl.pk.localannouncements.usermanagement.model.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Schema(description = "Data Transfer Object for handling refresh token and logout")
public class TokenOperationsDto {

    @NotBlank(message = "Refresh token field is mandatory")
    @Schema(description = "Refresh token used for security operations", example = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...")
    private String refreshToken;

}
