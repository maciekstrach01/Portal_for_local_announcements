package pl.pk.localannouncements.announcementmanagement;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import pl.pk.localannouncements.announcementmanagement.model.dto.AnnouncementResponseDto;
import pl.pk.localannouncements.announcementmanagement.model.dto.CreateAnnouncementDto;
import pl.pk.localannouncements.announcementmanagement.model.dto.PaginatedAnnouncementResponseDto;
import pl.pk.localannouncements.announcementmanagement.model.enums.AnnouncementSortableFields;
import pl.pk.localannouncements.common.exception.ErrorResponse;
import pl.pk.localannouncements.usermanagement.model.entity.User;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/announcement")
@RequiredArgsConstructor
class AnnouncementController {

    private final AnnouncementService announcementService;

    @Operation(
            operationId = "create-announcement", summary = "Create a new announcement", tags = {"Announcements"},
            description = "Service used to create a new announcement for logged-in users.",
            requestBody = @RequestBody(
                    description = "Form data for creating an announcement",
                    content = @Content(
                            mediaType = MediaType.MULTIPART_FORM_DATA_VALUE,
                            schema = @Schema(implementation = CreateAnnouncementDto.class)
                    )
            ),
            responses = {
                    @ApiResponse(
                            responseCode = "201",
                            description = "Announcement created successfully",
                            content = @Content(
                                    mediaType = MediaType.APPLICATION_JSON_VALUE,
                                    schema = @Schema(implementation = AnnouncementResponseDto.class)
                            )
                    ),
                    @ApiResponse(
                            responseCode = "400",
                            description = "Bad Request",
                            content = @Content(
                                    mediaType = MediaType.APPLICATION_JSON_VALUE,
                                    schema = @Schema(implementation = ErrorResponse.class)
                            )
                    ),
                    @ApiResponse(
                            responseCode = "401",
                            description = "Unauthorized",
                            content = @Content(
                                    mediaType = MediaType.APPLICATION_JSON_VALUE,
                                    schema = @Schema(implementation = ErrorResponse.class)
                            )
                    ),
                    @ApiResponse(
                            responseCode = "415",
                            description = "Unsupported Media Type",
                            content = @Content(
                                    mediaType = MediaType.APPLICATION_JSON_VALUE,
                                    schema = @Schema(implementation = ErrorResponse.class)
                            )
                    )
            }
    )
    @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<AnnouncementResponseDto> createAnnouncement(@AuthenticationPrincipal User user, @Valid @ModelAttribute CreateAnnouncementDto createAnnouncementDto) {
        AnnouncementResponseDto announcementResponseDto = announcementService.create(user, createAnnouncementDto);
        return new ResponseEntity<>(announcementResponseDto, HttpStatus.CREATED);
    }

    @Operation(
            operationId = "get-all-announcements", summary = "Get all announcements with pagination", tags = {"Announcements"},
            description = "Service used to retrieve all announcements with pagination support.",
            responses = {
                    @ApiResponse(
                            responseCode = "200",
                            description = "List of announcements retrieved successfully",
                            content = @Content(
                                    mediaType = MediaType.APPLICATION_JSON_VALUE,
                                    schema = @Schema(implementation = PaginatedAnnouncementResponseDto.class)
                            )
                    )
            }
    )
    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<PaginatedAnnouncementResponseDto> getAllAnnouncements(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "CREATION_TIMESTAMP") AnnouncementSortableFields sortField,
            @RequestParam(defaultValue = "DESC") Sort.Direction sortDirection) {
        PaginatedAnnouncementResponseDto announcements = announcementService.getAll(page, size, sortField, sortDirection);
        return new ResponseEntity<>(announcements, HttpStatus.OK);
    }

    @Operation(operationId = "get-announcement", summary = "Get an announcement", tags = {"Announcements"},
            description = "Service used to retrieve an announcement by its ID.",
            responses = {
                    @ApiResponse(
                            responseCode = "200",
                            description = "Announcement retrieved successfully",
                            content = @Content(
                                    mediaType = MediaType.APPLICATION_JSON_VALUE,
                                    schema = @Schema(implementation = AnnouncementResponseDto.class)
                            )
                    ),
                    @ApiResponse(
                            responseCode = "400",
                            description = "Bad Request",
                            content = @Content(
                                    mediaType = MediaType.APPLICATION_JSON_VALUE,
                                    schema = @Schema(implementation = ErrorResponse.class)
                            )
                    ),
                    @ApiResponse(
                            responseCode = "404",
                            description = "Announcement not found",
                            content = @Content(
                                    mediaType = MediaType.APPLICATION_JSON_VALUE,
                                    schema = @Schema(implementation = ErrorResponse.class)
                            )
                    )
            }
    )
    @GetMapping("/{id}")
    public ResponseEntity<AnnouncementResponseDto> getAnnouncementById(@PathVariable UUID id) {
        AnnouncementResponseDto announcement = announcementService.getById(id);
        return new ResponseEntity<>(announcement, HttpStatus.OK);
    }

}
