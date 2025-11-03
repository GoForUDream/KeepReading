# ============================================
# STAGE 1: Build Stage (Dependencies)
# ============================================
# This stage installs dependencies and builds the app
# We call it "builder" so we can reference it later
# USING: Debian-based image instead of Alpine for better Prisma compatibility
# WHY: Prisma needs OpenSSL 1.1 which is no longer available in newer Alpine versions

FROM node:18-slim AS builder

# WHAT: Set the working directory inside the container
# WHY: All subsequent commands run from this directory
# HOW: Creates /app folder and makes it the current directory
WORKDIR /app

# WHAT: Copy package files first (before other code)
# WHY: Docker caches layers - if package.json doesn't change,
#      it won't reinstall dependencies (saves time!)
# HOW: Copies package.json and package-lock.json to /app
COPY package*.json ./

# WHAT: Install ALL dependencies (including devDependencies)
# WHY: We need devDependencies for building (TypeScript, etc.)
# HOW: Runs npm install (workspace doesn't have package-lock.json)
# NOTE: In monorepo setups, each workspace uses npm install
RUN npm install

# WHAT: Copy Prisma schema
# WHY: Need it to generate Prisma Client
# HOW: Copies the prisma folder to /app/prisma
COPY prisma ./prisma

# WHAT: Generate Prisma Client
# WHY: Creates the database client code from schema
# HOW: Runs prisma generate command
RUN npx prisma generate

# WHAT: Copy all source code
# WHY: Now we need the actual application code
# HOW: Copies everything from backend/ to /app (except .dockerignore items)
COPY . .

# WHAT: Build TypeScript to JavaScript
# WHY: Node.js can't run TypeScript directly, needs compiled JS
# HOW: Runs the build script from package.json (tsc)
RUN npm run build

# ============================================
# STAGE 2: Production Stage (Runtime)
# ============================================
# This stage creates the final, lean container for running the app
# It only includes what's needed to RUN (not build)
# USING: Debian-based image for Prisma compatibility

FROM node:18-slim

# WHAT: Install production tools and OpenSSL
# WHY: We need these for running the app and debugging
#      Debian-slim includes OpenSSL 1.1 that Prisma needs
# HOW: Uses apt-get (Debian package manager)
RUN apt-get update && apt-get install -y \
    curl \
    openssl \
    ca-certificates \
    tini \
    && rm -rf /var/lib/apt/lists/*

# WHAT: Set working directory
# WHY: Same as builder stage, keeps things organized
# HOW: Creates /app and switches to it
WORKDIR /app

# WHAT: Copy package files
# WHY: Need them to install production dependencies
# HOW: Copies from current directory (your Mac) to container
COPY package*.json ./

# WHAT: Install ONLY production dependencies
# WHY: Don't need devDependencies (TypeScript, etc.) in production
#      Makes container smaller and more secure
# HOW: npm install --only=production skips devDependencies
RUN npm install --only=production

# WHAT: Copy Prisma files
# WHY: Need schema for migrations and Prisma Client
# HOW: Copies prisma folder
COPY prisma ./prisma

# WHAT: Copy built JavaScript from builder stage
# WHY: We already compiled TypeScript to JS in stage 1
#      No need to recompile, just copy the result
# HOW: Copies /app/dist from "builder" stage to current /app/dist
COPY --from=builder /app/dist ./dist

# WHAT: Copy generated Prisma Client from builder stage
# WHY: We already generated it in stage 1
# HOW: Copies node_modules/.prisma and @prisma/client
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma

# WHAT: Expose port 4000
# WHY: Documents that the backend runs on port 4000
#      Doesn't actually open the port (docker-compose does that)
# HOW: Metadata instruction
EXPOSE 4000

# WHAT: Set the entrypoint
# WHY: tini handles process signals properly (CTRL+C works correctly)
# HOW: Wraps our node process
#      On Debian, tini is at /usr/bin/tini (not /sbin/tini like Alpine)
ENTRYPOINT ["/usr/bin/tini", "--"]

# WHAT: Default command to run the app
# WHY: Starts the backend server
# HOW: Runs node dist/index.js (our compiled TypeScript)
CMD ["node", "dist/index.js"]
