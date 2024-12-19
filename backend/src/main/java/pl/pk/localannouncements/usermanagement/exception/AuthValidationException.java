package pl.pk.localannouncements.usermanagement.exception;


import pl.pk.localannouncements.common.exception.ValidationException;

public class AuthValidationException extends ValidationException {

    public AuthValidationException(String message) {
        super(message);
    }

    public AuthValidationException(String message, Throwable cause) {
        super(message, cause);
    }

}
