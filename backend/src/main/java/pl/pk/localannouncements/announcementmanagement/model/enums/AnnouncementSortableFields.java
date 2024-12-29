package pl.pk.localannouncements.announcementmanagement.model.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum AnnouncementSortableFields {

    TITLE("title"),
    CREATION_TIMESTAMP("creationTimestamp"),
    PRICE("price");

    private final String fieldName;

}
