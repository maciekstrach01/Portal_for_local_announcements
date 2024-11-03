package pl.pk.localannouncements.usermanagement;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import pl.pk.localannouncements.usermanagement.exception.AuthValidationException;
import pl.pk.localannouncements.usermanagement.exception.LogoutValidationException;
import pl.pk.localannouncements.usermanagement.exception.RefreshTokenValidationException;
import pl.pk.localannouncements.usermanagement.model.dto.AuthenticateUserDto;
import pl.pk.localannouncements.usermanagement.model.dto.AuthenticationResponse;
import pl.pk.localannouncements.usermanagement.model.dto.RegisterUserDto;
import pl.pk.localannouncements.usermanagement.model.dto.TokenOperationsDto;
import pl.pk.localannouncements.usermanagement.model.entity.User;

import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
class AuthenticationServiceImpl implements AuthenticationService {

    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    @Override
    @Transactional
    public AuthenticationResponse register(RegisterUserDto registerUserDto) {
        validateUserDoesNotExist(registerUserDto.getEmail());

        User newUser = prepareUserToSave(registerUserDto);
        User createdUser = saveNewUser(newUser);

        return generateAuthenticationResponse(createdUser);
    }

    @Override
    @Transactional
    public AuthenticationResponse authenticate(AuthenticateUserDto authenticateUserDto) {
        authenticateUser(authenticateUserDto);

        User retrievedUser = getUserFromDatabase(authenticateUserDto.getEmail());

        return generateAuthenticationResponse(retrievedUser);
    }

    @Override
    public AuthenticationResponse refreshToken(TokenOperationsDto tokenOperationsDto) {
        return Optional.ofNullable(jwtService.extractUser(tokenOperationsDto.getRefreshToken()))
                .filter(user -> jwtService.isTokenValid(tokenOperationsDto.getRefreshToken(), user))
                .map(user -> generateAuthenticationResponse((User) user))
                .orElseThrow(() -> new RefreshTokenValidationException("Invalid refresh token"));
    }

    @Override
    public void logout(TokenOperationsDto tokenOperationsDto) {
        Optional.ofNullable(jwtService.extractUser(tokenOperationsDto.getRefreshToken()))
                .filter(user -> jwtService.isTokenValid(tokenOperationsDto.getRefreshToken(), user))
                .ifPresentOrElse(
                        user -> {
                            jwtService.revokeToken(tokenOperationsDto.getRefreshToken());
                            SecurityContextHolder.clearContext();
                        },
                        () -> {
                            throw new LogoutValidationException("Invalid refresh token");
                        }
                );
    }

    private void authenticateUser(AuthenticateUserDto authenticateUserDto) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        authenticateUserDto.getEmail(),
                        authenticateUserDto.getPassword()
                )
        );
    }

    private User getUserFromDatabase(String email) {
        return userRepository.findUserByEmail(email)
                .orElseThrow();
    }

    private void validateUserDoesNotExist(String email) {
        if (userRepository.existsByEmail(email)) {
            throw new AuthValidationException("User with this email already exists");
        }
    }

    private User prepareUserToSave(RegisterUserDto registerUserDto) {
        registerUserDto.trimFields();
        User newUser = UserMapper.INSTANCE.toUser(registerUserDto);
        String hashedPassword = passwordEncoder.encode(registerUserDto.getPassword());
        newUser.setPassword(hashedPassword);
        return newUser;
    }

    private User saveNewUser(User newUser) {
        try {
            User createdUser = userRepository.save(newUser);
            log.info("Saved new user in repository with id = {}", createdUser.getId());
            return createdUser;
        } catch (Exception e) {
            log.error("Failed to save new user in repository", e);
            throw new AuthValidationException("Failed to create new user", e);
        }
    }

    private AuthenticationResponse generateAuthenticationResponse(User user) {
        String accessToken = jwtService.generateAccessToken(user);
        String refreshToken = jwtService.generateRefreshToken(user);
        return AuthenticationResponse.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .build();
    }

}
