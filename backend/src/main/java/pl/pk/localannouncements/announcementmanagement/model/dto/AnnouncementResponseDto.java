package pl.pk.localannouncements.announcementmanagement.model.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.UUID;

@Data
@Builder
@Schema(description = "Data Transfer Object representing the details of an announcement")
public class AnnouncementResponseDto {

    @Schema(description = "Unique identifier of the announcement", example = "550e8400-e29b-41d4-a716-446655440000")
    private UUID id;

    @Schema(description = "Title of the announcement", example = "Used Bike for Sale")
    private String title;

    @Schema(description = "Name of the category the announcement belongs to", example = "Sales")
    private String categoryName;

    @Schema(description = "Detailed description of the announcement", example = "A well-maintained used bike in excellent condition.")
    private String description;

    @Schema(description = "Price of the item or service (optional)", example = "150.00")
    private BigDecimal price;

    @Schema(description = "Contact phone number (optional)", example = "+48123123123")
    private String phoneNumber;

    @Schema(description = "Path to the image associated with the announcement (optional)", example = "/images/announcements/12345.jpg")
    private String imagePath;

    @Schema(description = "Data of the user who created the announcement")
    private AnnouncementCreatorDetailsDto creatorDetails;

    @Schema(description = "Timestamp of when the announcement was created", example = "2024-12-29T11:00:00Z")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ssXXX", timezone = "UTC")
    private OffsetDateTime creationTimestamp;

    @Schema(description = "Timestamp of when the announcement was last updated", example = "2024-12-29T12:00:00Z")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ssXXX", timezone = "UTC")
    private OffsetDateTime updateTimestamp;

}
