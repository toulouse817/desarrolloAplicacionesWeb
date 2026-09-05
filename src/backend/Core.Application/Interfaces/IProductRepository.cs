// ============================================================================
// Asignatura: Desarrollo de Aplicaciones Web (Código: 0423807T)
// Facilitador: M.Sc. Ing. Gabriel Alexis Ramírez Sánchez
// Período Académico: Septiembre, 2026
// San Cristóbal, Estado Táchira, Venezuela
// ============================================================================

using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Core.Domain.Entities;

namespace Core.Application.Interfaces;

/// <summary>
/// Interfaz específica de persistencia para la entidad Product.
/// Hereda las operaciones CRUD y expone consultas personalizadas del negocio.
/// </summary>
public interface IProductRepository : IRepository<Product>
{
    /// <summary>
    /// Obtiene todos los productos incluyendo la información completa de su categoría.
    /// </summary>
    Task<IEnumerable<Product>> GetProductsWithCategoryAsync();

    /// <summary>
    /// Obtiene un producto por su identificador incluyendo su categoría asociada.
    /// </summary>
    Task<Product?> GetProductWithCategoryByIdAsync(Guid id);

    /// <summary>
    /// Verifica si un SKU (código de barra) ya se encuentra registrado.
    /// Opcionalmente, permite excluir un producto específico (para validación en actualizaciones).
    /// </summary>
    Task<bool> ExistsSKUAsync(string sku, Guid? excludeProductId = null);
}

/*
 * En la aplicación del Principio de Segregación de Interfaces (ISP), aunque una interfaz genérica 
 * 'IRepository<T>' define contratos comunes de acceso a datos, ciertas entidades requieren consultas 
 * especializadas. La interfaz 'IProductRepository' extiende el repositorio base para incorporar métodos 
 * propios del inventario (como consultas con carga de categorías o comprobación de SKU), manteniendo la 
 * interfaz genérica concisa y libre de acoplamientos con casos específicos de una sola entidad.
 */
