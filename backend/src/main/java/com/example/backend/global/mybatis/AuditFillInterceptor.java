package com.example.backend.global.mybatis;

import org.apache.ibatis.executor.Executor;
import org.apache.ibatis.mapping.MappedStatement;
import org.apache.ibatis.mapping.SqlCommandType;
import org.apache.ibatis.plugin.*;
import org.apache.ibatis.reflection.MetaObject;
import org.apache.ibatis.reflection.SystemMetaObject;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.Properties;
import java.util.UUID;

@Intercepts({
        @Signature(type = Executor.class, method = "update",
                args = {MappedStatement.class, Object.class})
})
public class AuditFillInterceptor implements Interceptor {

    @Override
    public Object intercept(Invocation inv) throws Throwable {
        Object[] args = inv.getArgs();
        MappedStatement ms = (MappedStatement) args[0];
        Object param = args[1];

        if (param != null) {
            SqlCommandType type = ms.getSqlCommandType();
            MetaObject meta = SystemMetaObject.forObject(param);

            // BaseEntity 필드가 있을 때만 처리
            boolean hasCreatedId = meta.hasGetter("createdId") && meta.hasSetter("createdId");
            boolean hasUpdatedId = meta.hasGetter("updatedId") && meta.hasSetter("updatedId");

            if (hasCreatedId || hasUpdatedId) {
                UUID actor = currentUserId(); // 로그인 사용자 ID (없으면 null)
                if (type == SqlCommandType.INSERT) {
                    if (hasCreatedId && meta.getValue("createdId") == null) {
                        UUID selfId = meta.hasGetter("id") ? (UUID) meta.getValue("id") : null;
                        meta.setValue("createdId", actor != null ? actor : selfId);
                    }
                    if (hasUpdatedId && meta.getValue("updatedId") == null) {
                        meta.setValue("updatedId", meta.getValue("createdId"));
                    }
                } else if (type == SqlCommandType.UPDATE) {
                    if (hasUpdatedId) {
                        if (actor != null) meta.setValue("updatedId", actor);
                    }
                }
            }
        }
        return inv.proceed();
    }

    private UUID currentUserId() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.getPrincipal() != null) {

            try { return UUID.fromString(auth.getName()); } catch (Exception ignored) {}

            Object principal = auth.getPrincipal();
            if ( principal instanceof String s) {
                try{ return UUID.fromString(s); } catch (Exception ignored) {}

            }
        }
        return null;
    }

    @Override public Object plugin(Object target) { return Plugin.wrap(target, this); }
    @Override public void setProperties(Properties properties) {}
}