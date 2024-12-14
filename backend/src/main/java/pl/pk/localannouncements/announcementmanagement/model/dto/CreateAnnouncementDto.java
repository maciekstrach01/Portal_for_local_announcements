package pl.pk.localannouncements.announcementmanagement.model.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.*;
import lombok.Builder;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;
import pl.pk.localannouncements.announcementmanagement.validator.ValidImage;

import java.math.BigDecimal;
import java.util.UUID;

@Data
@Builder
@Schema(description = "Data Transfer Object for creating a new announcement")
public class CreateAnnouncementDto {

    @NotBlank(message = "Title is mandatory")
    @Size(max = 100, message = "Title must be at most 100 characters long")
    @Schema(description = "Title of the announcement", example = "Used Bike for Sale")
    private String title;

    @NotNull(message = "Category ID is mandatory")
    @Schema(description = "ID of the category for the announcement", example = "550e8400-e29b-41d4-a716-446655440000")
    private UUID categoryId;

    @NotBlank(message = "Description is mandatory")
    @Size(min = 20, max = 1000, message = "Description must be between 20 and 1000 characters")
    @Schema(description = "Detailed description of the announcement", example = "A well-maintained used bike in excellent condition.")
    private String description;

    @DecimalMin(value = "0.0", message = "Price must be a positive number")
    @Digits(integer = 10, fraction = 2, message = "Price can have up to 10 digits and 2 decimal places")
    @Schema(description = "Price of the item or service (optional)", example = "150.00")
    private BigDecimal price;

    @Pattern(regexp = "^\\+?[0-9]{9,15}$", message = "Provide a valid phone number, example: +48123123123")
    @Schema(description = "Contact phone number (optional)", example = "+48123123123")
    private String phoneNumber;

    @ValidImage
    @Schema(description = "Image file for the announcement (optional, max size 5 MB)")
    private MultipartFile image;

    public void trimFields() {
        this.title = (title != null) ? title.trim() : null;
        this.description = (description != null) ? description.trim() : null;
        this.phoneNumber = (phoneNumber != null) ? phoneNumber.trim() : null;
    }

}
