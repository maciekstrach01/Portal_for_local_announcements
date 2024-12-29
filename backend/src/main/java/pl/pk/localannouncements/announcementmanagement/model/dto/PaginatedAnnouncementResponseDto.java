package pl.pk.localannouncements.announcementmanagement.model.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import org.springframework.data.domain.Page;
import pl.pk.localannouncements.common.model.PaginatedResponse;

@Schema(description = "Data Transfer Object representing paginated details of an announcement")
public class PaginatedAnnouncementResponseDto extends PaginatedResponse<AnnouncementResponseDto> {

    public PaginatedAnnouncementResponseDto(Page<AnnouncementResponseDto> page) {
        super(page);
    }

}
