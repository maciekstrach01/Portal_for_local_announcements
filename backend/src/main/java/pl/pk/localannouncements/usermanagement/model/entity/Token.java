package pl.pk.localannouncements.usermanagement.model.entity;

import jakarta.persistence.*;
import lombok.*;
import pl.pk.localannouncements.usermanagement.model.enums.TokenType;

import java.time.Instant;

@Data
@Entity
@Table(name = "token")
@Setter
@Builder
@RequiredArgsConstructor
@AllArgsConstructor
public class Token {

    @Id
    @GeneratedValue
    public Long id;

    @Column(name = "token", nullable = false, unique = true)
    public String token;

    @Enumerated(EnumType.STRING)
    @Column(name = "token_type", nullable = false)
    public TokenType tokenType = TokenType.BEARER;

    @Column(nullable = false)
    private Instant expirationDate;

    @Column(name = "revoked", nullable = false)
    public boolean revoked;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    public User user;

}
