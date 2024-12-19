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
import pl.pk.localannouncements.usermanagement.exception.RefreshTokenValidationException;
import pl.pk.localannouncements.usermanagement.model.dto.AuthenticateUserDto;
import pl.pk.localannouncements.usermanagement.model.dto.AuthenticationResponse;
import pl.pk.localannouncements.usermanagement.model.dto.RefreshTokenOperationsDto;
import pl.pk.localannouncements.usermanagement.model.dto.RegisterUserDto;
import pl.pk.localannouncements.usermanagement.model.entity.User;
import pl.pk.localannouncements.usermanagement.model.enums.Role;

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
        User newUser = prepareUserToSave(registerUserDto);

        validateUserDoesNotExist(newUser.getEmail());

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
    public AuthenticationResponse refreshToken(RefreshTokenOperationsDto refreshTokenOperationsDto) {
        User user = validateAndExtractUserFromToken(refreshTokenOperationsDto.getRefreshToken());
        return generateAuthenticationResponse(user);
    }

    @Override
    public void logout(RefreshTokenOperationsDto refreshTokenOperationsDto) {
        validateAndExtractUserFromToken(refreshTokenOperationsDto.getRefreshToken());
        jwtService.revokeToken(refreshTokenOperationsDto.getRefreshToken());
        SecurityContextHolder.clearContext();
    }

    private User validateAndExtractUserFromToken(String refreshToken) {
        User user = (User) jwtService.extractUser(refreshToken);
        if (!jwtService.isRefreshTokenValid(refreshToken, user)) {
            throw new RefreshTokenValidationException("Invalid refresh token");
        }
        return user;
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
        if (userRepository.existsByEmailIgnoreCase(email)) {
            throw new AuthValidationException("User with this email already exists");
        }
    }

    private User prepareUserToSave(RegisterUserDto registerUserDto) {
        registerUserDto.trimFields();
        User newUser = UserMapper.INSTANCE.toUser(registerUserDto);
        String hashedPassword = passwordEncoder.encode(registerUserDto.getPassword());
        newUser.setPassword(hashedPassword);
        newUser.setRole(Role.USER);
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
