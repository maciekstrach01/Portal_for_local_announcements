package pl.pk.localannouncements.common.model;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import org.springframework.data.domain.Page;

import java.util.List;

@Data
@Schema(name = "PaginatedResponse", description = "Generic paginated response structure")
public class PaginatedResponse<T> {

    @Schema(description = "The list of items on the current page")
    private List<T> content;

    @Schema(description = "The current page number")
    private int currentPage;

    @Schema(description = "The total number of pages")
    private int totalPages;

    @Schema(description = "The total number of items")
    private long totalItems;

    @Schema(description = "The size of the page")
    private int pageSize;

    public PaginatedResponse(Page<T> page) {
        this.content = page.getContent();
        this.currentPage = page.getNumber();
        this.totalPages = page.getTotalPages();
        this.totalItems = page.getTotalElements();
        this.pageSize = page.getSize();
    }

}
