// ============================================================================
// Asignatura: Desarrollo de Aplicaciones Web (CÃ³digo: 0423807T)
// Facilitador: M.Sc. Ing. Gabriel Alexis RamÃ­rez SÃ¡nchez
// email: gramirezs@unet.edu.ve
// PerÃ­odo AcadÃ©mico: Septiembre, 2026
// San CristÃ³bal, Estado TÃ¡chira, Venezuela
// ============================================================================

using System;
using Core.Application.DTOs;
using Core.Application.Validations;
using FluentAssertions;
using Xunit;

namespace Core.Application.Tests.Validations;

/// <summary>
/// Pruebas unitarias para CreateProductValidator.
/// Valida reglas de validaciÃ³n declarativa (FluentValidation) para la creaciÃ³n de productos.
/// </summary>
public class CreateProductValidatorTests
{
    private readonly CreateProductValidator _validator;

    public CreateProductValidatorTests()
    {
        _validator = new CreateProductValidator();
    }

    [Theory]
    [InlineData("")]
    [InlineData(" ")]
    [InlineData("AB")]
    public void Validar_DeberiaTenerError_CuandoNombreEsInvalido(string nombreInvalido)
    {
        // Arrange
        var dto = new CreateProductDto
        {
            Name = nombreInvalido,
            SKU = "PROD-001",
            Price = 10.5m,
            Stock = 5,
            MinStock = 2,
            MaxStock = 20,
            CategoryId = Guid.NewGuid()
        };

        // Act
        var resultado = _validator.Validate(dto);

        // Assert
        resultado.IsValid.Should().BeFalse();
        resultado.Errors.Should().Contain(e => e.PropertyName == nameof(dto.Name));
    }

    [Theory]
    [InlineData("")]
    [InlineData("a")]
    [InlineData("sku con espacios")]
    [InlineData("sku_invalido_con_caracteres_especiales_muy_largo_excediendo_limite")]
    public void Validar_DeberiaTenerError_CuandoSKUEsInvalido(string skuInvalido)
    {
        // Arrange
        var dto = new CreateProductDto
        {
            Name = "Producto Valido",
            SKU = skuInvalido,
            Price = 10.5m,
            Stock = 5,
            MinStock = 2,
            MaxStock = 20,
            CategoryId = Guid.NewGuid()
        };

        // Act
        var resultado = _validator.Validate(dto);

        // Assert
        resultado.IsValid.Should().BeFalse();
        resultado.Errors.Should().Contain(e => e.PropertyName == nameof(dto.SKU));
    }

    [Theory]
    [InlineData(0)]
    [InlineData(-10.5)]
    public void Validar_DeberiaTenerError_CuandoPrecioEsMenorOIgualACero(decimal precioInvalido)
    {
        // Arrange
        var dto = new CreateProductDto
        {
            Name = "Producto Valido",
            SKU = "PROD-101",
            Price = precioInvalido,
            Stock = 5,
            MinStock = 2,
            MaxStock = 20,
            CategoryId = Guid.NewGuid()
        };

        // Act
        var resultado = _validator.Validate(dto);

        // Assert
        resultado.IsValid.Should().BeFalse();
        resultado.Errors.Should().Contain(e => e.PropertyName == nameof(dto.Price));
    }

    [Fact]
    public void Validar_DeberiaTenerError_CuandoMaxStockEsMenorOIgualAMinStock()
    {
        // Arrange
        var dto = new CreateProductDto
        {
            Name = "Producto Valido",
            SKU = "PROD-101",
            Price = 25.0m,
            Stock = 5,
            MinStock = 10,
            MaxStock = 5,
            CategoryId = Guid.NewGuid()
        };

        // Act
        var resultado = _validator.Validate(dto);

        // Assert
        resultado.IsValid.Should().BeFalse();
        resultado.Errors.Should().Contain(e => e.PropertyName == nameof(dto.MaxStock));
    }

    [Fact]
    public void Validar_DeberiaSerValido_CuandoTodosLosCamposCumplenReglas()
    {
        // Arrange
        var dto = new CreateProductDto
        {
            Name = "Monitor Gamer 27 Pulgadas",
            SKU = "MON-27-144",
            Description = "Monitor LED IPS 144Hz",
            Price = 249.99m,
            CostPrice = 180.00m,
            Stock = 15,
            MinStock = 3,
            MaxStock = 50,
            Location = "Estante B-12",
            UnitOfMeasure = "Unidad",
            Brand = "Samsung",
            IsActive = true,
            CategoryId = Guid.NewGuid()
        };

        // Act
        var resultado = _validator.Validate(dto);

        // Assert
        resultado.IsValid.Should().BeTrue();
        resultado.Errors.Should().BeEmpty();
    }
}