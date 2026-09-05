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
using Microsoft.EntityFrameworkCore;
using Core.Application.Interfaces;
using Core.Domain.Entities;

namespace Infrastructure.Persistence.Repositories;

/// <summary>
/// Implementación genérica del patrón Repository utilizando Entity Framework Core.
/// </summary>
/// <typeparam name="T">Entidad que hereda de BaseEntity.</typeparam>
public class Repository<T> : IRepository<T> where T : BaseEntity
{
    protected readonly ApplicationDbContext _context;

    public Repository(ApplicationDbContext context)
    {
        _context = context;
    }

    public virtual async Task<T?> GetByIdAsync(Guid id)
    {
        return await _context.Set<T>().FindAsync(id);
    }

    public virtual async Task<IEnumerable<T>> GetAllAsync()
    {
        return await _context.Set<T>().ToListAsync();
    }

    public virtual async Task AddAsync(T entity)
    {
        await _context.Set<T>().AddAsync(entity);
    }

    public virtual void Update(T entity)
    {
        // En EF Core, si la entidad ya está rastreada, simplemente cambia su estado a Modified.
        _context.Set<T>().Update(entity);
    }

    public virtual void Delete(T entity)
    {
        _context.Set<T>().Remove(entity);
    }

    public async Task<bool> SaveChangesAsync()
    {
        // Guarda los cambios y retorna true si se modificó al menos una fila.
        return await _context.SaveChangesAsync() > 0;
    }
}

/*
 * La programación genérica ('Repository<T>') evita la duplicación de código de acceso a datos para operaciones CRUD 
 * estándar. Al centralizar las operaciones del DbContext en esta clase, se simplifica el mantenimiento y se 
 * garantiza que optimizaciones globales (como rastreo de cambios o manejo transaccional) se propaguen a todas 
 * las entidades del sistema.
 */
