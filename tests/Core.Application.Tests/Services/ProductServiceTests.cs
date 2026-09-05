// ============================================================================
// Asignatura: Desarrollo de Aplicaciones Web (CÃ³digo: 0423807T)
// Facilitador: M.Sc. Ing. Gabriel Alexis RamÃ­rez SÃ¡nchez
// email: gramirezs@unet.edu.ve
// PerÃ­odo AcadÃ©mico: Septiembre, 2026
// San CristÃ³bal, Estado TÃ¡chira, Venezuela
// ============================================================================

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Application.DTOs;
using Core.Application.Interfaces;
using Core.Application.Services;
using Core.Domain.Entities;
using FluentAssertions;
using Moq;
using Xunit;

namespace Core.Application.Tests.Services;

/// <summary>
/// Suite de pruebas unitarias automatizadas para ProductService.
/// Valida las reglas de negocio, integridad referencial con categorÃ­as y unicidad de SKU.
/// </summary>
public class ProductServiceTests
{
    private readonly Mock<IProductRepository> _productRepoMock;
    private readonly Mock<IRepository<Category>> _categoryRepoMock;
    private readonly ProductService _sut;

    public ProductServiceTests()
    {
        _productRepoMock = new Mock<IProductRepository>();
        _categoryRepoMock = new Mock<IRepository<Category>>();
        _sut = new ProductService(_productRepoMock.Object, _categoryRepoMock.Object);
    }

    [Fact]
    public async Task GetAllProductsAsync_ShouldReturnMappedDtos()
    {
        // Arrange
        var category = new Category { Id = Guid.NewGuid(), Name = "LÃ¡cteos" };
        var products = new List<Product>
        {
            new() { Id = Guid.NewGuid(), Name = "Leche Entera", SKU = "LEC-001", Price = 1.5m, Category = category, CategoryId = category.Id },
            new() { Id = Guid.NewGuid(), Name = "Queso Blanco", SKU = "QUE-002", Price = 4.0m, Category = category, CategoryId = category.Id }
        };

        _productRepoMock.Setup(r => r.GetProductsWithCategoryAsync())
            .ReturnsAsync(products);

        // Act
        var result = await _sut.GetAllProductsAsync();

        // Assert
        result.Should().NotBeNull();
        result.Should().HaveCount(2);
        result.First().Name.Should().Be("Leche Entera");
        result.First().CategoryName.Should().Be("LÃ¡cteos");
    }

    [Fact]
    public async Task GetProductByIdAsync_WhenExists_ShouldReturnMappedDto()
    {
        // Arrange
        var productId = Guid.NewGuid();
        var category = new Category { Id = Guid.NewGuid(), Name = "Bebidas" };
        var product = new Product
        {
            Id = productId,
            Name = "Jugo de Naranja",
            SKU = "BEB-100",
            Price = 2.0m,
            Category = category,
            CategoryId = category.Id
        };

        _productRepoMock.Setup(r => r.GetProductWithCategoryByIdAsync(productId))
            .ReturnsAsync(product);

        // Act
        var result = await _sut.GetProductByIdAsync(productId);

        // Assert
        result.Should().NotBeNull();
        result!.Id.Should().Be(productId);
        result.Name.Should().Be("Jugo de Naranja");
        result.CategoryName.Should().Be("Bebidas");
    }

    [Fact]
    public async Task GetProductByIdAsync_WhenDoesNotExist_ShouldReturnNull()
    {
        // Arrange
        var productId = Guid.NewGuid();
        _productRepoMock.Setup(r => r.GetProductWithCategoryByIdAsync(productId))
            .ReturnsAsync((Product?)null);

        // Act
        var result = await _sut.GetProductByIdAsync(productId);

        // Assert
        result.Should().BeNull();
    }

    [Fact]
    public async Task CreateProductAsync_WhenCategoryDoesNotExist_ShouldThrowKeyNotFoundException()
    {
        // Arrange
        var categoryId = Guid.NewGuid();
        var dto = new CreateProductDto
        {
            Name = "Yogurt",
            SKU = "YOG-01",
            Price = 2.5m,
            CategoryId = categoryId
        };

        _categoryRepoMock.Setup(r => r.GetByIdAsync(categoryId))
            .ReturnsAsync((Category?)null);

        // Act
        Func<Task> act = async () => await _sut.CreateProductAsync(dto);

        // Assert
        await act.Should().ThrowAsync<KeyNotFoundException>()
            .WithMessage($"*{categoryId}*");
    }

    [Fact]
    public async Task CreateProductAsync_WhenSKUAlreadyExists_ShouldThrowInvalidOperationException()
    {
        // Arrange
        var categoryId = Guid.NewGuid();
        var category = new Category { Id = categoryId, Name = "VÃ­veres" };
        var dto = new CreateProductDto
        {
            Name = "Harina Pan",
            SKU = "HAR-PAN",
            Price = 1.2m,
            CategoryId = categoryId
        };

        _categoryRepoMock.Setup(r => r.GetByIdAsync(categoryId))
            .ReturnsAsync(category);

        _productRepoMock.Setup(r => r.ExistsSKUAsync("HAR-PAN"))
            .ReturnsAsync(true);

        // Act
        Func<Task> act = async () => await _sut.CreateProductAsync(dto);

        // Assert
        await act.Should().ThrowAsync<InvalidOperationException>()
            .WithMessage("*ya se encuentra registrado*");
    }

