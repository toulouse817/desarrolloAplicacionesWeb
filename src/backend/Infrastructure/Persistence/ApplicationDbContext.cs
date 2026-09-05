// ============================================================================
// Asignatura: Desarrollo de Aplicaciones Web (Código: 0423807T)
// Facilitador: M.Sc. Ing. Gabriel Alexis Ramírez Sánchez
// Período Académico: Septiembre, 2026
// San Cristóbal, Estado Táchira, Venezuela
// ============================================================================

using Microsoft.EntityFrameworkCore;
using Core.Domain.Entities;
using Core.Domain.Enums;
using System;

namespace Infrastructure.Persistence;

/// <summary>
/// Contexto de datos de EF Core que administra la conexión y mapeo a PostgreSQL.
/// Configurado con catálogo especializado para ferretería y materiales de construcción.
/// </summary>
public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

    public DbSet<Product> Products => Set<Product>();
    public DbSet<Category> Categories => Set<Category>();
    public DbSet<User> Users => Set<User>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.ApplyConfigurationsFromAssembly(typeof(ApplicationDbContext).Assembly);

        // 1. Definición de Identificadores UUID Fijos para Categorías de Ferretería
        var catHerramientasElectricas = Guid.Parse("10000000-0000-0000-0000-000000000001");
        var catHerramientasManuales    = Guid.Parse("10000000-0000-0000-0000-000000000002");
        var catMaterialesConstruccion = Guid.Parse("10000000-0000-0000-0000-000000000003");
        var catPinturasAcabados       = Guid.Parse("10000000-0000-0000-0000-000000000004");
        var catPlomeriaTuberias        = Guid.Parse("10000000-0000-0000-0000-000000000005");
        var catElectricidadIlum       = Guid.Parse("10000000-0000-0000-0000-000000000006");
        var catSeguridadIndustrial    = Guid.Parse("10000000-0000-0000-0000-000000000007");
        var catFijacionesTornillos    = Guid.Parse("10000000-0000-0000-0000-000000000008");

        // 2. Siembra de Categorías de Ferretería
        modelBuilder.Entity<Category>().HasData(
            new Category 
            { 
                Id = catHerramientasElectricas, 
                Name = "Herramientas Eléctricas y Maquinaria", 
                Description = "Taladros, esmeriladoras, rotomartillos, sierras y compresores" 
            },
            new Category 
            { 
                Id = catHerramientasManuales, 
                Name = "Herramientas Manuales", 
                Description = "Martillos, llaves, alicates, destornilladores y niveles" 
            },
            new Category 
            { 
                Id = catMaterialesConstruccion, 
                Name = "Materiales de Construcción y Albañilería", 
                Description = "Cemento, bloques, arena, cabillas de acero, yeso y morteros" 
            },
            new Category 
            { 
                Id = catPinturasAcabados, 
                Name = "Pinturas, Acabados y Adhesivos", 
                Description = "Pinturas látex, esmaltes sintéticos, selladores, brochas y rodillos" 
            },
            new Category 
            { 
                Id = catPlomeriaTuberias, 
                Name = "Plomería, Grifería y Tuberías", 
                Description = "Tubos PVC/CPVC, llaves de paso, grifos, bombas y accesorios" 
            },
            new Category 
            { 
                Id = catElectricidadIlum, 
                Name = "Electricidad e Iluminación", 
                Description = "Cables THW, breakers, reflectores LED, interruptores y tomacorrientes" 
            },
            new Category 
            { 
                Id = catSeguridadIndustrial, 
                Name = "Seguridad Industrial y EPP", 
                Description = "Cascos, botas de seguridad, guantes de carnaza y lentes protectores" 
            },
            new Category 
            { 
                Id = catFijacionesTornillos, 
                Name = "Tornillería, Pernos y Anclajes", 
                Description = "Tornillos para drywall, pernos hexagonales, ramplugs y clavos" 
            }
        );

        // 3. Siembra de Productos de Ferretería con Datos Enriquecidos
        modelBuilder.Entity<Product>().HasData(
            // HERRAMIENTAS ELÉCTRICAS
            new Product
            {
                Id = Guid.Parse("20000000-0000-0000-0000-000000000001"),
                Name = "Taladro Percutor DeWalt 1/2'' 800W VVR",
                SKU = "TAL-DEW-800W",
                Description = "Taladro de impacto profesional para concreto, madera y metal. Incluye mandril de 13mm.",
                Price = 89.50m,
                CostPrice = 62.00m,
                Stock = 22,
                MinStock = 6,
                MaxStock = 45,
                Location = "Pasillo 1 - Estante A1",
                UnitOfMeasure = "Unidad",
                Brand = "DeWalt",
                IsActive = true,
                CategoryId = catHerramientasElectricas
            },
            new Product
            {
                Id = Guid.Parse("20000000-0000-0000-0000-000000000002"),
                Name = "Esmeriladora Angular Bosch 4-1/2'' 900W",
                SKU = "ESM-BOSCH-900W",
                Description = "Amoladora angular con guarda de protección y empuñadura antivibración.",
                Price = 74.00m,
                CostPrice = 51.50m,
                Stock = 15,
                MinStock = 5,
                MaxStock = 35,
                Location = "Pasillo 1 - Estante A2",
                UnitOfMeasure = "Unidad",
                Brand = "Bosch",
                IsActive = true,
                CategoryId = catHerramientasElectricas
            },
            new Product
            {
                Id = Guid.Parse("20000000-0000-0000-0000-000000000003"),
                Name = "Sierra Circular Stanley 7-1/4'' 1600W",
                SKU = "SIE-STAN-1600W",
                Description = "Corte preciso en madera con disco de carburo de 24 dientes y guía láser.",
                Price = 115.00m,
                CostPrice = 82.00m,
                Stock = 3, // Stock Crítico (< MinStock)
                MinStock = 5,
                MaxStock = 20,
                Location = "Pasillo 1 - Estante B1",
                UnitOfMeasure = "Unidad",
                Brand = "Stanley",
                IsActive = true,
                CategoryId = catHerramientasElectricas
            },

            // HERRAMIENTAS MANUALES
            new Product
            {
                Id = Guid.Parse("20000000-0000-0000-0000-000000000004"),
                Name = "Martillo de Uña Curva 16oz Mango Fibra",
                SKU = "MAR-STAN-16OZ",
                Description = "Cabeza de acero forjado pulido con mango ergonómico antideslizante.",
                Price = 14.50m,
                CostPrice = 9.20m,
                Stock = 45,
                MinStock = 12,
                MaxStock = 80,
                Location = "Pasillo 2 - Estante C1",
                UnitOfMeasure = "Unidad",
                Brand = "Stanley",
                IsActive = true,
                CategoryId = catHerramientasManuales
            },
            new Product
            {
                Id = Guid.Parse("20000000-0000-0000-0000-000000000005"),
                Name = "Juego de Llaves Combinadas 8-19mm (12 Pzas)",
                SKU = "JGO-LLAV-COMB12",
                Description = "Acero cromo vanadio de alta resistencia con estuche organizador.",
                Price = 28.00m,
                CostPrice = 17.50m,
                Stock = 18,
                MinStock = 6,
                MaxStock = 40,
                Location = "Pasillo 2 - Estante C3",
                UnitOfMeasure = "Juego",
                Brand = "Truper",
                IsActive = true,
                CategoryId = catHerramientasManuales
            },
            new Product
            {
                Id = Guid.Parse("20000000-0000-0000-0000-000000000006"),
                Name = "Cinta Métrica 8 Metros / 26 Pies Uso Rudo",
                SKU = "CIN-MET-8M",
                Description = "Cinta con revestimiento de nylon y gancho magnético de sujeción.",
                Price = 8.50m,
                CostPrice = 4.80m,
                Stock = 60,
                MinStock = 15,
                MaxStock = 120,
                Location = "Pasillo 2 - Mostrador",
                UnitOfMeasure = "Unidad",
                Brand = "Lufkin",
                IsActive = true,
                CategoryId = catHerramientasManuales
            },

            // MATERIALES DE CONSTRUCCIÓN
            new Product
            {
                Id = Guid.Parse("20000000-0000-0000-0000-000000000007"),
                Name = "Cemento Portland Tipo I Saco 42.5 Kg",
                SKU = "CEM-PORT-42KG",
                Description = "Cemento estructural de alta resistencia para concreto y mampostería.",
                Price = 9.80m,
                CostPrice = 7.40m,
                Stock = 150,
                MinStock = 40,
                MaxStock = 400,
                Location = "Patio de Carga - Bahía 1",
                UnitOfMeasure = "Saco",
                Brand = "Vencemos",
                IsActive = true,
                CategoryId = catMaterialesConstruccion
            },
            new Product
            {
                Id = Guid.Parse("20000000-0000-0000-0000-000000000008"),
                Name = "Cabilla Estriada de Acero 1/2'' (12m)",
                SKU = "CAB-ESTR-12MM",
                Description = "Varilla corrugada grado 60 para refuerzo estructural de vigas y columnas.",
                Price = 12.20m,
                CostPrice = 9.10m,
                Stock = 85,
                MinStock = 25,
                MaxStock = 200,
                Location = "Patio de Carga - Bahía 3",
                UnitOfMeasure = "Varilla",
                Brand = "Sidor",
                IsActive = true,
                CategoryId = catMaterialesConstruccion
            },
            new Product
            {
                Id = Guid.Parse("20000000-0000-0000-0000-000000000009"),
                Name = "Pego Gris para Cerámica Saco 20 Kg",
                SKU = "PEG-CER-20KG",
                Description = "Mortero adhesivo base cemento para instalación de baldosas y pisos.",
                Price = 5.50m,
                CostPrice = 3.60m,
                Stock = 0, // Agotado
                MinStock = 20,
                MaxStock = 150,
                Location = "Patio de Carga - Bahía 2",
                UnitOfMeasure = "Saco",
                Brand = "Pegomax",
                IsActive = true,
                CategoryId = catMaterialesConstruccion
            },

            // PINTURAS Y ACABADOS
            new Product
            {
                Id = Guid.Parse("20000000-0000-0000-0000-000000000010"),
                Name = "Pintura Látex Caucho Blanco Mate Cuñete (4 Gal)",
                SKU = "PIN-LAT-BLAN-4G",
                Description = "Pintura lavable de alto cubrimiento y secado rápido para interiores y exteriores.",
                Price = 38.00m,
                CostPrice = 25.00m,
                Stock = 24,
                MinStock = 8,
                MaxStock = 60,
                Location = "Pasillo 3 - Estante D1",
                UnitOfMeasure = "Cuñete",
                Brand = "Montana",
                IsActive = true,
                CategoryId = catPinturasAcabados
            },
            new Product
            {
                Id = Guid.Parse("20000000-0000-0000-0000-000000000011"),
                Name = "Esmalte Sintético Anticorrosivo Negro Galón",
                SKU = "ESM-SINT-NEG-1G",
                Description = "Protección antioxidante para herrería, puertas y estructuras metálicas.",
                Price = 21.00m,
                CostPrice = 14.20m,
                Stock = 16,
                MinStock = 6,
                MaxStock = 45,
                Location = "Pasillo 3 - Estante D2",
                UnitOfMeasure = "Galón",
                Brand = "Flamingo",
                IsActive = true,
                CategoryId = catPinturasAcabados
            },

            // PLOMERÍA Y TUBERÍAS
            new Product
            {
                Id = Guid.Parse("20000000-0000-0000-0000-000000000012"),
                Name = "Tubo PVC Aguas Blancas 1/2'' Presión (6m)",
                SKU = "TUB-PVC-BLAN-12",
                Description = "Tubería de PVC para distribución de agua potable a alta presión.",
                Price = 4.20m,
                CostPrice = 2.70m,
                Stock = 110,
                MinStock = 30,
                MaxStock = 250,
                Location = "Zona Tuberías - Racks",
                UnitOfMeasure = "Tubo 6m",
                Brand = "Pavco",
                IsActive = true,
                CategoryId = catPlomeriaTuberias
            },
            new Product
            {
                Id = Guid.Parse("20000000-0000-0000-0000-000000000013"),
                Name = "Llave de Paso Esférica de Bronce 1/2''",
                SKU = "LLAV-PASO-BRON-12",
                Description = "Válvula de bola de latón niquelado para corte de suministro de agua.",
                Price = 6.80m,
                CostPrice = 4.10m,
                Stock = 32,
                MinStock = 10,
                MaxStock = 70,
                Location = "Pasillo 4 - Gaveta P2",
                UnitOfMeasure = "Unidad",
                Brand = "Genebre",
                IsActive = true,
                CategoryId = catPlomeriaTuberias
            },

            // ELECTRICIDAD E ILUMINACIÓN
            new Product
            {
                Id = Guid.Parse("20000000-0000-0000-0000-000000000014"),
                Name = "Rollo Cable Eléctrico THW Calibre 12 AWG (100m)",
                SKU = "CAB-THW-12AWG",
                Description = "Conductor de cobre 100% electrolítico con aislamiento termoplástico 600V.",
                Price = 52.00m,
                CostPrice = 37.00m,
                Stock = 28,
                MinStock = 8,
                MaxStock = 60,
                Location = "Pasillo 5 - Estante E1",
                UnitOfMeasure = "Rollo 100m",
                Brand = "Phelps Dodge",
                IsActive = true,
                CategoryId = catElectricidadIlum
            },
            new Product
            {
                Id = Guid.Parse("20000000-0000-0000-0000-000000000015"),
                Name = "Reflector LED Exterior 100W IP65 Luz Blanca",
                SKU = "REF-LED-100W-IP65",
                Description = "Iluminación de alta potencia para fachadas, galpones y patios.",
                Price = 24.50m,
                CostPrice = 15.80m,
                Stock = 19,
                MinStock = 6,
                MaxStock = 50,
                Location = "Pasillo 5 - Estante E3",
                UnitOfMeasure = "Unidad",
                Brand = "Philips",
                IsActive = true,
                CategoryId = catElectricidadIlum
            },

            // SEGURIDAD INDUSTRIAL
            new Product
            {
                Id = Guid.Parse("20000000-0000-0000-0000-000000000016"),
                Name = "Casco de Seguridad Tipo I Clase E Dieléctrico",
                SKU = "CAS-SEG-TIPO1",
                Description = "Casco con suspensión de 4 puntos y ajuste tipo rachet para protección de impacto.",
                Price = 8.00m,
                CostPrice = 4.90m,
                Stock = 40,
                MinStock = 10,
                MaxStock = 90,
                Location = "Pasillo 6 - Estante F1",
                UnitOfMeasure = "Unidad",
                Brand = "3M",
                IsActive = true,
                CategoryId = catSeguridadIndustrial
            },
            new Product
            {
                Id = Guid.Parse("20000000-0000-0000-0000-000000000017"),
                Name = "Guantes de Carnaza Reforzada para Construcción",
                SKU = "GUA-CARN-REFOR",
                Description = "Guantes de cuero vacuno para manipulación de materiales pesados y soldadura.",
                Price = 4.50m,
                CostPrice = 2.60m,
                Stock = 55,
                MinStock = 15,
                MaxStock = 120,
                Location = "Pasillo 6 - Estante F2",
                UnitOfMeasure = "Par",
                Brand = "SafetyPro",
                IsActive = true,
                CategoryId = catSeguridadIndustrial
            },

            // TORNILLERÍA Y FIJACIONES
            new Product
            {
                Id = Guid.Parse("20000000-0000-0000-0000-000000000018"),
                Name = "Caja Tornillos Drywall Punta Fina 6x1'' (1000 Pzas)",
                SKU = "TOR-DRYW-6X1",
                Description = "Tornillos fosfatados autorroscantes para placas de yeso y estructuras metálicas.",
                Price = 11.50m,
                CostPrice = 7.10m,
                Stock = 36,
                MinStock = 10,
                MaxStock = 80,
                Location = "Pasillo 4 - Estantería T1",
                UnitOfMeasure = "Caja 1000u",
                Brand = "Fischer",
                IsActive = true,
                CategoryId = catFijacionesTornillos
            }
        );

        // 4. Siembra de Usuarios del Sistema
        modelBuilder.Entity<User>().HasData(
            new User 
            { 
                Id = Guid.Parse("44444444-4444-4444-4444-444444444444"), 
                Username = "admin", 
                Email = "admin@unet.edu.ve", 
                PasswordHash = "JAvlGPq9JyTdtvBO6x2llnRI1+gxwIyPqCKAn3THIKk=", // admin123
                Role = UserRole.Admin 
            },
            new User 
            { 
                Id = Guid.Parse("55555555-5555-5555-5555-555555555555"), 
                Username = "empleado", 
                Email = "empleado@unet.edu.ve", 
                PasswordHash = "zME+irCBnjq2FxneQHHsrmwdPNNdxIuRytNIHyCSL58=", // empleado123
                Role = UserRole.Employee 
            }
        );
    }
}
