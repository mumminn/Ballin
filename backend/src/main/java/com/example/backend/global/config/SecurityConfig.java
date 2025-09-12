package com.example.backend.global.config;

import com.example.backend.global.api.ApiCode;
import com.example.backend.global.api.ApiResponse;
import com.example.backend.global.security.JwtAuthFilter;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;

import java.io.IOException;


@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthFilter jwtAuthFilter;
    private final ObjectMapper objectMapper;


    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .cors(Customizer.withDefaults())
                .formLogin(form -> form.disable())
                .httpBasic(basic -> basic.disable())
                .logout(lo -> lo.disable())
                .sessionManagement(sm -> sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS))

                .exceptionHandling(ex -> ex
                        .authenticationEntryPoint((req, res, authEx) ->
                                writeJson(res, HttpStatus.UNAUTHORIZED,
                                        ApiResponse.error(ApiCode.COMMON401, "인증이 필요합니다."))
                        )
                        .accessDeniedHandler((req, res, denEx) ->
                                writeJson(res, HttpStatus.FORBIDDEN,
                                        ApiResponse.error(ApiCode.COMMON403, "권한이 없습니다."))
                        )
                )

                .authorizeHttpRequests(reg -> reg
                        // 카카오 시작/콜백/디버그 전부 허용
                        .requestMatchers("/api/kakao/**").permitAll()
                        .requestMatchers("/api/login/**").permitAll()
                        .requestMatchers("/api/users/**").permitAll()
                        .requestMatchers("/api/auth/refresh", "/api/auth/logout", "/api/auth/**").permitAll()
                        .requestMatchers("/", "/index.html", "/favicon.ico", "/health").permitAll()
                        .anyRequest().authenticated()
                )
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    private void writeJson(HttpServletResponse res, HttpStatus status, ApiResponse<?> body) throws IOException {
        res.setStatus(status.value());
        res.setContentType("application/json;charset=UTF-8");
        objectMapper.writeValue(res.getWriter(), body);
    }
}