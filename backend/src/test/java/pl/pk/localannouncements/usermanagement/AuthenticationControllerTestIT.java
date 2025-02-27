package pl.pk.localannouncements.usermanagement;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import pl.pk.localannouncements.usermanagement.model.dto.AuthenticateUserDto;
import pl.pk.localannouncements.usermanagement.model.dto.RegisterUserDto;
import pl.pk.localannouncements.usermanagement.model.dto.RefreshTokenOperationsDto;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
public class AuthenticationControllerTestIT {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    public void shouldRegisterUserSuccessfully() throws Exception {
        // Given
        RegisterUserDto registerUserDto = DtoTestHelper.createRegisterUserDto("test1@example.com", "password123", "Test", "User", "password123");

        // When & Then
        mockMvc.perform(post("/api/v1/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(registerUserDto)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.accessToken").exists())
                .andExpect(jsonPath("$.refreshToken").exists());
    }

    @Test
    public void shouldAuthenticateUserSuccessfully() throws Exception {
        // Given
        AuthenticateUserDto authenticateUserDto = DtoTestHelper.createAuthenticateUserDto("admin@example.com", "password");

        // When & Then
        mockMvc.perform(post("/api/v1/auth/authenticate")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(authenticateUserDto)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.accessToken").exists())
                .andExpect(jsonPath("$.refreshToken").exists());
    }

    @Test
    public void shouldRefreshTokenSuccessfully() throws Exception {
        // Given: Authenticate user and get refresh token
        AuthenticateUserDto authenticateUserDto = DtoTestHelper.createAuthenticateUserDto("admin@example.com", "password");

        String responseBody = mockMvc.perform(post("/api/v1/auth/authenticate")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(authenticateUserDto)))
                .andExpect(status().isOk())
                .andReturn()
                .getResponse()
                .getContentAsString();

        String refreshToken = objectMapper.readTree(responseBody).get("refreshToken").asText();

        // When: Refresh token
        RefreshTokenOperationsDto refreshTokenOperationsDto = createRefreshTokenOperationsDto(refreshToken);

        // Then
        mockMvc.perform(post("/api/v1/auth/refresh-token")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(refreshTokenOperationsDto)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.accessToken").exists())
                .andExpect(jsonPath("$.refreshToken").exists());
    }

    @Test
    public void shouldLogoutUserSuccessfully() throws Exception {
        // Given: Authenticate user and get refresh token
        AuthenticateUserDto authenticateUserDto = DtoTestHelper.createAuthenticateUserDto("admin@example.com", "password");

        String responseBody = mockMvc.perform(post("/api/v1/auth/authenticate")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(authenticateUserDto)))
                .andExpect(status().isOk())
                .andReturn()
                .getResponse()
                .getContentAsString();

        String refreshToken = objectMapper.readTree(responseBody).get("refreshToken").asText();

        // When: Logout using refresh token
        RefreshTokenOperationsDto refreshTokenOperationsDto = createRefreshTokenOperationsDto(refreshToken);

        // Then
        mockMvc.perform(post("/api/v1/auth/logout")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(refreshTokenOperationsDto)))
                .andExpect(status().isNoContent());
    }

    private RefreshTokenOperationsDto createRefreshTokenOperationsDto(String refreshToken) {
        RefreshTokenOperationsDto dto = new RefreshTokenOperationsDto();
        dto.setRefreshToken(refreshToken);
        return dto;
    }

}
