package pl.pk.localannouncements.usermanagement;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.pk.localannouncements.usermanagement.model.entity.User;

import java.util.Optional;

@Service
@RequiredArgsConstructor
class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Override
    public Optional<User> findUserByEmail(String username) {
        return userRepository.findUserByEmail(username);
    }

}
