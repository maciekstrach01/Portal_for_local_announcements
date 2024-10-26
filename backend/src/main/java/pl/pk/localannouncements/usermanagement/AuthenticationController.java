package pl.pk.localannouncements.usermanagement;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.pk.localannouncements.exception.ErrorResponse;
import pl.pk.localannouncements.usermanagement.model.dto.AuthenticationDto;
import pl.pk.localannouncements.usermanagement.model.dto.RegisterUserDto;

@Validated
@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
class AuthenticationController {

    private final AuthenticationService authenticationService;

    @Operation(operationId = "register", summary = "Register a User", tags = {"auth"},
            description = "Service used to register a new user in the system.",
            responses = {
                    @ApiResponse(responseCode = "201", description = "Created", content = @Content(
                            mediaType = MediaType.APPLICATION_JSON_VALUE,
                            schema = @Schema(implementation = AuthenticationDto.class)
                    )),
                    @ApiResponse(responseCode = "400", description = "Bad Request", content = @Content(
                            mediaType = MediaType.APPLICATION_JSON_VALUE,
                            schema = @Schema(implementation = ErrorResponse.class)
                    )),
                    @ApiResponse(responseCode = "405", description = "Method Not Allowed", content = @Content(
                            mediaType = MediaType.APPLICATION_JSON_VALUE,
                            schema = @Schema(implementation = ErrorResponse.class)
                    )),
                    @ApiResponse(responseCode = "415", description = "Unsupported Media Type", content = @Content(
                            mediaType = MediaType.APPLICATION_JSON_VALUE,
                            schema = @Schema(implementation = ErrorResponse.class)
                    ))
            }
    )
    @PostMapping(value = "/register", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<AuthenticationDto> register(@Valid @RequestBody RegisterUserDto registerUserDto) {
        AuthenticationDto authenticationDto = authenticationService.register(registerUserDto);
        return new ResponseEntity<>(authenticationDto, HttpStatus.CREATED);
    }

}
