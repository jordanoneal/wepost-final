# Stage 1: Build the application
FROM node:18-alpine AS build

# Create the app directory and set permissions
RUN mkdir -p /app && chown -R node:node /app
WORKDIR /app
USER node

# Copy the common and backend code
COPY --chown=node common/ ./common/
COPY --chown=node backend/ ./backend/

# Install and build dependencies for common and backend
RUN cd common && \
    npm install && \
    npm run build && \
    cd ../backend && \
    npm install && \
    npm run build

# Generate Prisma Client
RUN cd backend && npx prisma generate --schema=./src/prisma/schema.prisma

# Change ownership back to root for specific directories
USER root
RUN chown -R root:root /app/common/lib /app/backend/dist

# Stage 2: Create the final image
FROM node:18-alpine

WORKDIR /app

# Copy built common and backend artifacts from the build stage
COPY --from=build /app/common/lib ./common/lib
COPY --from=build /app/backend/dist ./dist

COPY --from=build /app/backend/node_modules/.prisma ./node_modules/.prisma
COPY --from=build /app/backend/node_modules/@prisma ./node_modules/@prisma


# Expose the port on which the app will run
EXPOSE 4000

# Start the app using the built server.js file
CMD ["node", "./dist/bundle.js"]
