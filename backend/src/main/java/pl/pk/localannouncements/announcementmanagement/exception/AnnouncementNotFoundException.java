package pl.pk.localannouncements.announcementmanagement.exception;

import pl.pk.localannouncements.common.exception.NotFoundException;

public class AnnouncementNotFoundException extends NotFoundException {

    public AnnouncementNotFoundException(String message) {
        super(message);
    }

}
