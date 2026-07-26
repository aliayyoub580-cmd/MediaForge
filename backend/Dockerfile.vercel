FROM node:22-alpine AS builder
WORKDIR /app
RUN apk add --no-cache ffmpeg python3 py3-pip && pip3 install --no-cache-dir --break-system-packages yt-dlp
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:22-alpine AS production
WORKDIR /app
ENV NODE_ENV=production
RUN apk add --no-cache ffmpeg python3 py3-pip && pip3 install --no-cache-dir --break-system-packages yt-dlp
COPY package*.json ./
RUN npm ci --omit=dev
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
RUN mkdir -p logs
EXPOSE 5000
CMD ["node", "dist/index.js"]
