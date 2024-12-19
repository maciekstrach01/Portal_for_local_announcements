package pl.pk.localannouncements.usermanagement.exception;

import pl.pk.localannouncements.common.exception.ValidationException;

public class RefreshTokenValidationException extends ValidationException {

    public RefreshTokenValidationException(String message) {
        super(message);
    }

}
