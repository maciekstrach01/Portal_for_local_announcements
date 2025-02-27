package pl.pk.localannouncements.announcementmanagement;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import pl.pk.localannouncements.announcementmanagement.exception.AnnouncementNotFoundException;
import pl.pk.localannouncements.announcementmanagement.exception.AnnouncementValidationException;
import pl.pk.localannouncements.announcementmanagement.model.dto.AnnouncementResponseDto;
import pl.pk.localannouncements.announcementmanagement.model.dto.CreateAnnouncementDto;
import pl.pk.localannouncements.announcementmanagement.model.dto.PaginatedAnnouncementResponseDto;
import pl.pk.localannouncements.announcementmanagement.model.entity.Announcement;
import pl.pk.localannouncements.announcementmanagement.model.entity.Category;
import pl.pk.localannouncements.announcementmanagement.model.enums.AnnouncementSortableFields;
import pl.pk.localannouncements.usermanagement.model.entity.User;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
class AnnouncementServiceImpl implements AnnouncementService {

    private static final String IMAGE_EXTENSION = ".jpg";
    private static final String IMAGE_UPLOAD_FOLDER = "uploads/images/";

    private final AnnouncementRepository announcementRepository;
    private final CategoryRepository categoryRepository;

    @Override
    @Transactional
    public AnnouncementResponseDto create(User user, CreateAnnouncementDto createAnnouncementDto) {
        Announcement newAnnouncement = prepareAnnouncementToSave(createAnnouncementDto, user);

        if (createAnnouncementDto.getImage() != null && !createAnnouncementDto.getImage().isEmpty()) {
            MultipartFile image = createAnnouncementDto.getImage();
            String imagePath = saveImage(image);
            newAnnouncement.setImagePath(imagePath);
        }

        return saveAndMapAnnouncement(newAnnouncement);
    }

    @Override
    public PaginatedAnnouncementResponseDto getAll(int page, int size, AnnouncementSortableFields sortField, Sort.Direction sortDirection) {
        Sort sort = Sort.by(sortDirection, sortField.getFieldName());
        Pageable pageable = PageRequest.of(page, size, sort);
        Page<AnnouncementResponseDto> announcements = announcementRepository.findAll(pageable)
                .map(AnnouncementMapper.INSTANCE::toAnnouncementResponseDto);
        return new PaginatedAnnouncementResponseDto(announcements);
    }

    @Override
    public AnnouncementResponseDto getById(UUID id) {
        return announcementRepository.findById(id)
                .map(AnnouncementMapper.INSTANCE::toAnnouncementResponseDto)
                .orElseThrow(() -> new AnnouncementNotFoundException("Announcement not found with id: " + id));
    }

    private Announcement prepareAnnouncementToSave(CreateAnnouncementDto createAnnouncementDto, User user) {
        createAnnouncementDto.trimFields();
        Category category = categoryRepository.findById(createAnnouncementDto.getCategoryId())
                .orElseThrow(() -> new AnnouncementValidationException("Category not found with id: " + createAnnouncementDto.getCategoryId()));
        return AnnouncementMapper.INSTANCE.toAnnouncement(createAnnouncementDto, category, user);
    }

    private AnnouncementResponseDto saveAndMapAnnouncement(Announcement newAnnouncement) {
        try {
            Announcement savedAnnouncement = announcementRepository.saveAndFlush(newAnnouncement);
            log.info("Successfully performed create operation for announcement with id = {}", savedAnnouncement.getId());
            return AnnouncementMapper.INSTANCE.toAnnouncementResponseDto(savedAnnouncement);
        } catch (Exception e) {
            log.error("Failed to create announcement in repository", e);
            throw new AnnouncementValidationException("Failed to create announcement", e);
        }
    }

    private String saveImage(MultipartFile image) {
        try {
            String fileName = UUID.randomUUID() + IMAGE_EXTENSION;
            Path imagePath = Paths.get(IMAGE_UPLOAD_FOLDER + fileName);
            Files.createDirectories(imagePath.getParent());
            Files.write(imagePath, image.getBytes());
            return imagePath.toString();
        } catch (IOException e) {
            throw new AnnouncementValidationException("Failed to save image file", e);
        }
    }

}
