FROM gradle:7.6-jdk11 AS builder
WORKDIR /home/app
COPY . .

WORKDIR /app
COPY build/libs/gateway.jar .
COPY ../UI/dist /app/static
RUN gradle build --no-daemon

FROM openjdk:17-jdk-slim
ARG JAR_FILE=build/libs/*.jar
COPY ${JAR_FILE} app.jar
ENTRYPOINT ["java","-jar","/app.jar"]

