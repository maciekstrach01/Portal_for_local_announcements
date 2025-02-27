# Spring Boot Application Setup

This guide walks you through setting up and running a Spring Boot application locally using Maven.

## Prerequisites

Before you begin, ensure you have the following requirements met:

- **JDK 21:** Make sure Java Development Kit (JDK) version 21 is installed. You can verify by running the following command:
```
java -version
```
If not installed, download and install it from [Oracle JDK 21](https://www.oracle.com/pl/java/technologies/downloads/#java21).

- **Apache Maven 3+:** Maven is required to manage project dependencies and build the application. Verify Maven installation by running:
```
mvn -v
```
If Maven is not installed, refer to [Maven Installation Guide](https://maven.apache.org/install.html).

## Getting Started

### 1. Configure Application Properties

In the backend/src/main/resources directory, you'll need to create `application-local.properties` file for the application configuration.

You can start by copying the provided `application-example.properties` file:
```
cp application-example.properties application-local.properties
```

- Make sure to customize values in the `application-local.properties` file to suit your local setup.
- For the secret key, you should use a strong, randomly generated string. This secret key is critical for JWT (JSON Web Token) signing and verification. To generate a secure key, you can use an online key generator, a terminal command, or a password manager that supports secure key generation. Here are a few options:
  - Using OpenSSL in your terminal:
```
openssl rand -base64 32
```
This command generates a 256-bit key in base64 encoding.
- Alternatively, you can generate a key through websites like [RandomKeygen](https://randomkeygen.com).
- You can also change the port of the application depending on your needs it is specified in `application.properties` file. The default port is set to 8080.
- Some values in `application-example.properties` are provided by default, but depending on your needs, you can modify them. 

Note: The `application-local.properties` file is listed in `.gitignore`, so it won’t be committed to version control. Keep this file secure.

### 2. Configure Database Init

In the backend/src/main/resources directory, you'll need to create `data.sql` file for the database initialization.

You can start by copying the provided `data-example` file:
```
cp data-example data.sql
```

- Make sure to customize values in the `data.sql` file to suit your local setup.

### 3. Install dependencies
Once inside the project's `backend` directory, install the required dependencies by running:
```
mvn clean install
```
This command will clean up any previous builds, resolve all necessary dependencies, and prepare the application for running.

### 4. Running the Application
To run the Spring Boot application, use the following Maven command:
```
mvn spring-boot:run -D spring.profiles.active=local
```

## Setting Up Your Project in IntelliJ IDEA

If you’re using IntelliJ IDEA, follow these steps to properly set up your Spring Boot project:

### 1. Open IntelliJ IDEA:
If you haven’t already installed IntelliJ, you can download it from [here](https://www.jetbrains.com/idea/download/?section=mac). You can use community or enterprise version.

### 2. Import the Project:

- Go to **File > Open.**
- Navigate to your project directory and select it.
- IntelliJ will detect the Maven build files (pom.xml) and prompt you to import the Maven project. Select **Yes.**
- If you were not prompted and your maven project isn't imported, then right-click on the pom.xml file and select **Add as Maven Project**

### 3. Set the Project JDK:
- Navigate to **File > Project Structure > Project.**
- In the SDK section, select **JDK 21** and select **Language level** to **21**. If **JDK 21** is not listed, click **Download JDK**, then select the version to 21 and choose vendor e.g. **Amazon Corretto**.

### 4. Run/Debug Configurations:
To run your Spring Boot application directly from IntelliJ:
- Go to **Run > Edit Configurations**.
- Click the **+** button and select **Maven**.
- Provide desired name e.g. **backend**.
- In the run field add the following command:
```
clean compile spring-boot:run --activate-profiles local
```
- Leave the rest options in default.
- Click Apply and then OK.
- You can now **run or debug** the application directly by clicking the Run or Debug icons in the toolbar.

## Accessing Swagger UI

Once the application is running, you can access the Swagger UI to explore the API documentation and test the available endpoints.

- Swagger UI should be available under http://localhost:8080/swagger-ui/index.html#/.
- If you changed port of your application, you'll need to adjust the link.

## Additional Notes

### Features
- User registration and login with JWT authentication
- Password encryption using BCrypt
- Role-based authorization with Spring Security
- Customized access denied handling
- Logout mechanism
- Refresh token 

### Used Technologies
- Java 21
- Maven 3.9.9
- Spring Boot 3.3.4
- Spring Security
- JSON Web Tokens (JWT)
- BCrypt
