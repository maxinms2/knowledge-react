# Imagen base optimizada para Java 21 y Maven
FROM eclipse-temurin:21-jdk-alpine AS build

WORKDIR /app
COPY . .

RUN ./mvnw clean package -DskipTests

# Segunda etapa: Ejecutar la app desde código fuente
FROM eclipse-temurin:21-jre-alpine

WORKDIR /app
COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080
CMD ["java", "-jar", "app.jar"]