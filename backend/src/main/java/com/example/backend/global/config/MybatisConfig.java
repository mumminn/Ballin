package com.example.backend.global.config;

import com.example.backend.global.mybatis.AuditFillInterceptor;
import org.mybatis.spring.boot.autoconfigure.ConfigurationCustomizer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MybatisConfig {
    @Bean
    public ConfigurationCustomizer mybatisCustomizer() {
        return configuration -> configuration.addInterceptor(new AuditFillInterceptor());
    }
}