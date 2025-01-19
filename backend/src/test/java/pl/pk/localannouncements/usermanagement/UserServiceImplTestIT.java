package pl.pk.localannouncements.usermanagement;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;
import pl.pk.localannouncements.usermanagement.model.entity.User;
import java.util.Optional;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@ActiveProfiles("test")
@Transactional
class UserServiceImplTestIT {

    @Autowired
    private UserService userService;

    @Test
    void testFindUserByEmail_UserExists() {
        Optional<User> user = userService.findUserByEmail("admin@example.com");
        assertTrue(user.isPresent());
        assertEquals("admin@example.com", user.get().getEmail());
    }

    @Test
    void testFindUserByEmail_UserDoesNotExist() {
        Optional<User> user = userService.findUserByEmail("admin2@example.com");
        assertFalse(user.isPresent());
    }

}
