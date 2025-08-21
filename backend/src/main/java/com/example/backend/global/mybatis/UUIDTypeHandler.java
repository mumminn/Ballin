package com.example.backend.global.mybatis;

import org.apache.ibatis.type.*;
import java.nio.ByteBuffer;
import java.sql.*;
import java.util.UUID;

@MappedJdbcTypes(JdbcType.BINARY)
@MappedTypes(UUID.class)
public class UUIDTypeHandler extends BaseTypeHandler<UUID> {

    @Override
    public void setNonNullParameter(PreparedStatement ps, int i, UUID parameter, JdbcType jdbcType) throws SQLException {
        ByteBuffer bb = ByteBuffer.wrap(new byte[16]);
        bb.putLong(parameter.getMostSignificantBits());
        bb.putLong(parameter.getLeastSignificantBits());
        ps.setBytes(i, bb.array());
    }

    private UUID bytesToUuid(byte[] bytes) {
        if (bytes == null || bytes.length != 16) return null;
        ByteBuffer bb = ByteBuffer.wrap(bytes);
        long msb = bb.getLong();
        long lsb = bb.getLong();
        return new UUID(msb, lsb);
    }

    @Override public UUID getNullableResult(ResultSet rs, String columnName)  throws SQLException { return bytesToUuid(rs.getBytes(columnName)); }
    @Override public UUID getNullableResult(ResultSet rs, int columnIndex)   throws SQLException { return bytesToUuid(rs.getBytes(columnIndex)); }
    @Override public UUID getNullableResult(CallableStatement cs, int columnIndex) throws SQLException { return bytesToUuid(cs.getBytes(columnIndex)); }
}