package pl.pk.localannouncements.usermanagement;

import jakarta.servlet.http.HttpServletRequest;
import pl.pk.localannouncements.usermanagement.model.dto.AuthenticateUserDto;
import pl.pk.localannouncements.usermanagement.model.dto.AuthenticationResponse;
import pl.pk.localannouncements.usermanagement.model.dto.RegisterUserDto;

public interface AuthenticationService {

    AuthenticationResponse register(RegisterUserDto registerUserDto);

    AuthenticationResponse authenticate(AuthenticateUserDto authenticateUserDto);

    AuthenticationResponse refreshToken(HttpServletRequest request);

    void logout(HttpServletRequest request);

}
