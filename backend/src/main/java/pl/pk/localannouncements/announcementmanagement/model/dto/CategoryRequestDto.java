package pl.pk.localannouncements.announcementmanagement.model.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Schema(description = "Data Transfer Object for creating and updating a new category")
public class CategoryRequestDto {

    @NotBlank(message = "Category name field is mandatory")
    @Size(min = 2, max = 50, message = "Category name must be between 2 and 50 characters")
    @Schema(description = "Category name", example = "Event")
    private String name;

    public void trimFields() {
        this.name = (name != null) ? name.trim() : null;
    }

}
