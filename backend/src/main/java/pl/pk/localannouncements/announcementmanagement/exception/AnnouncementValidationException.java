package pl.pk.localannouncements.announcementmanagement.exception;

import pl.pk.localannouncements.common.exception.ValidationException;

public class AnnouncementValidationException extends ValidationException {

    public AnnouncementValidationException(String message) {
        super(message);
    }

    public AnnouncementValidationException(String message, Throwable cause) {
        super(message, cause);
    }

}
