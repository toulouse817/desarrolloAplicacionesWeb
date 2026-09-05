# Guía de Despliegue en la Nube y CI/CD

### **Asignatura: Desarrollo de Aplicaciones Web (Código: 0423807T)**

**Facilitador:** M.Sc. Ing. Gabriel Alexis Ramírez Sánchez  
**Período Académico:** Septiembre, 2026  
**San Cristóbal, Estado Táchira, Venezuela**

---

Esta guía detalla los pasos necesarios para desplegar la aplicación full-stack (Backend .NET 10, Frontend React y Base de Datos PostgreSQL) en la nube, utilizando contenedores Docker. 

Para fines del proyecto integrador, se utiliza **Fly.io** o **Render** como proveedores de nube debido a su soporte nativo para Dockerfile y bases de datos relacionales integradas.

---

## 1. Preparación de Docker Registry (Docker Hub)

Antes de desplegar en ciertos proveedores de nube, es necesario almacenar nuestras imágenes compiladas en un **Docker Registry** público o privado (ej. Docker Hub o GitHub Container Registry).

### Paso 1: Crear una cuenta e iniciar sesión
Si no tienes cuenta, regístrate en [Docker Hub](https://hub.docker.com/). Luego, inicia sesión desde tu terminal de desarrollo:

```bash
docker login
```

### Paso 2: Compilar y Etiquetar (Tag) las imágenes locales
Desde la raíz del proyecto (`desarrolloAplicacionesWeb`), compila las imágenes locales asignándoles tu usuario de Docker Hub:

```bash
# Compilar y etiquetar la API de .NET
docker build -t tu_usuario_dockerhub/inventario-api:latest -f src/backend/Presentation.API/Dockerfile .

# Compilar y etiquetar la SPA de React + Nginx
docker build -t tu_usuario_dockerhub/inventario-spa:latest -f src/frontend/Dockerfile .
```

### Paso 3: Subir (Push) las imágenes al Registry
Sube las imágenes a la nube de Docker:

```bash
docker push tu_usuario_dockerhub/inventario-api:latest
docker push tu_usuario_dockerhub/inventario-spa:latest
```

---

## 2. Despliegue en la Nube (Fly.io)

**Fly.io** permite desplegar servidores Docker directamente mediante comandos CLI simples.

### Paso 1: Instalar el Fly CLI y Registrarse
Instala el CLI de Fly según tu sistema operativo y corre:
```bash
fly auth signup   # Si eres nuevo
# o
fly auth login    # Si ya tienes cuenta
```

### Paso 2: Crear y Desplegar la Base de Datos PostgreSQL
Fly.io ofrece clusters PostgreSQL preconfigurados:
```bash
fly postgres create --name unet-inventario-db
```
*Guarda la URI de conexión que te provee el comando al finalizar (ej. `postgres://postgres:clave@host:5432/db`).*

### Paso 3: Configurar y Desplegar el Backend (.NET API)
1. En la raíz de tu proyecto, inicializa la app de Fly para la API:
   ```bash
   fly launch --name unet-inventario-api --path "./src/backend/Presentation.API" --no-deploy
   ```
2. Esto creará un archivo `fly.toml` dentro de la carpeta. Modifica la sección de puertos para exponer el puerto interno `5000`:
   ```toml
   [[services]]
     internal_port = 5000
     protocol = "tcp"
     # ...
   ```
3. **Configurar Variables de Entorno Seguras (Secrets)**:
   Inyecta la cadena de conexión de Postgres y la clave de firma JWT de manera segura para que no se expongan en el código:
   ```bash
   fly secrets set ConnectionStrings__DefaultConnection="Host=tu-db-host.flycast;Database=unet_inventario_db;Username=postgres;Password=tu_password"
   fly secrets set JwtSettings__Key="ClaveAltamenteSecretaYPersonalizadaParaLaAsignaturaDAW2026!"
   ```
4. Desplegar la API:
   ```bash
   fly deploy --path "./src/backend/Presentation.API"
   ```

### Paso 4: Configurar y Desplegar el Frontend (React SPA)
1. Inicializa la app de Fly para el frontend (Nginx):
   ```bash
   fly launch --name unet-inventario-spa --path "./src/frontend" --no-deploy
   ```
2. Modifica el puerto en el `fly.toml` recién creado para exponer el puerto interno `80` (donde escucha Nginx):
   ```toml
   [[services]]
     internal_port = 80
     protocol = "tcp"
   ```
3. **Establecer la variable de compilación**:
   Debido a que el frontend React necesita saber dónde está la API al momento de compilar la imagen:
   ```bash
   # Desplegar enviando la URL de la API desplegada en el paso anterior
   fly deploy --build-arg VITE_API_URL="https://unet-inventario-api.fly.dev/api" --path "./src/frontend"
   ```

---

## 3. Pipeline CI/CD Básico con GitHub Actions

Para automatizar la compilación y subida de imágenes a Docker Hub cada vez que subimos código a GitHub, configuraremos un flujo de Integración y Despliegue Continuo (CI/CD).

Crea el archivo `.github/workflows/deploy.yml` con el siguiente contenido:

```yaml
name: CI/CD Pipeline - UNET Inventario

on:
  push:
    branches:
      - main # Se ejecuta automáticamente al hacer push a la rama principal

jobs:
  build-and-push:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout del Código
        uses: actions/checkout@v4

      - name: Iniciar sesión en Docker Hub
        uses: docker/login-action@v3
        with:
          username: ${{ secrets.DOCKER_USERNAME }}
          password: ${{ secrets.DOCKER_PASSWORD }}

      - name: Compilar y Subir API a Docker Hub
        uses: docker/build-push-action@v5
        with:
          context: .
          file: src/backend/Presentation.API/Dockerfile
          push: true
          tags: ${{ secrets.DOCKER_USERNAME }}/inventario-api:latest

      - name: Compilar y Subir SPA a Docker Hub
        uses: docker/build-push-action@v5
        with:
          context: .
          file: src/frontend/Dockerfile
          push: true
          tags: ${{ secrets.DOCKER_USERNAME }}/inventario-spa:latest
          build-args: |
            VITE_API_URL=https://unet-inventario-api.fly.dev/api
```

### Configuración de Secretos en GitHub
Para que el pipeline funcione, ve a tu repositorio de GitHub: **Settings > Secrets and variables > Actions > New repository secret** e ingresa:
- `DOCKER_USERNAME`: Tu usuario de Docker Hub.
- `DOCKER_PASSWORD`: Tu clave o token personal de acceso de Docker Hub.

---

## 4. Fundamentos y Consideraciones de Despliegue en la Nube y CI/CD

### Principios y Criterios Técnicos:
1. **Contenedores de Aplicación**: Docker permite empaquetar el código, las dependencias del runtime y la configuración de red en un artefacto ejecutable inmutable (la imagen). Esto garantiza paridad estricta entre los entornos de desarrollo local, pruebas y servidores de producción en la nube, eliminando inconsistencias derivadas de diferencias en el sistema anfitrión.
2. **Seguridad en Entornos de Despliegue (Twelve-Factor App)**: En la arquitectura moderna, las cadenas de conexión a bases de datos y las claves de firma criptográfica nunca deben persistirse en el código fuente ni en archivos de configuración versionados. En su lugar, se inyectan en tiempo de ejecución mediante variables de entorno del sistema operativo o almacenes seguros de secretos (como `fly secrets` o GitHub Actions Secrets).
3. **Automatización CI/CD**: La Integración Continua (CI) y Entrega Continua (CD) permiten automatizar la compilación, validación y distribución del software. Al delegar estos flujos a GitHub Actions, se minimiza la intervención manual, reduciendo errores operativos y garantizando un proceso de despliegue confiable y reproducible.
