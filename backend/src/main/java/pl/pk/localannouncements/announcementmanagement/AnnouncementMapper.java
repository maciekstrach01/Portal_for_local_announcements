package pl.pk.localannouncements.announcementmanagement;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;
import pl.pk.localannouncements.announcementmanagement.model.dto.AnnouncementResponseDto;
import pl.pk.localannouncements.announcementmanagement.model.dto.CreateAnnouncementDto;
import pl.pk.localannouncements.announcementmanagement.model.entity.Announcement;
import pl.pk.localannouncements.announcementmanagement.model.entity.Category;
import pl.pk.localannouncements.usermanagement.model.entity.User;

@Mapper(componentModel = "spring")
interface AnnouncementMapper {

    AnnouncementMapper INSTANCE = Mappers.getMapper(AnnouncementMapper.class);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "imagePath", ignore = true)
    @Mapping(target = "creationTimestamp", ignore = true)
    @Mapping(target = "updateTimestamp", ignore = true)
    @Mapping(target = "deleted", ignore = true)
    Announcement toAnnouncement(CreateAnnouncementDto createAnnouncementDto, Category category, User user);

    @Mapping(target = "categoryName", source = "announcement.category.name")
    @Mapping(target = "creatorDetails", source = "announcement.user")
    AnnouncementResponseDto toAnnouncementResponseDto(Announcement announcement);

}
