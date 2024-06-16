# frontend/Dockerfile
# Build Angular
FROM node:20-alpine as builder
WORKDIR /app
COPY package.json ./
RUN npm install
RUN npm install -g @angular/cli@latest
COPY . .
CMD ["ng", "serve", "--host", "0.0.0.0"]