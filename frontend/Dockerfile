# ============================================
# Frontend Dockerfile (Development Mode)
# ============================================
# This Dockerfile runs Vite dev server for hot-reload development
# For production, we'd build static files and serve with Nginx
# USING: Debian-based image for consistency with backend

FROM node:18-slim

# WHAT: Install basic utilities
# WHY: Helpful for debugging and process management
# HOW: Debian's package manager (apt-get)
RUN apt-get update && apt-get install -y \
    curl \
    tini \
    && rm -rf /var/lib/apt/lists/*

# WHAT: Set working directory
# WHY: All commands run from /app
# HOW: Creates and switches to /app
WORKDIR /app

# WHAT: Copy package files first
# WHY: Docker layer caching - if package.json unchanged,
#      won't reinstall dependencies (saves time on rebuilds)
# HOW: Copies package.json and package-lock.json
COPY package*.json ./

# WHAT: Install all dependencies
# WHY: Need devDependencies for Vite dev server
#      In production, we'd use --only=production
# HOW: npm install (workspace doesn't have package-lock.json)
RUN npm install

# WHAT: Copy all source code
# WHY: Vite needs source files to serve and hot-reload
# HOW: Copies everything from frontend/ except .dockerignore items
COPY . .

# WHAT: Expose port 5173
# WHY: Vite dev server runs on port 5173 by default
#      This documents which port the container uses
# HOW: Metadata only (docker-compose actually maps the port)
EXPOSE 5173

# WHAT: Use tini as entrypoint
# WHY: Handles signals properly (CTRL+C to stop works correctly)
#      Without it, stopping containers can be messy
# HOW: Wraps the node process
#      On Debian, tini is at /usr/bin/tini
ENTRYPOINT ["/usr/bin/tini", "--"]

# WHAT: Start Vite dev server
# WHY: Runs the development server with hot module replacement
# HOW: Runs npm run dev from package.json
# NOTE: --host 0.0.0.0 makes Vite accessible from outside container
#       Without it, only localhost inside container could access it
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]

# ============================================
# EXPLANATION: Development vs Production
# ============================================
#
# DEVELOPMENT (what we're using):
# - Runs Vite dev server
# - Hot module replacement (changes update instantly)
# - Source maps for debugging
# - Larger image size (includes dev tools)
# - Perfect for local development
#
# PRODUCTION (for deployment later):
# - Would build static files (npm run build)
# - Serve with Nginx or serve package
# - Optimized, minified code
# - Much smaller image
# - No dev dependencies
#
# Example production Dockerfile (we'll use this later):
#
# FROM node:18-alpine AS builder
# WORKDIR /app
# COPY package*.json ./
# RUN npm ci
# COPY . .
# RUN npm run build
#
# FROM nginx:alpine
# COPY --from=builder /app/dist /usr/share/nginx/html
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]
