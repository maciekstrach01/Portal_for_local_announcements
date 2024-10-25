package pl.pk.localannouncements.usermanagement;

import pl.pk.localannouncements.usermanagement.model.entity.User;

import java.util.Optional;

public interface UserService {

    Optional<User> findUserByEmail(String username);

}
