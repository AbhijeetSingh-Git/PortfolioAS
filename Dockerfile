FROM node:20-alpine

WORKDIR /app

# Install build deps
COPY package.json package-lock.json* ./
RUN npm ci --silent

# Copy source
COPY . .

# Build client and server
RUN npm run build

ENV NODE_ENV=production
ENV PORT=5000

EXPOSE 5000

CMD ["node", "dist/index.cjs"]
