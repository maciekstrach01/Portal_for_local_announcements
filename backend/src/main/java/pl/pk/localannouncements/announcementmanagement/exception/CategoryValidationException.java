package pl.pk.localannouncements.announcementmanagement.exception;

import pl.pk.localannouncements.common.exception.ValidationException;

public class CategoryValidationException extends ValidationException {

    public CategoryValidationException(String message) {
        super(message);
    }

    public CategoryValidationException(String message, Throwable cause) {
        super(message, cause);
    }

}
