// ============================================================================
// Asignatura: Desarrollo de Aplicaciones Web (Código: 0423807T)
// Facilitador: M.Sc. Ing. Gabriel Alexis Ramírez Sánchez
// Período Académico: Septiembre, 2026
// San Cristóbal, Estado Táchira, Venezuela
// ============================================================================

using System;

namespace Core.Domain.Entities;

/// <summary>
/// Clase abstracta base para todas las entidades del dominio.
/// Define las propiedades comunes de auditoría e identidad.
/// </summary>
public abstract class BaseEntity
{
    /// <summary>
    /// Identificador único universal (UUID) de la entidad.
    /// </summary>
    public Guid Id { get; set; } = Guid.NewGuid();

    /// <summary>
    /// Fecha y hora en la que la entidad fue persistida en el sistema.
    /// </summary>
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}

/*
 * En el diseño de software orientado a objetos y la aplicación del principio DRY (Don't Repeat Yourself),
 * definir una clase base abstracta permite encapsular el comportamiento común de identidad (Id) e historial 
 * de creación (CreatedAt) en una sola estructura. Todas las entidades del negocio heredan este comportamiento, 
 * facilitando operaciones transversales en la capa de persistencia y asegurando que cada registro mantenga una 
 * identidad homogénea a lo largo del ciclo de vida de la aplicación.
 */
