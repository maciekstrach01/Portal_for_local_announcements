package pl.pk.localannouncements.usermanagement;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import pl.pk.localannouncements.usermanagement.model.entity.Token;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

interface TokenRepository extends JpaRepository<Token, UUID> {

    @Query(value = """
            select t from Token t inner join User u\s
            on t.user.id = u.id\s
            where u.id = :id and (t.revoked = false)\s
            """)
    List<Token> findAllValidTokenByUser(UUID id);

    Optional<Token> findByToken(String token);

}
