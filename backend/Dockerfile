# Multi-stage production Dockerfile for Sunny Solar Express Backend
FROM node:22-alpine AS runner

WORKDIR /app

# Install production dependencies only
COPY package*.json ./
RUN npm ci --only=production

# Copy backend source code
COPY . .

# Set environment
ENV NODE_ENV=production
ENV PORT=5000

# Expose backend port
EXPOSE 5000

# Run as non-root node user for container security
USER node

# Start Express server
CMD ["node", "src/server.js"]
