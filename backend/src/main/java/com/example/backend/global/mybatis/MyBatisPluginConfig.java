package com.example.backend.global.mybatis;

import org.apache.ibatis.plugin.Interceptor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MyBatisPluginConfig {
    @Bean
    public Interceptor auditInterceptor() {
        return new AuditInterceptor();
    }
}