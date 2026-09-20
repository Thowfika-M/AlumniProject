package com.alumniconnect;

import com.alumniconnect.dto.JwtAuthResponse;
import com.alumniconnect.dto.LoginRequest;
import com.alumniconnect.dto.RegisterRequest;
import com.alumniconnect.entity.Role;
import com.alumniconnect.entity.User;
import com.alumniconnect.repository.UserRepository;
import com.alumniconnect.service.AuthService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@ActiveProfiles("test")
@Transactional
public class AuthServiceTest {

    @Autowired
    private AuthService authService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Test
    public void testUserRegistrationAndPasswordHashing() {
        RegisterRequest registerRequest = new RegisterRequest(
                "Test Student",
                "student_test@example.com",
                "Password123!",
                Role.STUDENT,
                "1234567890"
        );

        JwtAuthResponse authResponse = authService.register(registerRequest);

        assertNotNull(authResponse);
        assertNotNull(authResponse.getAccessToken());
        assertNotNull(authResponse.getUser());
        assertEquals("student_test@example.com", authResponse.getUser().getEmail());
        assertEquals(Role.STUDENT, authResponse.getUser().getRole());

        // Verify BCrypt Hashing
        User dbUser = userRepository.findByEmail("student_test@example.com").orElse(null);
        assertNotNull(dbUser);
        assertNotEquals("Password123!", dbUser.getPasswordHash());
        assertTrue(passwordEncoder.matches("Password123!", dbUser.getPasswordHash()));
    }

    @Test
    public void testDuplicateEmailRegistrationThrowsException() {
        RegisterRequest registerRequest = new RegisterRequest(
                "First User",
                "duplicate@example.com",
                "Password123!",
                Role.ALUMNI,
                "1234567890"
        );

        authService.register(registerRequest);

        RegisterRequest duplicateRequest = new RegisterRequest(
                "Second User",
                "duplicate@example.com",
                "Password123!",
                Role.STUDENT,
                "0987654321"
        );

        assertThrows(IllegalArgumentException.class, () -> {
            authService.register(duplicateRequest);
        });
    }

    @Test
    public void testUserLoginSuccess() {
        RegisterRequest registerRequest = new RegisterRequest(
                "Login User",
                "login@example.com",
                "SecretPass123",
                Role.STUDENT,
                "5555555555"
        );

        authService.register(registerRequest);

        LoginRequest loginRequest = new LoginRequest("login@example.com", "SecretPass123");
        JwtAuthResponse loginResponse = authService.login(loginRequest);

        assertNotNull(loginResponse);
        assertNotNull(loginResponse.getAccessToken());
        assertEquals("login@example.com", loginResponse.getUser().getEmail());
    }
}