    [Fact]
    public async Task CreateProductAsync_WhenValid_ShouldPersistAndReturnDto()
    {
        // Arrange
        var categoryId = Guid.NewGuid();
        var category = new Category { Id = categoryId, Name = "VÃ­veres" };
        var dto = new CreateProductDto
        {
            Name = "   Arroz Blanco   ",
            SKU = "arr-01",
            Description = "Bolsa de 1kg",
            Price = 1.1m,
            CostPrice = 0.8m,
            Stock = 50,
            MinStock = 10,
            MaxStock = 100,
            CategoryId = categoryId
        };

        _categoryRepoMock.Setup(r => r.GetByIdAsync(categoryId))
            .ReturnsAsync(category);

        _productRepoMock.Setup(r => r.ExistsSKUAsync(It.IsAny<string>()))
            .ReturnsAsync(false);

        _productRepoMock.Setup(r => r.AddAsync(It.IsAny<Product>()))
            .Returns(Task.CompletedTask);

        _productRepoMock.Setup(r => r.SaveChangesAsync())
            .ReturnsAsync(true);

        // Act
        var result = await _sut.CreateProductAsync(dto);

        // Assert
        result.Should().NotBeNull();
        result.Name.Should().Be("Arroz Blanco");
        result.SKU.Should().Be("ARR-01");
        result.CategoryName.Should().Be("VÃ­veres");

        _productRepoMock.Verify(r => r.AddAsync(It.Is<Product>(p => p.SKU == "ARR-01")), Times.Once);
        _productRepoMock.Verify(r => r.SaveChangesAsync(), Times.Once);
    }

    [Fact]
    public async Task UpdateProductAsync_WhenValid_ShouldUpdateAndReturnTrue()
    {
        // Arrange
        var productId = Guid.NewGuid();
        var categoryId = Guid.NewGuid();
        var existingProduct = new Product
        {
            Id = productId,
            Name = "CafÃ© Molido",
            SKU = "CAF-01",
            Price = 3.0m,
            CategoryId = categoryId
        };
        var category = new Category { Id = categoryId, Name = "Bebidas" };

        var updateDto = new CreateProductDto
        {
            Name = "CafÃ© Gourmet Especial",
            SKU = "CAF-01",
            Price = 4.5m,
            CategoryId = categoryId
        };

        _productRepoMock.Setup(r => r.GetByIdAsync(productId))
            .ReturnsAsync(existingProduct);

        _categoryRepoMock.Setup(r => r.GetByIdAsync(categoryId))
            .ReturnsAsync(category);

        _productRepoMock.Setup(r => r.ExistsSKUAsync("CAF-01", productId))
            .ReturnsAsync(false);

        _productRepoMock.Setup(r => r.SaveChangesAsync())
            .ReturnsAsync(true);

        // Act
        var result = await _sut.UpdateProductAsync(productId, updateDto);

        // Assert
        result.Should().BeTrue();
        existingProduct.Name.Should().Be("CafÃ© Gourmet Especial");
        existingProduct.Price.Should().Be(4.5m);

        _productRepoMock.Verify(r => r.Update(existingProduct), Times.Once);
        _productRepoMock.Verify(r => r.SaveChangesAsync(), Times.Once);
    }

    [Fact]
    public async Task DeleteProductAsync_WhenFound_ShouldDeleteAndReturnTrue()
    {
        // Arrange
        var productId = Guid.NewGuid();
        var existingProduct = new Product { Id = productId, Name = "Pasta Larga" };

        _productRepoMock.Setup(r => r.GetByIdAsync(productId))
            .ReturnsAsync(existingProduct);

        _productRepoMock.Setup(r => r.SaveChangesAsync())
            .ReturnsAsync(true);

        // Act
        var result = await _sut.DeleteProductAsync(productId);

        // Assert
        result.Should().BeTrue();
        _productRepoMock.Verify(r => r.Delete(existingProduct), Times.Once);
        _productRepoMock.Verify(r => r.SaveChangesAsync(), Times.Once);
    }

    [Fact]
    public async Task DeleteProductAsync_WhenNotFound_ShouldReturnFalse()
    {
        // Arrange
        var productId = Guid.NewGuid();
        _productRepoMock.Setup(r => r.GetByIdAsync(productId))
            .ReturnsAsync((Product?)null);

        // Act
        var result = await _sut.DeleteProductAsync(productId);

        // Assert
        result.Should().BeFalse();
        _productRepoMock.Verify(r => r.Delete(It.IsAny<Product>()), Times.Never);
    }
}