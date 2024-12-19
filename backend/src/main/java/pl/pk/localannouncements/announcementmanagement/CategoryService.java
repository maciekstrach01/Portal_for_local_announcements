package pl.pk.localannouncements.announcementmanagement;

import pl.pk.localannouncements.announcementmanagement.model.dto.CategoryRequestDto;
import pl.pk.localannouncements.announcementmanagement.model.dto.CategoryResponseDto;

import java.util.List;
import java.util.UUID;

public interface CategoryService {

    CategoryResponseDto create(CategoryRequestDto categoryRequestDto);

    List<CategoryResponseDto> getAll();

    CategoryResponseDto updateById(UUID id, CategoryRequestDto categoryRequestDto);

    void deleteById(UUID id);

}
