# Usamos la imagen base de OpenJDK 21 con Slim
FROM openjdk:21-jdk-slim as build

# Establecemos el directorio de trabajo
WORKDIR /app

# Copiamos el código fuente al contenedor
COPY src /app/src
COPY pom.xml /app/pom.xml

# Instalamos Maven para compilar el código fuente
RUN apt-get update && apt-get install -y maven

# Compilamos el código fuente y generamos el JAR
RUN mvn clean package

# Segunda etapa: creamos la imagen final
FROM openjdk:21-jdk-slim

# Establecemos el directorio de trabajo
WORKDIR /app

# Copiamos el JAR generado en la etapa anterior
COPY --from=build /app/target/*.jar app.jar

# Definimos el comando para ejecutar la aplicación
ENTRYPOINT ["java", "-jar", "app.jar"]