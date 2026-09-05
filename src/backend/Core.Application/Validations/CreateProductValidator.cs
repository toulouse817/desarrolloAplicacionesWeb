// ============================================================================
// Asignatura: Desarrollo de Aplicaciones Web (Código: 0423807T)
// Facilitador: M.Sc. Ing. Gabriel Alexis Ramírez Sánchez
// Período Académico: Septiembre, 2026
// San Cristóbal, Estado Táchira, Venezuela
// ============================================================================

using FluentValidation;
using Core.Application.DTOs;

namespace Core.Application.Validations;

/// <summary>
/// Validador declarativo para CreateProductDto con reglas avanzadas de negocio.
/// </summary>
public class CreateProductValidator : AbstractValidator<CreateProductDto>
{
    public CreateProductValidator()
    {
        // 1. Regla: Nombre
        RuleFor(p => p.Name)
            .NotEmpty().WithMessage("El nombre del producto es obligatorio.")
            .Length(3, 150).WithMessage("El nombre debe tener entre 3 y 150 caracteres.");

        // 2. Regla: SKU
        RuleFor(p => p.SKU)
            .NotEmpty().WithMessage("El SKU es obligatorio.")
            .Matches(@"^[A-Z0-9\-]{3,20}$")
            .WithMessage("El SKU debe ser alfanumérico en mayúsculas y guiones (ej. PROD-101).");

        // 3. Regla: Precio de Venta
        RuleFor(p => p.Price)
            .GreaterThan(0).WithMessage("El precio de venta debe ser estrictamente positivo.");

        // 4. Regla: Costo de Adquisición
        RuleFor(p => p.CostPrice)
            .GreaterThanOrEqualTo(0).WithMessage("El costo de adquisición no puede ser negativo.");

        // 5. Regla: Stock y Límites
        RuleFor(p => p.Stock)
            .GreaterThanOrEqualTo(0).WithMessage("El stock no puede ser un valor negativo.");

        RuleFor(p => p.MinStock)
            .GreaterThanOrEqualTo(0).WithMessage("El stock mínimo de seguridad no puede ser negativo.");

        RuleFor(p => p.MaxStock)
            .GreaterThan(p => p.MinStock).WithMessage("El stock máximo debe ser mayor al stock mínimo.");

        // 6. Regla: Categoría
        RuleFor(p => p.CategoryId)
            .NotEmpty().WithMessage("El identificador de categoría es obligatorio.");
    }
}
