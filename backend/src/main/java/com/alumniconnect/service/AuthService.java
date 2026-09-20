package com.alumniconnect.service;

import com.alumniconnect.dto.JwtAuthResponse;
import com.alumniconnect.dto.LoginRequest;
import com.alumniconnect.dto.RegisterRequest;
import com.alumniconnect.dto.UserResponse;
import com.alumniconnect.entity.User;
import com.alumniconnect.repository.UserRepository;
import com.alumniconnect.security.JwtTokenProvider;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider tokenProvider;

    public AuthService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder,
                       AuthenticationManager authenticationManager,
                       JwtTokenProvider tokenProvider) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.tokenProvider = tokenProvider;
    }

    public JwtAuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("Email address is already registered in AlumniConnect");
        }

        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail().toLowerCase().trim())
                .passwordHash(passwordEncoder.encode(request.getPassword()))
                .role(request.getRole())
                .phone(request.getPhone())
                .enabled(true)
                .build();

        User savedUser = userRepository.save(user);

        String token = tokenProvider.generateTokenForUser(savedUser.getEmail(), savedUser.getRole().name());

        return JwtAuthResponse.builder()
                .accessToken(token)
                .tokenType("Bearer")
                .user(UserResponse.fromEntity(savedUser))
                .build();
    }

    public JwtAuthResponse login(LoginRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail().toLowerCase().trim(),
                        request.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        User user = userRepository.findByEmail(request.getEmail().toLowerCase().trim())
                .orElseThrow(() -> new IllegalArgumentException("Invalid email or password"));

        String token = tokenProvider.generateToken(authentication);

        return JwtAuthResponse.builder()
                .accessToken(token)
                .tokenType("Bearer")
                .user(UserResponse.fromEntity(user))
                .build();
    }

    public UserResponse getCurrentUser(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        return UserResponse.fromEntity(user);
    }
}
