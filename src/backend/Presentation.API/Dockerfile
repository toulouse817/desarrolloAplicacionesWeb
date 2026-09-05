# ============================================================================
# Asignatura: Desarrollo de Aplicaciones Web (Código: 0423807T)
# Facilitador: M.Sc. Ing. Gabriel Alexis Ramírez Sánchez
# Período Académico: Septiembre, 2026
# San Cristóbal, Estado Táchira, Venezuela
# ============================================================================

# =========================================================
# ETAPA DE COMPILACIÓN (SDK de .NET 10)
# =========================================================
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /app

# Copiar archivos csproj por capas para aprovechar la caché de Docker
COPY src/backend/Core.Domain/Core.Domain.csproj src/backend/Core.Domain/
COPY src/backend/Core.Application/Core.Application.csproj src/backend/Core.Application/
COPY src/backend/Infrastructure/Infrastructure.csproj src/backend/Infrastructure/
COPY src/backend/Presentation.API/Presentation.API.csproj src/backend/Presentation.API/

# Restaurar dependencias mediante NuGet
RUN dotnet restore src/backend/Presentation.API/Presentation.API.csproj

# Copiar el código fuente completo del backend
COPY src/backend/ src/backend/

# Compilar y publicar la API en modo Release
RUN dotnet publish src/backend/Presentation.API/Presentation.API.csproj -c Release -o out

# =========================================================
# ETAPA DE EJECUCIÓN (Runtime de ASP.NET 10)
# =========================================================
FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS runtime
WORKDIR /app
COPY --from=build /app/out .

EXPOSE 5000
ENV ASPNETCORE_URLS=http://+:5000
ENV ASPNETCORE_ENVIRONMENT=Development

ENTRYPOINT ["dotnet", "Presentation.API.dll"]

# El enfoque de compilación multi-etapa (multi-stage build) segrega el entorno de construcción 
# (SDK de desarrollo) del entorno productivo final. Al transferir únicamente los binarios compilados 
# a una imagen ligera basada en el runtime de ASP.NET Core, se reduce significativamente el tamaño 
# de la imagen, optimizando tiempos de descarga y disminuyendo la superficie de exposición a vulnerabilidades.
