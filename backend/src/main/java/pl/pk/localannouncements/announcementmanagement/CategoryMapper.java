package pl.pk.localannouncements.announcementmanagement;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;
import pl.pk.localannouncements.announcementmanagement.model.dto.CategoryRequestDto;
import pl.pk.localannouncements.announcementmanagement.model.dto.CategoryResponseDto;
import pl.pk.localannouncements.announcementmanagement.model.entity.Category;

@Mapper(componentModel = "spring")
interface CategoryMapper {

    CategoryMapper INSTANCE = Mappers.getMapper(CategoryMapper.class);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "creationTimestamp", ignore = true)
    @Mapping(target = "updateTimestamp", ignore = true)
    Category toCategory(CategoryRequestDto categoryRequestDto);

    CategoryResponseDto toCategoryResponseDto(Category category);

}
