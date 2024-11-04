package pl.pk.localannouncements.usermanagement.exception;

import pl.pk.localannouncements.exception.ValidationException;

public class LogoutValidationException extends ValidationException {

    public LogoutValidationException(String message) {
        super(message);
    }

}
