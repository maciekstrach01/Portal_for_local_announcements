package pl.pk.localannouncements.announcementmanagement;

import org.springframework.data.domain.Pageable;
import pl.pk.localannouncements.announcementmanagement.model.dto.AnnouncementResponseDto;
import pl.pk.localannouncements.announcementmanagement.model.dto.CreateAnnouncementDto;
import pl.pk.localannouncements.announcementmanagement.model.dto.PaginatedAnnouncementResponseDto;
import pl.pk.localannouncements.usermanagement.model.entity.User;

public interface AnnouncementService {

    AnnouncementResponseDto create(User user, CreateAnnouncementDto createAnnouncementDto);

    PaginatedAnnouncementResponseDto getAll(Pageable pageable);

}
