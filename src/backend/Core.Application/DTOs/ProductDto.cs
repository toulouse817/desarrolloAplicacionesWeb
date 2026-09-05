// ============================================================================
// Asignatura: Desarrollo de Aplicaciones Web (Código: 0423807T)
// Facilitador: M.Sc. Ing. Gabriel Alexis Ramírez Sánchez
// Período Académico: Septiembre, 2026
// San Cristóbal, Estado Táchira, Venezuela
// ============================================================================

using System;

namespace Core.Application.DTOs;

/// <summary>
/// DTO de Salida para transportar datos enriquecidos de productos hacia el frontend.
/// </summary>
public class ProductDto
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string SKU { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public decimal CostPrice { get; set; }
    public int Stock { get; set; }
    public int MinStock { get; set; }
    public int MaxStock { get; set; }
    public string Location { get; set; } = string.Empty;
    public string UnitOfMeasure { get; set; } = string.Empty;
    public string Brand { get; set; } = string.Empty;
    public bool IsActive { get; set; }
    public Guid CategoryId { get; set; }
    public string CategoryName { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; }
}
