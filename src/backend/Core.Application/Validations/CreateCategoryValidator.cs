// ============================================================================
// Asignatura: Desarrollo de Aplicaciones Web (Código: 0423807T)
// Facilitador: M.Sc. Ing. Gabriel Alexis Ramírez Sánchez
// email: gramirezs@unet.edu.ve
// Período Académico: Septiembre, 2026
// San Cristóbal, Estado Táchira, Venezuela
// ============================================================================

using FluentValidation;
using Core.Application.DTOs;

namespace Core.Application.Validations;

/// <summary>
/// Validador declarativo para categorías de productos.
/// </summary>
public class CreateCategoryValidator : AbstractValidator<CreateCategoryDto>
{
    public CreateCategoryValidator()
    {
        RuleFor(c => c.Name)
            .NotEmpty().WithMessage("El nombre de la categoría es obligatorio.")
            .Length(2, 80).WithMessage("El nombre debe tener entre 2 y 80 caracteres.");

        RuleFor(c => c.Description)
            .MaximumLength(250).WithMessage("La descripción no puede exceder los 250 caracteres.");
    }
}
