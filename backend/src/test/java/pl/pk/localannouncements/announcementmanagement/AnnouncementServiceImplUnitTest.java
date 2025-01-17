package pl.pk.localannouncements.announcementmanagement;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.*;
import pl.pk.localannouncements.announcementmanagement.exception.AnnouncementNotFoundException;
import pl.pk.localannouncements.announcementmanagement.exception.AnnouncementValidationException;
import pl.pk.localannouncements.announcementmanagement.model.dto.AnnouncementResponseDto;
import pl.pk.localannouncements.announcementmanagement.model.dto.CreateAnnouncementDto;
import pl.pk.localannouncements.announcementmanagement.model.dto.PaginatedAnnouncementResponseDto;
import pl.pk.localannouncements.announcementmanagement.model.entity.Announcement;
import pl.pk.localannouncements.announcementmanagement.model.entity.Category;
import pl.pk.localannouncements.announcementmanagement.model.enums.AnnouncementSortableFields;
import pl.pk.localannouncements.usermanagement.model.entity.User;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AnnouncementServiceImplUnitTest {

    @Mock
    private AnnouncementRepository announcementRepository;

    @Mock
    private CategoryRepository categoryRepository;

    @Mock
    private AnnouncementMapper announcementMapper;

    @InjectMocks
    private AnnouncementServiceImpl announcementService;


    private CreateAnnouncementDto createValidCreateAnnouncementDto() {
        return CreateAnnouncementDto.builder()
                .title("Test Title")
                .categoryId(UUID.randomUUID())
                .description("Test Description with enough characters.")
                .price(new BigDecimal("100.00"))
                .phoneNumber("+48123123123")
                .image(null)
                .build();
    }

    private AnnouncementResponseDto createValidAnnouncementResponseDto(UUID id) {
        return AnnouncementResponseDto.builder()
                .id(id)
                .title("Test Title")
                .description("Test Description with enough characters.")
                .price(new BigDecimal("100.00"))
                .categoryName("Test Category")
                .phoneNumber("+48123123123")
                .build();
    }

    @Test
    void create_Success() {
        // Mock data
        User user = new User();
        user.setId(UUID.randomUUID());

        CreateAnnouncementDto createAnnouncementDto = createValidCreateAnnouncementDto();

        Category category = new Category();
        category.setId(createAnnouncementDto.getCategoryId());

        UUID announcementId = UUID.randomUUID();
        Announcement announcement = new Announcement();
        announcement.setId(announcementId);

        AnnouncementResponseDto responseDto = createValidAnnouncementResponseDto(announcementId);

        // Mockowanie
        when(categoryRepository.findById(createAnnouncementDto.getCategoryId())).thenReturn(Optional.of(category));
        when(announcementRepository.saveAndFlush(any(Announcement.class))).thenReturn(announcement);

        // Wywołanie
        AnnouncementResponseDto result = announcementService.create(user, createAnnouncementDto);

        // Assercje
        assertNotNull(result);
        assertEquals(responseDto.getId(), result.getId());

        // Weryfikacja
        verify(categoryRepository).findById(createAnnouncementDto.getCategoryId());
        verify(announcementRepository).saveAndFlush(any(Announcement.class));
    }

    @Test
    void create_CategoryNotFound_ThrowsException() {
        // Mock data
        CreateAnnouncementDto createAnnouncementDto = createValidCreateAnnouncementDto();

        // Mockowanie
        when(categoryRepository.findById(createAnnouncementDto.getCategoryId())).thenReturn(Optional.empty());

        // Wywołanie i assercje
        assertThrows(AnnouncementValidationException.class, () ->
                announcementService.create(new User(), createAnnouncementDto));

        // Weryfikacja
        verify(categoryRepository).findById(createAnnouncementDto.getCategoryId());
        verifyNoInteractions(announcementRepository);
    }

    @Test
    void getById_Success() {
        // Mock data
        UUID id = UUID.randomUUID();
        Announcement announcement = new Announcement();
        announcement.setId(id);

        AnnouncementResponseDto responseDto = createValidAnnouncementResponseDto(id);

        // Mockowanie
        when(announcementRepository.findById(id)).thenReturn(Optional.of(announcement));

        // Wywołanie
        AnnouncementResponseDto result = announcementService.getById(id);

        // Assercje
        assertNotNull(result);
        assertEquals(id, result.getId());

        // Weryfikacja
        verify(announcementRepository).findById(id);
    }

    @Test
    void getById_NotFound_ThrowsException() {
        // Mock data
        UUID id = UUID.randomUUID();

        // Mockowanie
        when(announcementRepository.findById(id)).thenReturn(Optional.empty());

        // Wywołanie i assercje
        assertThrows(AnnouncementNotFoundException.class, () -> announcementService.getById(id));

        // Weryfikacja
        verify(announcementRepository).findById(id);
    }

    @Test
    void shouldHandleEmptyAnnouncementList() {
        // Arrange
        int page = 0;
        int size = 10;
        AnnouncementSortableFields sortField = AnnouncementSortableFields.TITLE;
        Sort.Direction sortDirection = Sort.Direction.ASC;
        Sort sort = Sort.by(sortDirection, sortField.getFieldName());
        Pageable pageable = PageRequest.of(page, size, sort);

        Page<AnnouncementResponseDto> emptyPage = new PageImpl<>(List.of());
        when(announcementRepository.findAll(pageable)).thenReturn(Page.empty());

        // Act
        PaginatedAnnouncementResponseDto result = announcementService.getAll(page, size, sortField, sortDirection);

        // Assert
        assertNotNull(result);
        assertNotNull(result.getContent());
        assertTrue(result.getContent().isEmpty());

        // Weryfikacja
        verify(announcementRepository).findAll(pageable);
        verifyNoInteractions(announcementMapper);
    }

    @Test
    void shouldUseCorrectSortAndPagination() {
        // Arrange
        int page = 1;
        int size = 5;
        AnnouncementSortableFields sortField = AnnouncementSortableFields.TITLE;
        Sort.Direction sortDirection = Sort.Direction.DESC;
        Sort sort = Sort.by(sortDirection, sortField.getFieldName());
        Pageable pageable = PageRequest.of(page, size, sort);

        when(announcementRepository.findAll(pageable)).thenReturn(Page.empty());

        // Act
        announcementService.getAll(page, size, sortField, sortDirection);

        // Assert
        verify(announcementRepository).findAll(pageable);
        verifyNoInteractions(announcementMapper);
    }

}
