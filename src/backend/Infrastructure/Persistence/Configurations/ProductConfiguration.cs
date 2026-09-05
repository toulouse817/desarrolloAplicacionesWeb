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
/// Configuración de mapeo relacional con Fluent API para la tabla Products.
/// </summary>
public class ProductConfiguration : IEntityTypeConfiguration<Product>
{
    public void Configure(EntityTypeBuilder<Product> builder)
    {
        builder.ToTable("Products");

        builder.HasKey(p => p.Id);

        builder.Property(p => p.Name)
            .IsRequired()
            .HasMaxLength(150);

        builder.Property(p => p.SKU)
            .IsRequired()
            .HasMaxLength(20);

        builder.HasIndex(p => p.SKU)
            .IsUnique();

        builder.Property(p => p.Description)
            .HasMaxLength(500);

        builder.Property(p => p.Price)
            .IsRequired()
            .HasPrecision(18, 2);

        builder.Property(p => p.CostPrice)
            .IsRequired()
            .HasPrecision(18, 2);

        builder.Property(p => p.Stock)
            .IsRequired();

        builder.Property(p => p.MinStock)
            .IsRequired()
            .HasDefaultValue(5);

        builder.Property(p => p.MaxStock)
            .IsRequired()
            .HasDefaultValue(100);

        builder.Property(p => p.Location)
            .HasMaxLength(100)
            .HasDefaultValue("Almacén Principal");

        builder.Property(p => p.UnitOfMeasure)
            .HasMaxLength(30)
            .HasDefaultValue("Unidad");

        builder.Property(p => p.Brand)
            .HasMaxLength(80);

        builder.Property(p => p.IsActive)
            .IsRequired()
            .HasDefaultValue(true);

        builder.HasOne(p => p.Category)
            .WithMany(c => c.Products)
            .HasForeignKey(p => p.CategoryId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
