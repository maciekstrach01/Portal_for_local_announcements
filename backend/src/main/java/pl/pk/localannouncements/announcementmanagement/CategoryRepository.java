package pl.pk.localannouncements.announcementmanagement;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.pk.localannouncements.announcementmanagement.model.entity.Category;

import java.util.UUID;

interface CategoryRepository extends JpaRepository<Category, UUID> {

    boolean existsByNameIgnoreCase(String name);

}
