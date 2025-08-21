package com.example.backend.global.mybatis;

import com.example.backend.global.entity.BaseEntity;
import org.apache.ibatis.executor.Executor;
import org.apache.ibatis.mapping.MappedStatement;
import org.apache.ibatis.mapping.SqlCommandType;
import org.apache.ibatis.plugin.*;
import org.springframework.security.core.context.SecurityContextHolder;

import java.time.Instant;
import java.util.Properties;
import java.util.UUID;

@Intercepts(@Signature(type = Executor.class, method = "update", args = {MappedStatement.class, Object.class}))
public class AuditInterceptor implements Interceptor {

    @Override
    public Object intercept(Invocation invocation) throws Throwable {
        Object[] args = invocation.getArgs();
        MappedStatement ms = (MappedStatement) args[0];
        Object param = args[1];

        if (param instanceof BaseEntity base) {
            var now = Instant.now();
            UUID currentUserId = resolveCurrentUserId();

            if (ms.getSqlCommandType() == SqlCommandType.INSERT) {
                if (base.getCreatedDt() == null) base.setCreatedDt(now);
                if (base.getUpdatedDt() == null) base.setUpdatedDt(now);
                if (base.getCreatedId() == null) base.setCreatedId(currentUserId);
                if (base.getUpdatedId() == null) base.setUpdatedId(currentUserId);
            } else if (ms.getSqlCommandType() == SqlCommandType.UPDATE) {
                base.setUpdatedDt(now);
                base.setUpdatedId(currentUserId);
            }
        }
        return invocation.proceed();
    }

    private UUID resolveCurrentUserId() {
        try {
            var auth = SecurityContextHolder.getContext().getAuthentication();
            if (auth == null || !auth.isAuthenticated()) return null;
            return UUID.fromString(auth.getName());
        } catch (Exception e) {
            return null;
        }
    }

    @Override public Object plugin(Object target) { return Plugin.wrap(target, this); }
    @Override public void setProperties(Properties properties) { }
}