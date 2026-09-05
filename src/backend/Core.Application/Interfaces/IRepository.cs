// ============================================================================
// Asignatura: Desarrollo de Aplicaciones Web (Código: 0423807T)
// Facilitador: M.Sc. Ing. Gabriel Alexis Ramírez Sánchez
// email: gramirezs@unet.edu.ve
// Período Académico: Septiembre, 2026
// San Cristóbal, Estado Táchira, Venezuela
// ============================================================================

using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Core.Domain.Entities;

namespace Core.Application.Interfaces;

/// <summary>
/// Interfaz genérica para el patrón Repository.
/// Define las operaciones CRUD de persistencia básicas.
/// </summary>
/// <typeparam name="T">Una entidad del dominio que herede de BaseEntity.</typeparam>
public interface IRepository<T> where T : BaseEntity
{
    Task<T?> GetByIdAsync(Guid id);
    Task<IEnumerable<T>> GetAllAsync();
    Task AddAsync(T entity);
    void Update(T entity);
    void Delete(T entity);
    Task<bool> SaveChangesAsync();
}

/*
 * En la aplicación del Principio de Inversión de Dependencias (DIP) y la Arquitectura de Cebolla, 
 * las capas internas (Domain y Application) definen interfaces abstractas sin acoplarse a tecnologías 
 * de persistencia concretas. La interfaz 'IRepository<T>' establece las operaciones fundamentales de acceso a 
 * datos requeridas por los servicios, permitiendo que la implementación real (ej. Entity Framework Core sobre 
 * PostgreSQL) resida en la capa de Infraestructura y sea inyectada en tiempo de ejecución.
 */
