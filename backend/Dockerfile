# Stage 1: Build
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npx prisma generate
RUN npm run build

# Stage 2: Production
FROM node:20-alpine AS production
WORKDIR /app
COPY package*.json ./
RUN npm install --omit=dev
COPY --from=build /app/dist ./dist
COPY --from=build /app/generated ./generated
COPY --from=build /app/prisma ./prisma
ENV NODE_ENV=production
EXPOSE 3000
CMD ["node", "dist/main"]
