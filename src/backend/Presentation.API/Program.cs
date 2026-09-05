// ============================================================================
// Asignatura: Desarrollo de Aplicaciones Web (Código: 0423807T)
// Facilitador: M.Sc. Ing. Gabriel Alexis Ramírez Sánchez
// email: gramirezs@unet.edu.ve
// Período Académico: Septiembre, 2026
// San Cristóbal, Estado Táchira, Venezuela
// ============================================================================

using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using FluentValidation;
using Core.Application.Interfaces;
using Core.Application.Services;
using Core.Application.Validations;
using Infrastructure;
using Infrastructure.Persistence;
using Presentation.API.Middleware;
using Presentation.API.Services;

var builder = WebApplication.CreateBuilder(args);

// 1. REGISTRO DE SERVICIOS EN EL CONTENEDOR IoC
builder.Services.AddControllers();

// Registrar capa de persistencia (PostgreSQL + Repositorios Scoped)
builder.Services.AddInfrastructure(builder.Configuration);

// Registrar servicios de la capa de aplicación
builder.Services.AddScoped<IProductService, ProductService>();
builder.Services.AddScoped<ICategoryService, CategoryService>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<ITokenService, TokenService>();

// Registrar validadores de FluentValidation
builder.Services.AddValidatorsFromAssemblyContaining<CreateProductValidator>();

// Configuración de Autenticación JWT Bearer
var jwtSettings = builder.Configuration.GetSection("JwtSettings");
var secretKey = jwtSettings["Key"] ?? throw new InvalidOperationException("Clave JWT no configurada.");

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = jwtSettings["Issuer"],
        ValidAudience = jwtSettings["Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey)),
        ClockSkew = TimeSpan.Zero
    };
});

// Configuración de CORS permitiendo orígenes del Frontend
builder.Services.AddCors(options =>
{
    options.AddPolicy("CorsPolicy", policy =>
    {
        policy.WithOrigins("http://localhost:5173", "http://localhost:3000", "http://localhost:8080")
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});

var app = builder.Build();

// 2. CONFIGURACIÓN DEL PIPELINE DE MIDDLEWARES
app.UseMiddleware<ExceptionMiddleware>(); // Captura global de excepciones (RFC 7807)
app.UseCors("CorsPolicy");
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

// 3. INICIALIZACIÓN Y AUTO-CURACIÓN INTELIGENTE DE LA BASE DE DATOS
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    try
    {
        var context = services.GetRequiredService<ApplicationDbContext>();
        
        bool requiresRecreation = false;
        try
        {
            // Validar si la tabla y columnas actuales (Brand, CostPrice, MinStock) existen físicamente
            var testProduct = context.Products.FirstOrDefault();
            if (testProduct == null)
            {
                requiresRecreation = true;
            }
        }
        catch
        {
            // Error 42703 (columna inexistente en esquema previo) -> Recrear esquema limpio
            requiresRecreation = true;
        }

        if (requiresRecreation)
        {
            context.Database.EnsureDeleted();
            context.Database.EnsureCreated();
        }
        else
        {
            context.Database.EnsureCreated();
        }

        // Asegurar hashes correctos de usuarios
        var adminUser = context.Users.FirstOrDefault(u => u.Username == "admin");
        if (adminUser != null)
        {
            adminUser.PasswordHash = "JAvlGPq9JyTdtvBO6x2llnRI1+gxwIyPqCKAn3THIKk=";
            context.Users.Update(adminUser);
        }
        var empUser = context.Users.FirstOrDefault(u => u.Username == "empleado");
        if (empUser != null)
        {
            empUser.PasswordHash = "zME+irCBnjq2FxneQHHsrmwdPNNdxIuRytNIHyCSL58=";
            context.Users.Update(empUser);
        }
        context.SaveChanges();
    }
    catch (Exception ex)
    {
        var logger = services.GetRequiredService<ILogger<Program>>();
        logger.LogError(ex, "Error durante la inicialización de la base de datos.");
    }
}

app.Run();
