package pl.pk.localannouncements.announcementmanagement;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import pl.pk.localannouncements.announcementmanagement.exception.CategoryValidationException;
import pl.pk.localannouncements.announcementmanagement.model.dto.CategoryRequestDto;
import pl.pk.localannouncements.announcementmanagement.model.dto.CategoryResponseDto;
import pl.pk.localannouncements.announcementmanagement.model.entity.Category;

import java.util.List;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;

    @Override
    @Transactional
    public CategoryResponseDto create(CategoryRequestDto categoryRequestDto) {
        Category newCategory = prepareCategoryToSave(categoryRequestDto);

        validateIfCategoryAlreadyExists(newCategory.getName());

        return saveAndMapCategory(newCategory, "create new");
    }

    @Override
    public List<CategoryResponseDto> getAll() {
        return categoryRepository.findAll().stream()
                .map(CategoryMapper.INSTANCE::toCategoryResponseDto)
                .toList();
    }

    @Override
    @Transactional
    public CategoryResponseDto updateById(UUID id, CategoryRequestDto categoryRequestDto) {
        Category existingCategory = getAndValidateCategoryById(id);

        applyUpdatesToCategory(existingCategory, categoryRequestDto);

        return saveAndMapCategory(existingCategory, "update");
    }

    @Override
    @Transactional
    public void deleteById(UUID id) {
        if (!categoryRepository.existsById(id)) {
            throw new CategoryValidationException("Category not found with id: " + id);
        }

        categoryRepository.deleteById(id);
        log.info("Deleted category with id = {}", id);
    }

    private void validateIfCategoryAlreadyExists(String name) {
        if (categoryRepository.existsByNameIgnoreCase(name)) {
            throw new CategoryValidationException("Category with this name already exists");
        }
    }

    private Category prepareCategoryToSave(CategoryRequestDto categoryRequestDto) {
        categoryRequestDto.trimFields();
        return CategoryMapper.INSTANCE.toCategory(categoryRequestDto);
    }

    private CategoryResponseDto saveAndMapCategory(Category category, String operationType) {
        try {
            Category savedCategory = categoryRepository.save(category);
            log.info("Successfully performed '{}' operation for category with id = {}", operationType, savedCategory.getId());
            return CategoryMapper.INSTANCE.toCategoryResponseDto(savedCategory);
        } catch (Exception e) {
            log.error("Failed to '{}' category in repository", operationType, e);
            throw new CategoryValidationException("Failed to " + operationType + " category", e);
        }
    }

    private Category getAndValidateCategoryById(UUID id) {
        return categoryRepository.findById(id)
                .orElseThrow(() -> new CategoryValidationException("Category not found with id: " + id));
    }

    private void applyUpdatesToCategory(Category category, CategoryRequestDto categoryRequestDto) {
        categoryRequestDto.trimFields();
        if (isFieldPresent(categoryRequestDto.getName())) {
            validateIfCategoryAlreadyExists(categoryRequestDto.getName());
            category.setName(categoryRequestDto.getName());
        }
    }

    private boolean isFieldPresent(String field) {
        return field != null && !field.isBlank();
    }

}

