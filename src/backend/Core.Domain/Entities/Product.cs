// ============================================================================
// Asignatura: Desarrollo de Aplicaciones Web (Código: 0423807T)
// Facilitador: M.Sc. Ing. Gabriel Alexis Ramírez Sánchez
// Período Académico: Septiembre, 2026
// San Cristóbal, Estado Táchira, Venezuela
// ============================================================================

using System;

namespace Core.Domain.Entities;

/// <summary>
/// Representa un producto individual dentro del inventario empresarial.
/// Incorpora información financiera, logística, de trazabilidad y de control de existencias.
/// </summary>
public class Product : BaseEntity
{
    /// <summary>
    /// Nombre comercial o descriptivo del producto.
    /// </summary>
    public string Name { get; set; } = string.Empty;

    /// <summary>
    /// Código de barras o SKU (Stock Keeping Unit) único e inmutable para control del inventario.
    /// </summary>
    public string SKU { get; set; } = string.Empty;

    /// <summary>
    /// Descripción detallada, características y especificaciones técnicas.
    /// </summary>
    public string Description { get; set; } = string.Empty;

    /// <summary>
    /// Precio de venta al público (PVP / Salida).
    /// </summary>
    public decimal Price { get; set; }

    /// <summary>
    /// Costo unitario de adquisición/compra (para cálculo de margen de ganancia y valorización real de inventario).
    /// </summary>
    public decimal CostPrice { get; set; }

    /// <summary>
    /// Cantidad disponible actual en existencia física en bodega.
    /// </summary>
    public int Stock { get; set; }

    /// <summary>
    /// Nivel de stock mínimo de seguridad (dispara alerta visual y orden de reabastecimiento).
    /// </summary>
    public int MinStock { get; set; } = 5;

    /// <summary>
    /// Capacidad máxima recomendada de almacenamiento para evitar sobre-stock.
    /// </summary>
    public int MaxStock { get; set; } = 100;

    /// <summary>
    /// Ubicación física en el almacén (ej: "Almacén Central - Pasillo B, Estante 4").
    /// </summary>
    public string Location { get; set; } = "Almacén Principal";

    /// <summary>
    /// Unidad de medida (ej: "Unidad", "Caja", "Kg", "Litro", "Paquete").
    /// </summary>
    public string UnitOfMeasure { get; set; } = "Unidad";

    /// <summary>
    /// Marca comercial o fabricante del producto.
    /// </summary>
    public string Brand { get; set; } = string.Empty;

    /// <summary>
    /// Estado del producto en el catálogo (Activo/Inactivo).
    /// </summary>
    public bool IsActive { get; set; } = true;

    /// <summary>
    /// Identificador de la categoría asociada (Clave Foránea).
    /// </summary>
    public Guid CategoryId { get; set; }

    /// <summary>
    /// Propiedad de navegación: Categoría a la que pertenece el producto.
    /// </summary>
    public virtual Category? Category { get; set; }
}

/*
 * En sistemas de gestión empresarial e inventario (ERP), el modelado del dominio requiere considerar tanto 
 * el volumen físico como la valorización financiera y la ubicación espacial de las existencias. Al encapsular 
 * atributos como 'CostPrice', 'Price', 'Location', 'MinStock' y 'MaxStock' directamente en la entidad, el sistema 
 * permite determinar márgenes brutos, puntos de reorden y optimización de espacios de almacenamiento sin depender 
 * de transformaciones externas, dotando a la aplicación de alta cohesión y fidelidad al negocio real.
 */
