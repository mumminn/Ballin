FROM gradle:8.5-jdk17 AS builder
WORKDIR /home/gradle/backend

COPY backend/gradlew .
COPY backend/gradle ./gradle
COPY backend/settings.gradle* backend/build.gradle* ./
RUN chmod +x gradlew

COPY backend/src ./src
RUN ./gradlew --no-daemon clean bootJar

## Run stage
FROM eclipse-temurin:17-jre-jammy
WORKDIR /app
COPY --from=builder /home/gradle/backend/build/libs/*.jar app.jar
EXPOSE 8080
ENV JAVA_OPTS=""
ENTRYPOINT ["sh","-c","java $JAVA_OPTS -jar app.jar"]