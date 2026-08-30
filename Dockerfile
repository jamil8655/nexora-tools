FROM node:20-slim

# Install system dependencies required for video/audio processing
RUN apt-get update && apt-get install -y python3 ffmpeg curl ca-certificates \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY server ./server

EXPOSE 3001
ENV PORT=3001
ENV NODE_ENV=production

CMD ["node", "server/video-server.js"]
