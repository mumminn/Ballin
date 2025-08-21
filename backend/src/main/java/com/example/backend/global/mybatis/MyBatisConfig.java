package com.example.backend.global.mybatis;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.context.annotation.Configuration;

@Configuration
@MapperScan(basePackages = "com.example.backend.domain.user.mapper")
public class MyBatisConfig {}