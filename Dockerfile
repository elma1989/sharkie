# ===================================================================
# Documantation
# ===================================================================
FROM node:20-alpine AS doc-build

# Installation
WORKDIR /app
COPY package*.json .
RUN npm ci

# Build
COPY src src
COPY jsdoc.json .
RUN npm run docs

# ===================================================================
# nginx
# ===================================================================
FROM nginx:alpine
WORKDIR /usr/share/nginx/html
COPY --from=doc-build /app/docs/html docs
COPY index.html .
COPY src src
COPY assets assets
EXPOSE 80