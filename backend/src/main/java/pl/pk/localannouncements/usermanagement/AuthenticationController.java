package pl.pk.localannouncements.usermanagement;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import jakarta.servlet.http.HttpServletRequest;
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
import pl.pk.localannouncements.usermanagement.model.dto.AuthenticateUserDto;
import pl.pk.localannouncements.usermanagement.model.dto.AuthenticationResponse;
import pl.pk.localannouncements.usermanagement.model.dto.RegisterUserDto;

@Validated
@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
class AuthenticationController {

    private final AuthenticationService authenticationService;

    @Operation(operationId = "register", summary = "Register a User", tags = {"Auth"},
            description = "Service used to register a new user in the system.",
            responses = {
                    @ApiResponse(responseCode = "201", description = "Created", content = @Content(
                            mediaType = MediaType.APPLICATION_JSON_VALUE,
                            schema = @Schema(implementation = AuthenticationResponse.class)
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
    public ResponseEntity<AuthenticationResponse> register(@Valid @RequestBody RegisterUserDto registerUserDto) {
        AuthenticationResponse authenticationResponse = authenticationService.register(registerUserDto);
        return new ResponseEntity<>(authenticationResponse, HttpStatus.CREATED);
    }

    @Operation(operationId = "authenticate", summary = "Authenticate a User", tags = {"Auth"},
            description = "Service used to authenticate an existing user in the system.",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Created", content = @Content(
                            mediaType = MediaType.APPLICATION_JSON_VALUE,
                            schema = @Schema(implementation = AuthenticationResponse.class)
                    )),
                    @ApiResponse(responseCode = "400", description = "Bad Request", content = @Content(
                            mediaType = MediaType.APPLICATION_JSON_VALUE,
                            schema = @Schema(implementation = ErrorResponse.class)
                    )),
                    @ApiResponse(responseCode = "401", description = "Unauthorized", content = @Content(
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
    @PostMapping(value = "/authenticate", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<AuthenticationResponse> authenticate(@Valid @RequestBody AuthenticateUserDto authenticateUserDto) {
        AuthenticationResponse authenticationResponse = authenticationService.authenticate(authenticateUserDto);
        return new ResponseEntity<>(authenticationResponse, HttpStatus.OK);
    }

    @Operation(operationId = "refreshToken", summary = "Refresh token", tags = {"Auth"},
            description = "Generates a new access and refresh tokens using a valid refresh token. This allows users to stay authenticated without needing to re-login.",
            responses = {
                    @ApiResponse(responseCode = "200", description = "New access token generated successfully", content = @Content(
                            mediaType = MediaType.APPLICATION_JSON_VALUE,
                            schema = @Schema(implementation = AuthenticationResponse.class)
                    )),
                    @ApiResponse(responseCode = "400", description = "Bad Request", content = @Content(
                            mediaType = MediaType.APPLICATION_JSON_VALUE,
                            schema = @Schema(implementation = ErrorResponse.class)
                    )),
                    @ApiResponse(responseCode = "401", description = "Unauthorized", content = @Content(
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
    @PostMapping(value = "/refresh_token", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<AuthenticationResponse> refreshToken(HttpServletRequest request) {
        AuthenticationResponse authenticationResponse = authenticationService.refreshToken(request);
        return new ResponseEntity<>(authenticationResponse, HttpStatus.OK);
    }

    @Operation(operationId = "logout", summary = "Logout user", tags = {"Auth"},
            description = "Logs out the current user by invalidating their refresh token and clearing the security context.",
            responses = {
                    @ApiResponse(responseCode = "204", description = "User logout successfully"),
                    @ApiResponse(responseCode = "400", description = "Bad Request", content = @Content(
                            mediaType = MediaType.APPLICATION_JSON_VALUE,
                            schema = @Schema(implementation = ErrorResponse.class)
                    )),
                    @ApiResponse(responseCode = "401", description = "Unauthorized", content = @Content(
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
    @PostMapping("/logout")
    public ResponseEntity<Void> logout(HttpServletRequest request) {
        authenticationService.logout(request);
        return ResponseEntity.noContent().build();
    }

}
