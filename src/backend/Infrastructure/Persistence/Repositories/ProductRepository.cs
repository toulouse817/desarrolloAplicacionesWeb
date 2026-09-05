// ============================================================================
// Asignatura: Desarrollo de Aplicaciones Web (Código: 0423807T)
// Facilitador: M.Sc. Ing. Gabriel Alexis Ramírez Sánchez
// email: gramirezs@unet.edu.ve
// Período Académico: Septiembre, 2026
// San Cristóbal, Estado Táchira, Venezuela
// ============================================================================

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Core.Application.Interfaces;
using Core.Domain.Entities;

namespace Infrastructure.Persistence.Repositories;

/// <summary>
/// Implementación especializada de persistencia para Product.
/// Hereda el comportamiento de Repository y añade consultas optimizadas.
/// </summary>
public class ProductRepository : Repository<Product>, IProductRepository
{
    public ProductRepository(ApplicationDbContext context) : base(context)
    {
    }

    public async Task<IEnumerable<Product>> GetProductsWithCategoryAsync()
    {
        // Uso de Eager Loading (.Include) para traer la categoría asociada en la misma consulta SQL
        return await _context.Products
            .Include(p => p.Category)
            .OrderByDescending(p => p.CreatedAt)
            .ToListAsync();
    }

    public async Task<Product?> GetProductWithCategoryByIdAsync(Guid id)
    {
        return await _context.Products
            .Include(p => p.Category)
            .FirstOrDefaultAsync(p => p.Id == id);
    }

    public async Task<bool> ExistsSKUAsync(string sku, Guid? excludeProductId = null)
    {
        return await _context.Products
            .AnyAsync(p => p.SKU.ToLower() == sku.ToLower() && p.Id != excludeProductId);
    }
}

/*
 * Al consultar productos que poseen relaciones de clave foránea, omitir la inclusión explícita 
 * ('.Include(p => p.Category)') puede derivar en el problema de rendimiento N+1 consultas. 
 * La aplicación de Eager Loading mediante '.Include' instruye a EF Core a emitir una sola consulta SQL 
 * con unión relacional (LEFT JOIN), optimizando el rendimiento de la red y el tiempo de respuesta de la base de datos.
 */
