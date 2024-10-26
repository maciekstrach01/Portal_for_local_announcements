package pl.pk.localannouncements.usermanagement;

import pl.pk.localannouncements.usermanagement.model.dto.AuthenticationDto;
import pl.pk.localannouncements.usermanagement.model.dto.RegisterUserDto;

public interface AuthenticationService {

    AuthenticationDto register(RegisterUserDto registerUserDto);

}
