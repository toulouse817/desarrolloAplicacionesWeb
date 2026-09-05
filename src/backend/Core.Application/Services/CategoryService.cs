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
/// Implementación de la lógica de negocio para la gestión de categorías.
/// </summary>
public class CategoryService : ICategoryService
{
    private readonly IRepository<Category> _categoryRepository;
    private readonly IProductRepository _productRepository;

    public CategoryService(
        IRepository<Category> categoryRepository,
        IProductRepository productRepository)
    {
        _categoryRepository = categoryRepository;
        _productRepository = productRepository;
    }

    public async Task<IEnumerable<CategoryDto>> GetAllCategoriesAsync()
    {
        var categories = await _categoryRepository.GetAllAsync();
        var products = await _productRepository.GetAllAsync();

        return categories.Select(c => new CategoryDto
        {
            Id = c.Id,
            Name = c.Name,
            Description = c.Description,
            ProductsCount = products.Count(p => p.CategoryId == c.Id),
            CreatedAt = c.CreatedAt
        });
    }

    public async Task<CategoryDto?> GetCategoryByIdAsync(Guid id)
    {
        var category = await _categoryRepository.GetByIdAsync(id);
        if (category == null) return null;

        var products = await _productRepository.GetAllAsync();

        return new CategoryDto
        {
            Id = category.Id,
            Name = category.Name,
            Description = category.Description,
            ProductsCount = products.Count(p => p.CategoryId == category.Id),
            CreatedAt = category.CreatedAt
        };
    }

    public async Task<CategoryDto> CreateCategoryAsync(CreateCategoryDto dto)
    {
        var category = new Category
        {
            Name = dto.Name.Trim(),
            Description = dto.Description.Trim()
        };

        await _categoryRepository.AddAsync(category);
        await _categoryRepository.SaveChangesAsync();

        return new CategoryDto
        {
            Id = category.Id,
            Name = category.Name,
            Description = category.Description,
            ProductsCount = 0,
            CreatedAt = category.CreatedAt
        };
    }

    public async Task<bool> UpdateCategoryAsync(Guid id, CreateCategoryDto dto)
    {
        var category = await _categoryRepository.GetByIdAsync(id);
        if (category == null) return false;

        category.Name = dto.Name.Trim();
        category.Description = dto.Description.Trim();

        _categoryRepository.Update(category);
        return await _categoryRepository.SaveChangesAsync();
    }

    public async Task<bool> DeleteCategoryAsync(Guid id)
    {
        var category = await _categoryRepository.GetByIdAsync(id);
        if (category == null) return false;

        // Validar si existen productos asignados antes de eliminar
        var products = await _productRepository.GetAllAsync();
        if (products.Any(p => p.CategoryId == id))
        {
            throw new InvalidOperationException("No se puede eliminar una categoría que tiene productos asociados. Reasigne o elimine los productos primero.");
        }

        _categoryRepository.Delete(category);
        return await _categoryRepository.SaveChangesAsync();
    }
}
