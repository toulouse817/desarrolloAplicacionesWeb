// ============================================================================
// Asignatura: Desarrollo de Aplicaciones Web (Código: 0423807T)
// Facilitador: M.Sc. Ing. Gabriel Alexis Ramírez Sánchez
// Período Académico: Septiembre, 2026
// San Cristóbal, Estado Táchira, Venezuela
// ============================================================================

using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Core.Application.Interfaces;
using Infrastructure.Persistence;
using Infrastructure.Persistence.Repositories;

namespace Infrastructure;

/// <summary>
/// Contiene métodos de extensión para registrar los servicios de infraestructura en el contenedor IoC.
/// </summary>
public static class DependencyInjection
{
    /// <summary>
    /// Agrega los servicios de persistencia, DbContext y repositorios al contenedor de dependencias.
    /// </summary>
    public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
    {
        // 1. Obtener la cadena de conexión de appsettings.json o variables de entorno
        var connectionString = configuration.GetConnectionString("DefaultConnection");

        // 2. Configurar el contexto de base de datos con Npgsql (PostgreSQL)
        services.AddDbContext<ApplicationDbContext>(options =>
            options.UseNpgsql(connectionString));

        // 3. Registrar el Repositorio Genérico
        // Se registra como Scoped (una instancia por petición HTTP)
        services.AddScoped(typeof(IRepository<>), typeof(Repository<>));

        // 4. Registrar el Repositorio de Productos
        services.AddScoped<IProductRepository, ProductRepository>();

        return services;
    }
}

/*
 * En ASP.NET Core, el registro de dependencias en el contenedor de inversión de control (IoC) define su tiempo 
 * de vida en memoria. 'ApplicationDbContext' y las clases de repositorio se configuran con ciclo de vida 'Scoped', 
 * lo que significa que se instancia una única conexión por cada petición HTTP entrante y se libera al concluir 
 * la respuesta. Esta estrategia mitiga fugas de memoria y previene conflictos de concurrencia en subprocesos múltiples.
 */
