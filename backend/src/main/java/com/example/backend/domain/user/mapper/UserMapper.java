package com.example.backend.domain.user.mapper;

import com.example.backend.domain.user.entity.UserEntity;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.Optional;
import java.util.UUID;

@Mapper
public interface UserMapper {
    Optional<UserEntity> findById(@Param("id") UUID id);
    Optional<UserEntity> findByEmail(@Param("email") String email);

    int updateUser(UserEntity userEntity);

    int insertUser(UserEntity user);
    int updateUserBasic(UserEntity user);
    boolean existsByEmailExcludingId(@Param("email") String email, @Param("id") UUID id);
    int updatePassword(@Param("id") UUID id, @Param("password") String password);
}