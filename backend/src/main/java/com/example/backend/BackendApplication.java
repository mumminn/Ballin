package com.example.backend;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BackendApplication {

	private static void setIfPresent(String k, String v) {
		if (v != null && !v.isBlank()) System.setProperty(k, v);
	}

	public static void main(String[] args) {

		Dotenv dotenv = Dotenv.configure().ignoreIfMissing().load();

		setIfPresent("DB_USERNAME", dotenv.get("DB_USERNAME"));
		setIfPresent("DB_PASSWORD", dotenv.get("DB_PASSWORD"));
		setIfPresent("DB_NAME", dotenv.get("DB_NAME"));
		setIfPresent("DB_HOST", dotenv.get("DB_HOST"));
		setIfPresent("DB_PORT", dotenv.get("DB_PORT"));
		setIfPresent("KAKAO_REST_API_KEY", dotenv.get("KAKAO_REST_API_KEY"));
		setIfPresent("KAKAO_REDIRECT_URL", dotenv.get("KAKAO_REDIRECT_URL"));
		setIfPresent("JWT_SECRET_KEY", dotenv.get("JWT_SECRET_KEY"));
		setIfPresent("REDIS_HOST", dotenv.get("REDIS_HOST"));
		setIfPresent("REDIS_PORT", dotenv.get("REDIS_PORT"));
		setIfPresent("EMAIL_ID", dotenv.get("EMAIL_ID"));
		setIfPresent("EMAIL_PASSWORD", dotenv.get("EMAIL_PASSWORD"));
		setIfPresent("YT_API_KEY", dotenv.get("YT_API_KEY"));
		setIfPresent("POSTGRESQL_USERNAME", dotenv.get("POSTGRESQL_USERNAME"));
		setIfPresent("POSTGRESQL_PASSWORD", dotenv.get("POSTGRESQL_PASSWORD"));
		setIfPresent("POSTGRESQL_HOST", dotenv.get("POSTGRESQL_HOST"));
		setIfPresent("POSTGRESQL_PORT", dotenv.get("POSTGRESQL_PORT"));
		setIfPresent("POSTGRESQL_DBNAME", dotenv.get("POSTGRESQL_DBNAME"));

		SpringApplication.run(BackendApplication.class, args);
	}

}
