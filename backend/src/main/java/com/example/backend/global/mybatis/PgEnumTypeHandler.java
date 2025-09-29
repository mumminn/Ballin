package com.example.backend.global.mybatis;

import org.apache.ibatis.type.*;
import org.postgresql.util.PGobject;

import java.sql.*;
import java.util.Map;

@MappedJdbcTypes(JdbcType.OTHER)
@MappedTypes({
        com.example.backend.domain.user.entity.SocialType.class,
        com.example.backend.domain.matchRecord.entity.TeamResult.class
})
public class PgEnumTypeHandler<E extends Enum<E>> extends BaseTypeHandler<E> {
    private final Class<E> type;
    private final String pgType;

    // MyBatis가 enum 타입을 넘겨주는 생성자
    public PgEnumTypeHandler(Class<E> type) {
        this.type = type;
        // 자바 enum -> PG enum 타입명 매핑
        Map<Class<?>, String> map = Map.of(
                com.example.backend.domain.user.entity.SocialType.class, "social_type",
                com.example.backend.domain.matchRecord.entity.TeamResult.class, "team_result"
        );
        this.pgType = map.get(type);
        if (this.pgType == null)
            throw new IllegalArgumentException("PG enum type name mapping missing for " + type);
    }

    @Override
    public void setNonNullParameter(PreparedStatement ps, int i, E param, JdbcType jdbcType) throws SQLException {
        PGobject pg = new PGobject();
        pg.setType(pgType);
        pg.setValue(param.name());
        ps.setObject(i, pg);
    }

    private E from(Object o) {
        if (o == null) return null;
        return Enum.valueOf(type, o.toString());
    }

    @Override public E getNullableResult(ResultSet rs, String col)  throws SQLException { return from(rs.getObject(col)); }
    @Override public E getNullableResult(ResultSet rs, int idx)     throws SQLException { return from(rs.getObject(idx)); }
    @Override public E getNullableResult(CallableStatement cs, int i)throws SQLException { return from(cs.getObject(i)); }
}