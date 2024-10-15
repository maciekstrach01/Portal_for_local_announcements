# Spring Boot Application Setup

This guide walks you through setting up and running a Spring Boot application locally using Maven.

## Prerequisites

Before you begin, ensure you have the following requirements met:

- **Java 23:** Confirm that you have Java 23 installed. You can verify this by running the following command:
```
java -version
```
- **Apache Maven:** Ensure Apache Maven is installed to manage dependencies and build the application. You can check by running:
```
mvn -v
```

## Getting Started

### 1. Install dependencies
Once inside the project's `backend` directory, install the required dependencies by running:
```
mvn clean install
```
This command will clean up any previous builds, resolve all necessary dependencies, and prepare the application for running.

### 2. Running the Application
To run the Spring Boot application, use the following Maven command:
```
mvn spring-boot:run
```

### 3. Building the Project
If you want to generate a standalone JAR file to deploy elsewhere, you can run:
```
mvn clean package
```
The generated JAR will be located in the target directory.

### Additional Notes
* Project is using Java in version 23 and SpringBoot in version 3.3.4
* For the development, you can use tools like [IntelliJ](https://www.jetbrains.com/idea/).
