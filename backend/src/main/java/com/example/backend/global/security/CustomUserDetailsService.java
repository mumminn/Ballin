package com.example.backend.global.security;

import com.example.backend.domain.user.mapper.UserMapper;
import com.example.backend.domain.user.entity.UserEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.*;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final UserMapper userMapper;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UUID id = UUID.fromString(username);
        UserEntity u = userMapper.findById(id)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + username));

        List<GrantedAuthority> auth = List.of(new SimpleGrantedAuthority("ROLE_USER"));
        return new org.springframework.security.core.userdetails.User(
                id.toString(),
                "", // 소셜 로그인
                true, true, true, true,
                auth
        );
    }
}