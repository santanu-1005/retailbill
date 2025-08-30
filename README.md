# Billing Software

## Overview

This project is a full-stack Billing Software built using **React.js** on the front end and **Spring Boot** on the back end. The back-end service is contained within the `server` folder, while the front-end React application is located in the `client` folder.

The project enables users to handle billing processes such as generating invoices, tracking payments, managing customer data, and more.

### Project Structure

- **server** (Spring Boot Application)
  - Contains the back-end logic, REST APIs, business logic, and database interactions using Spring Boot and MongoDB.
  
- **client** (React Application)
  - Contains the front-end built with React, Redux for state management, and TailwindCSS for styling.

## Front-end: React.js

The front-end application is a React-based SPA (Single Page Application), providing an intuitive interface for users to interact with the billing system.

### Dependencies

- **@reduxjs/toolkit**: State management using Redux Toolkit.
- **axios**: For making HTTP requests to the back-end.
- **jspdf**: For generating PDF invoices.
- **react-toastify**: For displaying notifications.
- **tailwindcss**: For utility-first styling.
- **react-router-dom**: For routing between different pages.

### Set Up and Run

1. **Install Dependencies**

   Ensure you have Node.js and npm installed, then install the necessary dependencies:
   ```bash
   cd client
   npm install
   ```
2. **Start Developmet Server**
   You can start the React development server with the following command:
   ```bash
   npm run dev ```
  This will start the Vite development server. The app will be available at http://localhost:5173  

3. **Docker and Nginx Setup**
   The front-end is served using Nginx in a Docker container.

Dockerfile for Front-End

This Dockerfile consists of two stages:
- Build Stage: The React app is built using node:18-alpine.
- Nginx Stage: The built app is served using nginx:alpine along with a custom Nginx configuration.
```bash

# -------------------------------
# Stage 1: Build the Vite app
# -------------------------------
FROM node:18-alpine AS builder

WORKDIR /app

# Copy dependencies first for better caching
COPY package*.json ./
RUN npm install

# Copy project files
COPY . ./

# Build Vite app (output goes to /dist)
RUN npm run build

# -------------------------------
# Stage 2: Serve with Nginx
# -------------------------------
FROM nginx:alpine

# Copy build output to Nginx html folder
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```
To build and run the front-end Docker container, run the following:
1. ***Build the Docker Image***
   ```bash
   docker build -t billing-frontend .```
3. ***Run the Docker Container***
   ```bash
   docker run -p 80:80 billing-frontend ```

## Back-end: Spring Boot (server)
The back-end application is built using Spring Boot, providing a RESTful API to handle CRUD operations for billing, customer management, and other related services. It communicates with a MongoDB database.

### Dependencies
- spring-boot-starter-web: For building web applications and REST APIs.
- spring-boot-starter-data-mongodb: MongoDB integration.
- spring-boot-starter-security: For securing API endpoints.
- jjwt: JSON Web Token (JWT) for user authentication.

### Set Up and Run

Dockerfile for Back-End
The Dockerfile for the back-end Spring Boot application ensures that the app is containerized and can run inside a Docker container.
```bash
# ---------- Build Stage ----------
FROM maven:3.9.8-eclipse-temurin-21 AS builder

WORKDIR /app

# Copy pom.xml and download dependencies first (better caching)
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copy the rest of the project and build
COPY src ./src
RUN mvn clean package -DskipTests

# ---------- Runtime Stage ----------
FROM eclipse-temurin:21-jdk-jammy

WORKDIR /app

# Copy only the final JAR from builder stage
COPY --from=builder /app/target/*.jar app.jar

# Expose port (default for Spring Boot)
EXPOSE 8080

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
 ```

## API Endpoints
- POST /api/auth/login: User login endpoint, returns a JWT token.
- GET /api/invoices: Retrieve a list of all invoices.
- POST /api/invoices: Create a new invoice.
- GET /api/customers: Retrieve customer data.
- POST /api/customers: Add new customer data.

## Future Features
- Multi-language support.
- Payment gateway integration (e.g., Stripe).
- Real-time invoice tracking and notifications.
