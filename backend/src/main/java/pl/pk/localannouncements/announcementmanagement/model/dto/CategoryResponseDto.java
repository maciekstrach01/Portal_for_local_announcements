package pl.pk.localannouncements.announcementmanagement.model.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;

import java.util.UUID;

@Data
@Builder
@Schema(description = "Data Transfer Object for handling category creation and updates")
public class CategoryResponseDto {

    @Schema(description = "Unique identifier of the category", example = "550e8400-e29b-41d4-a716-446655440000")
    private UUID id;

    @Schema(description = "Category name", example = "Event")
    private String name;

}

