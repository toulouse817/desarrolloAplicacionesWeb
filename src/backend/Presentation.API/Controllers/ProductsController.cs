// ============================================================================
// Asignatura: Desarrollo de Aplicaciones Web (Código: 0423807T)
// Facilitador: M.Sc. Ing. Gabriel Alexis Ramírez Sánchez
// Período Académico: Septiembre, 2026
// San Cristóbal, Estado Táchira, Venezuela
// ============================================================================

using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Core.Application.DTOs;
using Core.Application.Interfaces;

namespace Presentation.API.Controllers;

/// <summary>
/// Controlador de la API para la gestión de productos.
/// Protegido con autenticación basada en tokens JWT y autorización basada en roles (RBAC).
/// </summary>
[Authorize]
public class ProductsController : ApiControllerBase
{
    private readonly IProductService _productService;

    public ProductsController(IProductService productService)
    {
        _productService = productService;
    }

    /// <summary>
    /// Obtiene la lista completa de productos en el inventario.
    /// Accesible por cualquier usuario autenticado (Admin o Employee).
    /// </summary>
    [HttpGet]
    public async Task<ActionResult<IEnumerable<ProductDto>>> GetAll()
    {
        var products = await _productService.GetAllProductsAsync();
        return Ok(products);
    }

    /// <summary>
    /// Obtiene un producto específico por su ID.
    /// Accesible por cualquier usuario autenticado (Admin o Employee).
    /// </summary>
    [HttpGet("{id:guid}")]
    public async Task<ActionResult<ProductDto>> GetById(Guid id)
    {
        var product = await _productService.GetProductByIdAsync(id);
        if (product == null)
        {
            return NotFound(new { message = $"El producto con ID {id} no existe." });
        }

        return Ok(product);
    }

    /// <summary>
    /// Registra un nuevo producto.
    /// Accesible por cualquier usuario autenticado (Admin o Employee).
    /// </summary>
    [HttpPost]
    public async Task<ActionResult<ProductDto>> Create([FromBody] CreateProductDto dto)
    {
        var newProduct = await _productService.CreateProductAsync(dto);
        return CreatedAtAction(nameof(GetById), new { id = newProduct.Id }, newProduct);
    }

    /// <summary>
    /// Actualiza un producto existente.
    /// Accesible por cualquier usuario autenticado (Admin o Employee).
    /// </summary>
    [HttpPut("{id:guid}")]
    public async Task<IActionResult> Update(Guid id, [FromBody] CreateProductDto dto)
    {
        var updated = await _productService.UpdateProductAsync(id, dto);
        if (!updated)
        {
            return NotFound(new { message = $"No se pudo actualizar. El producto con ID {id} no existe." });
        }

        return NoContent();
    }

    /// <summary>
    /// Elimina un producto físico de la base de datos.
    /// Restringido estrictamente a usuarios con rol Admin.
    /// </summary>
    [HttpDelete("{id:guid}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var deleted = await _productService.DeleteProductAsync(id);
        if (!deleted)
        {
            return NotFound(new { message = $"No se pudo eliminar. El producto con ID {id} no existe." });
        }

        return NoContent();
    }
}

/*
 * El control de acceso basado en roles (RBAC) permite salvaguardar operaciones críticas del inventario. 
 * La anotación global '[Authorize]' asegura que ningún recurso esté expuesto sin autenticación previa mediante JWT. 
 * A nivel de método, '[Authorize(Roles = "Admin")]' restringe operaciones de alto impacto (como la eliminación 
 * de registros) a perfiles administradores, interceptando automáticamente solicitudes no autorizadas y 
 * respondiendo con HTTP 403 Forbidden antes de alcanzar la lógica interna del controlador.
 */
