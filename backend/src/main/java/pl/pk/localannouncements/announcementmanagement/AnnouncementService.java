package pl.pk.localannouncements.announcementmanagement;

import org.springframework.data.domain.Sort;
import pl.pk.localannouncements.announcementmanagement.model.dto.AnnouncementResponseDto;
import pl.pk.localannouncements.announcementmanagement.model.dto.CreateAnnouncementDto;
import pl.pk.localannouncements.announcementmanagement.model.dto.PaginatedAnnouncementResponseDto;
import pl.pk.localannouncements.announcementmanagement.model.enums.AnnouncementSortableFields;
import pl.pk.localannouncements.usermanagement.model.entity.User;

public interface AnnouncementService {

    AnnouncementResponseDto create(User user, CreateAnnouncementDto createAnnouncementDto);

    PaginatedAnnouncementResponseDto getAll(int page, int size, AnnouncementSortableFields sortField, Sort.Direction sortDirection);

}
