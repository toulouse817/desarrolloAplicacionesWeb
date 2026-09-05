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
using Core.Application.DTOs;

namespace Core.Application.Interfaces;

/// <summary>
/// Contrato para el servicio de aplicación que gestiona los productos.
/// Representa los casos de uso disponibles desde el punto de vista del usuario/sistema.
/// </summary>
public interface IProductService
{
    Task<IEnumerable<ProductDto>> GetAllProductsAsync();
    Task<ProductDto?> GetProductByIdAsync(Guid id);
    Task<ProductDto> CreateProductAsync(CreateProductDto dto);
    Task<bool> UpdateProductAsync(Guid id, CreateProductDto dto);
    Task<bool> DeleteProductAsync(Guid id);
}

/*
 * En las arquitecturas limpias y en capas, los controladores de la API deben mantenerse ligeros 
 * (Thin Controllers). 'IProductService' delimita las operaciones de los casos de uso de gestión de 
 * productos. Su implementación concreta orquesta la recepción de DTOs, las reglas de negocio, la interacción 
 * con los repositorios y el mapeo de respuestas, asegurando una separación nítida entre la presentación y 
 * la lógica del negocio.
 */
