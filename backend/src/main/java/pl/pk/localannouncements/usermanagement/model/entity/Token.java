package pl.pk.localannouncements.usermanagement.model.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;
import pl.pk.localannouncements.common.model.BaseEntity;
import pl.pk.localannouncements.usermanagement.model.enums.TokenType;

import java.time.Instant;

@Getter
@Setter
@Entity
@SuperBuilder
@AllArgsConstructor
@RequiredArgsConstructor
@Table(name = "tokens")
@SQLRestriction("deleted = false")
@SQLDelete(sql = "UPDATE tokens SET deleted = true, update_timestamp = NOW() WHERE id=?")
public class Token extends BaseEntity {

    @Column(name = "token", nullable = false, unique = true)
    private String token;

    @Builder.Default
    @Enumerated(EnumType.STRING)
    @Column(name = "token_type", nullable = false)
    private TokenType tokenType = TokenType.BEARER;

    @Column(nullable = false)
    private Instant expirationDate;

    @Column(name = "revoked", nullable = false)
    private boolean revoked;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

}
