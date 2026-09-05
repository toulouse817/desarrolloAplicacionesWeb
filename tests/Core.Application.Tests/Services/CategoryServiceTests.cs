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
/// Suite de pruebas unitarias para CategoryService.
/// Valida reglas de integridad referencial y conteo de productos dependientes.
/// </summary>
public class CategoryServiceTests
{
    private readonly Mock<IRepository<Category>> _categoryRepoMock;
    private readonly Mock<IProductRepository> _productRepoMock;
    private readonly CategoryService _sut;

    public CategoryServiceTests()
    {
        _categoryRepoMock = new Mock<IRepository<Category>>();
        _productRepoMock = new Mock<IProductRepository>();
        _sut = new CategoryService(_categoryRepoMock.Object, _productRepoMock.Object);
    }

    [Fact]
    public async Task GetAllCategoriesAsync_ShouldReturnCategoryDtos_WithCalculatedProductCount()
    {
        // Arrange
        var catId1 = Guid.NewGuid();
        var catId2 = Guid.NewGuid();

        var categories = new List<Category>
        {
            new() { Id = catId1, Name = "Bebidas", Description = "LÃ­quidos y refrescos" },
            new() { Id = catId2, Name = "Limpieza", Description = "ArtÃ­culos de aseo" }
        };

        var products = new List<Product>
        {
            new() { Id = Guid.NewGuid(), Name = "Agua Mineral", CategoryId = catId1 },
            new() { Id = Guid.NewGuid(), Name = "Refresco Cola", CategoryId = catId1 },
            new() { Id = Guid.NewGuid(), Name = "Detergente", CategoryId = catId2 }
        };

        _categoryRepoMock.Setup(r => r.GetAllAsync()).ReturnsAsync(categories);
        _productRepoMock.Setup(r => r.GetAllAsync()).ReturnsAsync(products);

        // Act
        var result = (await _sut.GetAllCategoriesAsync()).ToList();

        // Assert
        result.Should().HaveCount(2);
        result.First(c => c.Id == catId1).ProductsCount.Should().Be(2);
        result.First(c => c.Id == catId2).ProductsCount.Should().Be(1);
    }

    [Fact]
    public async Task CreateCategoryAsync_ShouldTrimStrings_AndPersistCategory()
    {
        // Arrange
        var dto = new CreateCategoryDto
        {
            Name = "   Snacks y Golosinas   ",
            Description = "   Variedad de confiterÃ­a   "
        };

        _categoryRepoMock.Setup(r => r.AddAsync(It.IsAny<Category>()))
            .Returns(Task.CompletedTask);

        _categoryRepoMock.Setup(r => r.SaveChangesAsync())
            .ReturnsAsync(true);

        // Act
        var result = await _sut.CreateCategoryAsync(dto);

        // Assert
        result.Should().NotBeNull();
        result.Name.Should().Be("Snacks y Golosinas");
        result.Description.Should().Be("Variedad de confiterÃ­a");
        result.ProductsCount.Should().Be(0);

        _categoryRepoMock.Verify(r => r.AddAsync(It.Is<Category>(c => c.Name == "Snacks y Golosinas")), Times.Once);
        _categoryRepoMock.Verify(r => r.SaveChangesAsync(), Times.Once);
    }

    [Fact]
    public async Task DeleteCategoryAsync_WhenCategoryHasProducts_ShouldThrowInvalidOperationException()
    {
        // Arrange
        var catId = Guid.NewGuid();
        var category = new Category { Id = catId, Name = "Granos" };
        var products = new List<Product>
        {
            new() { Id = Guid.NewGuid(), Name = "Caraotas Negras", CategoryId = catId }
        };

        _categoryRepoMock.Setup(r => r.GetByIdAsync(catId)).ReturnsAsync(category);
        _productRepoMock.Setup(r => r.GetAllAsync()).ReturnsAsync(products);

        // Act
        Func<Task> act = async () => await _sut.DeleteCategoryAsync(catId);

        // Assert
        await act.Should().ThrowAsync<InvalidOperationException>()
            .WithMessage("*productos asociados*");

        _categoryRepoMock.Verify(r => r.Delete(It.IsAny<Category>()), Times.Never);
    }

    [Fact]
    public async Task DeleteCategoryAsync_WhenCategoryHasNoProducts_ShouldDeleteAndReturnTrue()
    {
        // Arrange
        var catId = Guid.NewGuid();
        var category = new Category { Id = catId, Name = "Temporada NavideÃ±a" };
        var products = new List<Product>();

        _categoryRepoMock.Setup(r => r.GetByIdAsync(catId)).ReturnsAsync(category);
        _productRepoMock.Setup(r => r.GetAllAsync()).ReturnsAsync(products);
        _categoryRepoMock.Setup(r => r.SaveChangesAsync()).ReturnsAsync(true);

        // Act
        var result = await _sut.DeleteCategoryAsync(catId);

        // Assert
        result.Should().BeTrue();
        _categoryRepoMock.Verify(r => r.Delete(category), Times.Once);
        _categoryRepoMock.Verify(r => r.SaveChangesAsync(), Times.Once);
    }
}