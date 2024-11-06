package pl.pk.localannouncements.usermanagement;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;
import pl.pk.localannouncements.usermanagement.model.dto.RegisterUserDto;
import pl.pk.localannouncements.usermanagement.model.entity.User;

@Mapper(componentModel = "spring")
interface UserMapper {
    UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);

    @Mapping(target = "id", ignore = true)
    User toUser(RegisterUserDto registerUserDto);

}
