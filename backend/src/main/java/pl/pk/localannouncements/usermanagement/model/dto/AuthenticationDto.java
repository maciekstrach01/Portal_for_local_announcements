package pl.pk.localannouncements.usermanagement.model.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@Schema(description = "Data Transfer Object for handling authentication tokens")
public class AuthenticationDto {

    @Schema(description = "Access token used for authentication", example = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...")
    private String token;

}
