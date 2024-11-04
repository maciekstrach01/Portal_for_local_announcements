package pl.pk.localannouncements.usermanagement.exception;

import pl.pk.localannouncements.exception.ValidationException;

public class InvalidPasswordException extends ValidationException {

    public InvalidPasswordException(String message) {
        super(message);
    }

}
