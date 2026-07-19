# Stage 1: Build
FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
# Usar 'ci' es más rápido y asegura instalaciones consistentes usando el package-lock.json
RUN npm ci
COPY . .
ARG DATABASE_URL
ENV DATABASE_URL=$DATABASE_URL
RUN npx prisma generate
RUN npm run build

# Stage 2: Production
FROM node:22-alpine AS production
WORKDIR /app
COPY package*.json ./
# Evitamos que Prisma regenere el cliente por defecto (y descargue los engines extras) en prod
ENV PRISMA_SKIP_POSTINSTALL_GENERATE=true
RUN npm ci --omit=dev && npm install -g prisma
# Copiamos asigando los permisos al usuario 'node' (buenas prácticas de seguridad)
COPY --from=build --chown=node:node /app/dist ./dist
COPY --from=build --chown=node:node /app/generated ./generated
COPY --from=build --chown=node:node /app/prisma ./prisma
COPY --from=build --chown=node:node /app/prisma.config.ts ./prisma.config.ts
ENV NODE_ENV=production
# Cambiamos al usuario sin privilegios 'node' por seguridad
USER node
EXPOSE 3000
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/src/main.js"]
