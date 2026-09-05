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
using Core.Application.DTOs;
using Core.Application.Interfaces;
using Core.Domain.Entities;

namespace Core.Application.Services;

/// <summary>
/// Servicio de aplicación que orquesta la lógica de negocio de los productos.
/// </summary>
public class ProductService : IProductService
{
    private readonly IProductRepository _productRepository;
    private readonly IRepository<Category> _categoryRepository;

    public ProductService(
        IProductRepository productRepository, 
        IRepository<Category> categoryRepository)
    {
        _productRepository = productRepository;
        _categoryRepository = categoryRepository;
    }

    public async Task<IEnumerable<ProductDto>> GetAllProductsAsync()
    {
        var products = await _productRepository.GetProductsWithCategoryAsync();
        return products.Select(MapToDto);
    }

    public async Task<ProductDto?> GetProductByIdAsync(Guid id)
    {
        var product = await _productRepository.GetProductWithCategoryByIdAsync(id);
        return product == null ? null : MapToDto(product);
    }

    public async Task<ProductDto> CreateProductAsync(CreateProductDto dto)
    {
        // 1. Validar existencia de categoría
        var category = await _categoryRepository.GetByIdAsync(dto.CategoryId);
        if (category == null)
            throw new KeyNotFoundException($"La categoría con ID '{dto.CategoryId}' no existe.");

        // 2. Validar invariante de negocio: Unicidad del SKU
        if (await _productRepository.ExistsSKUAsync(dto.SKU))
            throw new InvalidOperationException($"El código SKU '{dto.SKU}' ya se encuentra registrado.");

        // 3. Crear entidad de Dominio con datos enriquecidos
        var product = new Product
        {
            Name = dto.Name.Trim(),
            SKU = dto.SKU.Trim().ToUpperInvariant(),
            Description = dto.Description?.Trim() ?? string.Empty,
            Price = dto.Price,
            CostPrice = dto.CostPrice,
            Stock = dto.Stock,
            MinStock = dto.MinStock,
            MaxStock = dto.MaxStock,
            Location = string.IsNullOrWhiteSpace(dto.Location) ? "Almacén Principal" : dto.Location.Trim(),
            UnitOfMeasure = string.IsNullOrWhiteSpace(dto.UnitOfMeasure) ? "Unidad" : dto.UnitOfMeasure.Trim(),
            Brand = dto.Brand?.Trim() ?? string.Empty,
            IsActive = dto.IsActive,
            CategoryId = dto.CategoryId
        };

        // 4. Persistir entidad
        await _productRepository.AddAsync(product);
        await _productRepository.SaveChangesAsync();

        product.Category = category;
        return MapToDto(product);
    }

    public async Task<bool> UpdateProductAsync(Guid id, CreateProductDto dto)
    {
        var product = await _productRepository.GetByIdAsync(id);
        if (product == null) return false;

        var category = await _categoryRepository.GetByIdAsync(dto.CategoryId);
        if (category == null)
            throw new KeyNotFoundException($"La categoría con ID '{dto.CategoryId}' no existe.");

        if (await _productRepository.ExistsSKUAsync(dto.SKU, id))
            throw new InvalidOperationException($"El código SKU '{dto.SKU}' ya se encuentra registrado por otro producto.");

        product.Name = dto.Name.Trim();
        product.SKU = dto.SKU.Trim().ToUpperInvariant();
        product.Description = dto.Description?.Trim() ?? string.Empty;
        product.Price = dto.Price;
        product.CostPrice = dto.CostPrice;
        product.Stock = dto.Stock;
        product.MinStock = dto.MinStock;
        product.MaxStock = dto.MaxStock;
        product.Location = string.IsNullOrWhiteSpace(dto.Location) ? "Almacén Principal" : dto.Location.Trim();
        product.UnitOfMeasure = string.IsNullOrWhiteSpace(dto.UnitOfMeasure) ? "Unidad" : dto.UnitOfMeasure.Trim();
        product.Brand = dto.Brand?.Trim() ?? string.Empty;
        product.IsActive = dto.IsActive;
        product.CategoryId = dto.CategoryId;

        _productRepository.Update(product);
        return await _productRepository.SaveChangesAsync();
    }

    public async Task<bool> DeleteProductAsync(Guid id)
    {
        var product = await _productRepository.GetByIdAsync(id);
        if (product == null) return false;

        _productRepository.Delete(product);
        return await _productRepository.SaveChangesAsync();
    }

    private static ProductDto MapToDto(Product p) => new()
    {
        Id = p.Id,
        Name = p.Name,
        SKU = p.SKU,
        Description = p.Description,
        Price = p.Price,
        CostPrice = p.CostPrice,
        Stock = p.Stock,
        MinStock = p.MinStock,
        MaxStock = p.MaxStock,
        Location = p.Location,
        UnitOfMeasure = p.UnitOfMeasure,
        Brand = p.Brand,
        IsActive = p.IsActive,
        CategoryId = p.CategoryId,
        CategoryName = p.Category?.Name ?? "Sin Categoría",
        CreatedAt = p.CreatedAt
    };
}
