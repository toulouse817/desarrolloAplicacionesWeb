# ============================================================================
# Asignatura: Desarrollo de Aplicaciones Web (Código: 0423807T)
# Facilitador: M.Sc. Ing. Gabriel Alexis Ramírez Sánchez
# Período Académico: Septiembre, 2026
# San Cristóbal, Estado Táchira, Venezuela
# ============================================================================

# =========================================================
# ETAPA DE COMPILACIÓN (Node.js 20 LTS)
# =========================================================
FROM node:20-alpine AS build
WORKDIR /app

# Copiar archivos de paquetes e instalar dependencias
COPY src/frontend/package*.json ./
RUN npm install

# Copiar código fuente del frontend
COPY src/frontend/ ./

# Compilar para producción (genera la carpeta /dist)
RUN npm run build

# =========================================================
# ETAPA DE PRODUCCIÓN (Servidor Web Nginx)
# =========================================================
FROM nginx:alpine

# Copiar los archivos estáticos compilados desde la etapa anterior
COPY --from=build /app/dist /usr/share/nginx/html

# Copiar la configuración personalizada de Nginx
COPY src/frontend/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

# En entornos productivos, las aplicaciones de página única (SPA) en React se compilan en artefactos 
# estáticos (HTML, JS, CSS). El servidor Nginx actúa como un servidor web de alto rendimiento optimizado 
# para servir contenido estático con un consumo mínimo de memoria, mientras que la lógica de aplicación 
# dinámica se delega a la API del backend.
