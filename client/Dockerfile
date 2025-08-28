# -------------------------------
# Stage 1: Build the Vite app
# -------------------------------
FROM node:18-alpine AS builder

WORKDIR /app

# Copy dependencies first for better caching
COPY package*.json ./
RUN npm install

# Copy project files
COPY . .

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
