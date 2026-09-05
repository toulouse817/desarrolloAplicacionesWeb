// ============================================================================
// Asignatura: Desarrollo de Aplicaciones Web (Código: 0423807T)
// Facilitador: M.Sc. Ing. Gabriel Alexis Ramírez Sánchez
// email: gramirezs@unet.edu.ve
// Período Académico: Septiembre, 2026
// San Cristóbal, Estado Táchira, Venezuela
// ============================================================================

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Core.Domain.Entities;

namespace Infrastructure.Persistence.Configurations;

/// <summary>
/// Configuración física con Fluent API para la tabla Categories.
/// </summary>
public class CategoryConfiguration : IEntityTypeConfiguration<Category>
{
    public void Configure(EntityTypeBuilder<Category> builder)
    {
        builder.ToTable("Categories");

        builder.HasKey(c => c.Id);

        builder.Property(c => c.Name)
            .IsRequired()
            .HasMaxLength(50);

        builder.Property(c => c.Description)
            .HasMaxLength(250);

        // Relación 1:N con Products
        builder.HasMany(c => c.Products)
            .WithOne(p => p.Category)
            .HasForeignKey(p => p.CategoryId)
            .OnDelete(DeleteBehavior.Cascade); // Al eliminar una categoría, se eliminan sus productos
    }
}

/*
 * La configuración del mapeo objeto-relacional mediante Fluent API permite desacoplar las entidades de dominio 
 * de las dependencias de persistencia (evitando anotaciones de datos de infraestructura en el dominio). Al aislar 
 * las restricciones de tablas, índices y comportamientos de eliminación en clases de configuración específicas en 
 * la capa de Infraestructura, las entidades permanecen como objetos CLR puros (POCO - Plain Old CLR Objects).
 */
