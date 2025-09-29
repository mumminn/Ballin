package com.example.backend.global.mybatis;

import org.apache.ibatis.type.*;
import java.sql.*;
import java.util.UUID;

@MappedJdbcTypes(JdbcType.OTHER)
@MappedTypes(UUID.class)
public class PostgresUUIDTypeHandler extends BaseTypeHandler<UUID> {

    @Override
    public void setNonNullParameter(PreparedStatement ps, int i, UUID parameter, JdbcType jdbcType) throws SQLException {
        ps.setObject(i, parameter, Types.OTHER);
    }

    private UUID asUuid(Object o) {
        if (o == null) return null;
        if (o instanceof UUID u) return u;
        return UUID.fromString(o.toString());
    }

    @Override public UUID getNullableResult(ResultSet rs, String columnName)  throws SQLException { return asUuid(rs.getObject(columnName)); }
    @Override public UUID getNullableResult(ResultSet rs, int columnIndex)     throws SQLException { return asUuid(rs.getObject(columnIndex)); }
    @Override public UUID getNullableResult(CallableStatement cs, int index)   throws SQLException { return asUuid(cs.getObject(index)); }
}