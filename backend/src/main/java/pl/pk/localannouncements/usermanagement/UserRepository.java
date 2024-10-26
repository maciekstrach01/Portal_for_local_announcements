package pl.pk.localannouncements.usermanagement;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.pk.localannouncements.usermanagement.model.entity.User;

import java.util.Optional;
import java.util.UUID;

interface UserRepository extends JpaRepository<User, UUID> {

    Optional<User> findUserByEmail(String email);

    boolean existsByEmail(String email);

}
