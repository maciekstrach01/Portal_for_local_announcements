package pl.pk.localannouncements.announcementmanagement;

import pl.pk.localannouncements.announcementmanagement.model.dto.AnnouncementResponseDto;
import pl.pk.localannouncements.announcementmanagement.model.dto.CreateAnnouncementDto;
import pl.pk.localannouncements.usermanagement.model.entity.User;

public interface AnnouncementService {

    AnnouncementResponseDto create(User user, CreateAnnouncementDto createAnnouncementDto);

}
