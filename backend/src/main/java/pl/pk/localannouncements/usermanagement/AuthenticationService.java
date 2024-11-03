package pl.pk.localannouncements.usermanagement;

import pl.pk.localannouncements.usermanagement.model.dto.AuthenticateUserDto;
import pl.pk.localannouncements.usermanagement.model.dto.AuthenticationResponse;
import pl.pk.localannouncements.usermanagement.model.dto.RegisterUserDto;
import pl.pk.localannouncements.usermanagement.model.dto.TokenOperationsDto;

public interface AuthenticationService {

    AuthenticationResponse register(RegisterUserDto registerUserDto);

    AuthenticationResponse authenticate(AuthenticateUserDto authenticateUserDto);

    AuthenticationResponse refreshToken(TokenOperationsDto tokenOperationsDto);

    void logout(TokenOperationsDto tokenOperationsDto);

}
