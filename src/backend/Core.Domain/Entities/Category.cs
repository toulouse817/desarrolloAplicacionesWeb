// ============================================================================
// Asignatura: Desarrollo de Aplicaciones Web (Código: 0423807T)
// Facilitador: M.Sc. Ing. Gabriel Alexis Ramírez Sánchez
// Período Académico: Septiembre, 2026
// San Cristóbal, Estado Táchira, Venezuela
// ============================================================================

using System.Collections.Generic;

namespace Core.Domain.Entities;

/// <summary>
/// Representa una categoría que agrupa productos relacionados.
/// </summary>
public class Category : BaseEntity
{
    /// <summary>
    /// Nombre de la categoría (ej: Herramientas Eléctricas, Materiales de Construcción).
    /// </summary>
    public string Name { get; set; } = string.Empty;

    /// <summary>
    /// Breve descripción de los productos que componen esta categoría.
    /// </summary>
    public string Description { get; set; } = string.Empty;

    /// <summary>
    /// Relación de navegación: Productos pertenecientes a esta categoría.
    /// </summary>
    public virtual ICollection<Product> Products { get; set; } = new List<Product>();
}

/*
 * En el modelado del dominio dentro de arquitecturas relacionales, las entidades se vinculan mediante
 * propiedades de navegación. El modificador 'virtual' en la colección 'Products' habilita mecanismos 
 * de carga diferida (Lazy Loading) o explícita (Eager Loading) en el ORM. Esta relación uno a muchos (1:N) 
 * garantiza la integridad referencial y permite estructurar el catálogo de productos de forma normalizada.
 */
