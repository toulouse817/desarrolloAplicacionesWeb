// ============================================================================
// Asignatura: Desarrollo de Aplicaciones Web (Código: 0423807T)
// Facilitador: M.Sc. Ing. Gabriel Alexis Ramírez Sánchez
// Período Académico: Septiembre, 2026
// San Cristóbal, Estado Táchira, Venezuela
// ============================================================================

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Core.Domain.Entities;

namespace Infrastructure.Persistence.Configurations;

/// <summary>
/// Configuración física con Fluent API para la tabla Users.
/// </summary>
public class UserConfiguration : IEntityTypeConfiguration<User>
{
    public void Configure(EntityTypeBuilder<User> builder)
    {
        builder.ToTable("Users");

        builder.HasKey(u => u.Id);

        builder.Property(u => u.Username)
            .IsRequired()
            .HasMaxLength(50);

        builder.HasIndex(u => u.Username)
            .IsUnique();

        builder.Property(u => u.Email)
            .IsRequired()
            .HasMaxLength(100);

        builder.HasIndex(u => u.Email)
            .IsUnique();

        builder.Property(u => u.PasswordHash)
            .IsRequired()
            .HasMaxLength(250);

        // Conversión de Enum a String para facilitar legibilidad en la base de datos
        builder.Property(u => u.Role)
            .HasConversion<string>()
            .IsRequired()
            .HasMaxLength(20);
    }
}

/*
 * Por convención, EF Core almacena enumeraciones como enteros. El uso de '.HasConversion<string>()' instruye 
 * al ORM a persistir el rol como una cadena de texto (ej. "Admin" o "Employee") en la base de datos relacional, 
 * mientras que en C# se conserva la seguridad de tipos del enum. Esta técnica equilibra la claridad en auditorías 
 * SQL con el tipado estricto en el código fuente.
 */
