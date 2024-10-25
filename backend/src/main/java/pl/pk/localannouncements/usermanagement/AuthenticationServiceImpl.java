package pl.pk.localannouncements.usermanagement;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import pl.pk.localannouncements.usermanagement.exception.UserCreationException;
import pl.pk.localannouncements.usermanagement.model.dto.AuthenticationDto;
import pl.pk.localannouncements.usermanagement.model.dto.RegisterUserDto;
import pl.pk.localannouncements.usermanagement.model.entity.User;

@Slf4j
@Service
@RequiredArgsConstructor
class AuthenticationServiceImpl implements AuthenticationService {

    private final UserRepository userRepository;

    private final JwtService jwtService;

    @Override
    @Transactional
    public AuthenticationDto register(RegisterUserDto registerUserDto) {
        validateUserDoesNotExist(registerUserDto.getEmail());
        registerUserDto.trimFields();

        User newUser = UserMapper.INSTANCE.toUser(registerUserDto);
        User createdUser = saveNewUser(newUser);

        return createAuthenticationDto(createdUser);
    }

    private void validateUserDoesNotExist(String email) {
        if (userRepository.existsByEmail(email)) {
            throw new UserCreationException("User with this email already exists: " + email);
        }
    }

    private User saveNewUser(User newUser) {
        try {
            User createdUser = userRepository.save(newUser);
            log.info("Saved new user in repository with id = {}", createdUser.getId());
            return createdUser;
        } catch (Exception e) {
            log.error("Failed to save new user in repository", e);
            throw new UserCreationException("Failed to create new user", e);
        }
    }

    private AuthenticationDto createAuthenticationDto(User user) {
        String jwtToken = jwtService.generateToken(user);
        return AuthenticationDto.builder()
                .token(jwtToken)
                .build();
    }

}
