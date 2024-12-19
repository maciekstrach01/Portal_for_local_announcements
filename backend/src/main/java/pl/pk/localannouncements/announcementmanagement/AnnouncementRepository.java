package pl.pk.localannouncements.announcementmanagement;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.pk.localannouncements.announcementmanagement.model.entity.Announcement;

import java.util.UUID;

interface AnnouncementRepository extends JpaRepository<Announcement, UUID> {

}
