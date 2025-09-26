FROM gradle:8.5-jdk17 AS builder
WORKDIR /home/gradle/backend

# 캐시 최적화: 먼저 래퍼/설정만 복사
COPY backend/gradlew .
COPY backend/gradle ./gradle
COPY backend/settings.gradle* backend/build.gradle* ./
RUN chmod +x gradlew

# 나머지 소스 복사 후 빌드
COPY backend/src ./src
RUN ./gradlew --no-daemon clean bootJar

### Run stage
FROM eclipse-temurin:17-jre-jammy
WORKDIR /app
COPY --from=builder /home/gradle/backend/build/libs/*.jar app.jar

EXPOSE 8080
ENV JAVA_OPTS=""
ENTRYPOINT ["sh","-c","java $JAVA_OPTS -jar app.jar"]