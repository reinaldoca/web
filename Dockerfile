# ---- Etapa 1: Builder ----
# En esta etapa, instalamos todas las dependencias (incluidas devDependencies)
# y construimos la aplicación de producción.
FROM node:18-alpine AS builder

WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar todas las dependencias
RUN npm install

# Copiar el resto del código fuente
COPY . .

# Construir la aplicación (esto crea la carpeta .next)
RUN npm run build

# ---- Etapa 2: Runner (Imagen final) ----
# Esta es la imagen final que se ejecutará en producción.
# Es mucho más pequeña porque solo contiene lo necesario.
FROM node:18-alpine

WORKDIR /app

# Instalar solo las dependencias de producción
COPY --from=builder /app/package*.json ./
RUN npm install --omit=dev

# Copiar los artefactos de compilación desde la etapa 'builder'
COPY --from=builder /app/.next ./.next
# Si tuvieras una carpeta public, también la copiarías
# COPY --from=builder /app/public ./public

# Exponer el puerto
EXPOSE 9002

# Comando para ejecutar la aplicación en producción
CMD ["npm", "start"]
