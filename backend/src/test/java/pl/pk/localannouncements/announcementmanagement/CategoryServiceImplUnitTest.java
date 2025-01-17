package pl.pk.localannouncements.announcementmanagement;

import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import pl.pk.localannouncements.announcementmanagement.exception.CategoryValidationException;
import pl.pk.localannouncements.announcementmanagement.model.dto.CategoryRequestDto;
import pl.pk.localannouncements.announcementmanagement.model.dto.CategoryResponseDto;
import pl.pk.localannouncements.announcementmanagement.model.entity.Category;
import pl.pk.localannouncements.announcementmanagement.model.entity.Announcement;
import pl.pk.localannouncements.utils.UnitTest;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@UnitTest
class CategoryServiceImplUnitTest {

    @Mock
    private CategoryRepository categoryRepository;

    @InjectMocks
    private CategoryServiceImpl categoryService;

    @Test
    void create_Success() {
        // Mock data
        CategoryRequestDto categoryRequestDto = new CategoryRequestDto();
        categoryRequestDto.setName("Test Category");

        List<Announcement> announcements = List.of();
        Category category = new Category("Test Category", announcements);

        UUID generatedId = UUID.randomUUID();
        Category savedCategory = new Category("Test Category", announcements);
        savedCategory.setId(generatedId);

        // Mocks
        when(categoryRepository.existsByNameIgnoreCase(category.getName())).thenReturn(false);
        when(categoryRepository.save(any(Category.class))).thenReturn(savedCategory);

        // Call the method
        CategoryResponseDto responseDto = categoryService.create(categoryRequestDto);

        // Assertions
        assertNotNull(responseDto);
        assertEquals(generatedId, responseDto.getId());
        assertEquals(savedCategory.getName(), responseDto.getName());

        // Verifications
        verify(categoryRepository).existsByNameIgnoreCase(category.getName());
        verify(categoryRepository).save(any(Category.class));
    }

    @Test
    void create_CategoryAlreadyExists_ThrowsCategoryValidationException() {
        // Mock data
        CategoryRequestDto categoryRequestDto = new CategoryRequestDto();
        categoryRequestDto.setName("Duplicate Category");

        // Mocks
        when(categoryRepository.existsByNameIgnoreCase(categoryRequestDto.getName())).thenReturn(true);

        // Assertions
        CategoryValidationException exception = assertThrows(
                CategoryValidationException.class,
                () -> categoryService.create(categoryRequestDto)
        );

        assertEquals("Category with this name already exists", exception.getMessage());
        verify(categoryRepository).existsByNameIgnoreCase(categoryRequestDto.getName());
        verify(categoryRepository, never()).save(any(Category.class));
    }

    @Test
    void getAll_Success() {
        // Mock data
        List<Category> categories = List.of(
                new Category("Category1", List.of()),
                new Category("Category2", List.of())
        );

        UUID categoryId1 = UUID.randomUUID();
        UUID categoryId2 = UUID.randomUUID();
        categories.get(0).setId(categoryId1);
        categories.get(1).setId(categoryId2);

        // Mocks
        when(categoryRepository.findAll()).thenReturn(categories);

        // Call the method
        List<CategoryResponseDto> responseDtos = categoryService.getAll();

        // Assertions
        assertNotNull(responseDtos);
        assertEquals(2, responseDtos.size());
        assertEquals("Category1", responseDtos.get(0).getName());
        assertEquals("Category2", responseDtos.get(1).getName());

        // Verifications
        verify(categoryRepository).findAll();
    }

    @Test
    void updateById_Success() {
        // Mock data
        UUID categoryId = UUID.randomUUID();
        CategoryRequestDto categoryRequestDto = new CategoryRequestDto();
        categoryRequestDto.setName("Updated Category");

        Category existingCategory = new Category("Old Category", List.of());
        existingCategory.setId(categoryId);

        Category updatedCategory = new Category("Updated Category", List.of());
        updatedCategory.setId(categoryId);

        // Mocks
        when(categoryRepository.findById(categoryId)).thenReturn(Optional.of(existingCategory));
        when(categoryRepository.save(existingCategory)).thenReturn(updatedCategory);

        // Call the method
        CategoryResponseDto responseDto = categoryService.updateById(categoryId, categoryRequestDto);

        // Assertions
        assertNotNull(responseDto);
        assertEquals(categoryId, responseDto.getId());
        assertEquals("Updated Category", responseDto.getName());

        // Verifications
        verify(categoryRepository).findById(categoryId);
        verify(categoryRepository).save(existingCategory);
    }

    @Test
    void deleteById_Success() {
        // Mock data
        UUID categoryId = UUID.randomUUID();

        // Mocks
        when(categoryRepository.existsById(categoryId)).thenReturn(true);

        // Call the method
        categoryService.deleteById(categoryId);

        // Verifications
        verify(categoryRepository).existsById(categoryId);
        verify(categoryRepository).deleteById(categoryId);
    }

    @Test
    void deleteById_CategoryNotFound_ThrowsCategoryValidationException() {
        // Mock data
        UUID categoryId = UUID.randomUUID();

        // Mocks
        when(categoryRepository.existsById(categoryId)).thenReturn(false);

        // Assertions
        CategoryValidationException exception = assertThrows(
                CategoryValidationException.class,
                () -> categoryService.deleteById(categoryId)
        );

        assertEquals("Category not found with id: " + categoryId, exception.getMessage());
        verify(categoryRepository).existsById(categoryId);
        verify(categoryRepository, never()).deleteById(categoryId);
    }
}
