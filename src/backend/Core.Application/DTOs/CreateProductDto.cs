// ============================================================================
// Asignatura: Desarrollo de Aplicaciones Web (Código: 0423807T)
// Facilitador: M.Sc. Ing. Gabriel Alexis Ramírez Sánchez
// Período Académico: Septiembre, 2026
// San Cristóbal, Estado Táchira, Venezuela
// ============================================================================

using System;

namespace Core.Application.DTOs;

/// <summary>
/// DTO de Entrada para la creación y edición de productos en el catálogo.
/// </summary>
public class CreateProductDto
{
    public string Name { get; set; } = string.Empty;
    public string SKU { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public decimal CostPrice { get; set; }
    public int Stock { get; set; }
    public int MinStock { get; set; } = 5;
    public int MaxStock { get; set; } = 100;
    public string Location { get; set; } = "Almacén Principal";
    public string UnitOfMeasure { get; set; } = "Unidad";
    public string Brand { get; set; } = string.Empty;
    public bool IsActive { get; set; } = true;
    public Guid CategoryId { get; set; }
}
