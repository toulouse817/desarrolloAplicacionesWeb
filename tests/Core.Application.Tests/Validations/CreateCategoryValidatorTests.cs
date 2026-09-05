// ============================================================================
// Asignatura: Desarrollo de Aplicaciones Web (CÃ³digo: 0423807T)
// Facilitador: M.Sc. Ing. Gabriel Alexis RamÃ­rez SÃ¡nchez
// email: gramirezs@unet.edu.ve
// PerÃ­odo AcadÃ©mico: Septiembre, 2026
// San CristÃ³bal, Estado TÃ¡chira, Venezuela
// ============================================================================

using Core.Application.DTOs;
using Core.Application.Validations;
using FluentAssertions;
using Xunit;

namespace Core.Application.Tests.Validations;

/// <summary>
/// Pruebas unitarias para CreateCategoryValidator.
/// Valida la obligatoriedad y lÃ­mites de longitud en nombres y descripciones de rubros.
/// </summary>
public class CreateCategoryValidatorTests
{
    private readonly CreateCategoryValidator _validator;

    public CreateCategoryValidatorTests()
    {
        _validator = new CreateCategoryValidator();
    }

    [Theory]
    [InlineData("")]
    [InlineData(" ")]
    [InlineData("A")]
    public void Validar_DeberiaTenerError_CuandoNombreEsInvalido(string nombreInvalido)
    {
        // Arrange
        var dto = new CreateCategoryDto
        {
            Name = nombreInvalido,
            Description = "DescripciÃ³n de prueba"
        };

        // Act
        var resultado = _validator.Validate(dto);

        // Assert
        resultado.IsValid.Should().BeFalse();
        resultado.Errors.Should().Contain(e => e.PropertyName == nameof(dto.Name));
    }

    [Fact]
    public void Validar_DeberiaSerValido_CuandoNombreYDescripcionCumplenReglas()
    {
        // Arrange
        var dto = new CreateCategoryDto
        {
            Name = "Materiales de ConstrucciÃ³n",
            Description = "Cemento, arena, cabillas y bloques"
        };

        // Act
        var resultado = _validator.Validate(dto);

        // Assert
        resultado.IsValid.Should().BeTrue();
        resultado.Errors.Should().BeEmpty();
    }
}