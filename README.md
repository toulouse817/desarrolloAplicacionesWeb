# Sistema de Gestión de Inventario Empresarial (ERP)

### **Asignatura: Desarrollo de Aplicaciones Web (Código: 0423807T)**

**Facilitador:** M.Sc. Ing. Gabriel Alexis Ramírez Sánchez  
**Período Académico:** Septiembre, 2026  
**San Cristóbal, Estado Táchira, Venezuela**

---

## 📌 Descripción General

El presente proyecto constituye una solución integral de software empresarial orientada a la gestión de inventario, existencias, catalogación y control financiero para el sector comercial de ferretería, herramientas y materiales de construcción.

La arquitectura del sistema implementa estándares de desarrollo empresarial, aplicando **Onion Architecture** en el backend para lograr un desacoplamiento estricto entre el dominio del negocio y la infraestructura tecnológica, combinado con una aplicación de página única (**SPA**) reactiva construida en **React 18**, **Vite** y **Tailwind CSS**.

---

## 🏛️ Arquitectura del Sistema

El ecosistema se distribuye en una arquitectura por capas concéntricas (Onion Architecture) y un cliente desacoplado:

```
┌────────────────────────────────────────────────────────┐
│                   Frontend (SPA)                       │
│             React 18 + Vite + Tailwind CSS             │
└──────────────────────────┬─────────────────────────────┘
                           │ HTTP / JSON (REST API)
┌──────────────────────────▼─────────────────────────────┐
│                 Presentation.API                       │
│    Controladores REST, Middlewares RFC 7807, JWT Auth   │
├────────────────────────────────────────────────────────┤
│                 Core.Application                       │
│       Casos de Uso, DTOs, Validaciones (Fluent)        │
├────────────────────────────────────────────────────────┤
│                   Core.Domain                          │
│     Entidades del Dominio, Enums, Reglas de Negocio    │
├────────────────────────────────────────────────────────┤
│                 Infrastructure                         │
│       EF Core 10, Npgsql (PostgreSQL), Repositorios    │
└────────────────────────────────────────────────────────┘
```

### Componentes Clave:
1. **Core.Domain:** Contiene las entidades puras (`Product`, `Category`, `User`, `BaseEntity`) y enumeraciones (`UserRole`), sin dependencias de frameworks externos.
2. **Core.Application:** Implementa los contratos de servicios, DTOs de entrada/salida y validaciones declarativas con **FluentValidation**.
3. **Infrastructure:** Administra la persistencia con **Entity Framework Core 10**, configuración relacional vía **Fluent API**, siembra de datos (*data seeding*) y el patrón **Repository**.
4. **Presentation.API:** Expone los endpoints RESTful protegidos por **JWT Bearer**, autorización basada en roles (**RBAC**), política de **CORS** y captura global de excepciones estandarizada (**RFC 7807**).
5. **Frontend (SPA):** Interfaz moderna y responsiva con gestión de estado global (**Context API**), cliente HTTP centralizado, soporte para tema oscuro/institucional UNET y **Dashboard de Indicadores KPI** para analítica en tiempo real.

---

## 🚀 Tecnologías Empleadas

- **Backend:** .NET 10 (C# 14), ASP.NET Core Web API.
- **ORM & Base de Datos:** Entity Framework Core 10, Npgsql, PostgreSQL 15.
- **Seguridad:** JSON Web Tokens (JWT) con algoritmo HMAC-SHA256, Hashing SHA-256 de contraseñas.
- **Frontend:** React 18, Vite 5, Tailwind CSS 3, Lucide React Icons.
- **Contenerización & DevOps:** Docker, Docker Compose (Multi-stage builds), Nginx Alpine.

---

## 🛠️ Requisitos Previos

Para ejecutar la aplicación en un entorno de desarrollo local se requiere:

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (recomendado para despliegue unificado)
- [SDK de .NET 10](https://dotnet.microsoft.com/download) (para ejecución local del backend)
- [Node.js 20 LTS](https://nodejs.org/) (para ejecución local del frontend)
- [PostgreSQL 15+](https://www.postgresql.org/) (en caso de no utilizar Docker)

---

## 📦 Puesta en Marcha con Docker Compose

La forma más rápida de inicializar todo el stack (Base de Datos + API + Frontend) es mediante Docker Compose:

```bash
# 1. Clonar el repositorio
git clone <URL_DEL_REPOSITORIO>
cd desarrolloAplicacionesWeb

# 2. Compilar e inicializar los tres contenedores en segundo plano
docker compose up --build -d

# 3. Verificar el estado de los contenedores
docker compose ps
```

### Puntos de Acceso del Sistema:
- **Frontend SPA:** [http://localhost:8080](http://localhost:8080) (vía Nginx) o [http://localhost:5173](http://localhost:5173) (vía Vite Dev)
- **Backend API REST:** [http://localhost:5000/api](http://localhost:5000/api)
- **Base de Datos PostgreSQL:** `localhost:5432` (`inventory_db`)

---

## 👤 Credenciales Preconfiguradas (Datos de Siembra)

El sistema incluye una siembra inicial de usuarios para pruebas de autorización RBAC:

| Rol | Usuario | Contraseña | Permisos |
| :--- | :--- | :--- | :--- |
| **Administrador** | `admin` | `admin123` | Acceso total: CRUD productos, categorías, analítica KPI y control de catálogo. |
| **Empleado** | `empleado` | `empleado123` | Consulta y actualización de inventario, sin permisos de eliminación ni gestión de categorías. |

---

## 📂 Estructura del Repositorio

```
desarrolloAplicacionesWeb/
├── .github/
│   └── workflows/
│       └── ci-cd.yml          # Pipeline de Integración Continua (GitHub Actions)
├── clases/
│   ├── DAW-0423807T_...V3.md  # Hoja de ruta pedagógica y contenido analítico
│   └── diagramas mermaid/     # Diagramas de arquitectura y flujo en formato Mermaid
├── src/
│   ├── backend/
│   │   ├── Core.Domain/       # Entidades puras y enums del negocio
│   │   ├── Core.Application/  # DTOs, interfaces de servicio y validadores
│   │   ├── Infrastructure/    # DbContext, Fluent API y repositorios EF Core
│   │   └── Presentation.API/  # Controladores REST, Middlewares y Dockerfile
│   └── frontend/
│       ├── public/            # Recursos estáticos e isotipos institucionales
│       ├── src/               # Componentes React, contextos y cliente HTTP
│       ├── Dockerfile         # Construcción multi-stage con Nginx
│       └── nginx.conf         # Configuración del servidor web de producción
├── docker-compose.yml         # Orquestación multicontenedor local
├── DEPLOYMENT.md              # Guía de despliegue en la nube (Fly.io / Render)
├── .gitignore                 # Exclusiones de Git para .NET, Node y Docker
└── README.md                  # Documentación principal del proyecto
```

---

## ☁️ Despliegue en Producción

Para consultar los procedimientos de compilación de imágenes de contenedor, publicación en Docker Hub y despliegue en servicios en la nube (como Fly.io o Render), revise el documento [DEPLOYMENT.md](DEPLOYMENT.md).
