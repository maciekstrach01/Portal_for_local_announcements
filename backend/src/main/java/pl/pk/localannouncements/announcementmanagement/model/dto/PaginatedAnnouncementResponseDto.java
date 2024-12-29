package pl.pk.localannouncements.announcementmanagement.model.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import org.springframework.data.domain.Page;
import pl.pk.localannouncements.common.model.PaginatedResponse;

@Schema(name = "AnnouncementPaginatedResponse", description = "Paginated response for announcements")
public class PaginatedAnnouncementResponseDto extends PaginatedResponse<AnnouncementResponseDto> {

    public PaginatedAnnouncementResponseDto(Page<AnnouncementResponseDto> page) {
        super(page);
    }

}
