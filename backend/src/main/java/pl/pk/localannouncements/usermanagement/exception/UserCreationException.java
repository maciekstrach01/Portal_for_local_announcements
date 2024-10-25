package pl.pk.localannouncements.usermanagement.exception;


import pl.pk.localannouncements.exception.CreationException;

public class UserCreationException extends CreationException {

    public UserCreationException(String message) {
        super(message);
    }

    public UserCreationException(String message, Throwable cause) {
        super(message, cause);
    }

}
