// ============================================================================
// Asignatura: Desarrollo de Aplicaciones Web (Código: 0423807T)
// Facilitador: M.Sc. Ing. Gabriel Alexis Ramírez Sánchez
// email: gramirezs@unet.edu.ve
// Período Académico: Septiembre, 2026
// San Cristóbal, Estado Táchira, Venezuela
// ============================================================================

using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Extensions.Configuration;
using Core.Application.Interfaces;
using Core.Domain.Entities;

namespace Presentation.API.Services;

/// <summary>
/// Implementación encargada de generar tokens JWT firmados digitalmente.
/// </summary>
public class TokenService : ITokenService
{
    private readonly IConfiguration _configuration;

    public TokenService(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public string GenerateToken(User user)
    {
        // 1. Obtener valores de configuración
        var jwtSettings = _configuration.GetSection("JwtSettings");
        var secretKey = jwtSettings["Key"] ?? throw new InvalidOperationException("La clave secreta JWT no está configurada.");
        var issuer = jwtSettings["Issuer"] ?? "InventorySystemAPI";
        var audience = jwtSettings["Audience"] ?? "InventorySystemFrontend";
        var durationMinutes = double.Parse(jwtSettings["DurationInMinutes"] ?? "60");

        // 2. Definir los Claims (declaraciones) que viajarán en el Payload del token
        var claims = new[]
        {
            new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
            new Claim(JwtRegisteredClaimNames.UniqueName, user.Username),
            new Claim(JwtRegisteredClaimNames.Email, user.Email),
            new Claim(ClaimTypes.Role, user.Role.ToString()), // Requerido para la directiva [Authorize(Roles = "...")]
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
        };

        // 3. Crear la firma criptográfica (Clave Simétrica y Algoritmo HS256)
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        // 4. Crear los metadatos y cuerpo del Token
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(claims),
            Expires = DateTime.UtcNow.AddMinutes(durationMinutes),
            Issuer = issuer,
            Audience = audience,
            SigningCredentials = creds
        };

        // 5. Instanciar el serializador y generar el string compacto del token
        var tokenHandler = new JwtSecurityTokenHandler();
        var token = tokenHandler.CreateToken(tokenDescriptor);

        return tokenHandler.WriteToken(token);
    }
}

/*
 * Un JSON Web Token (JWT) se compone de encabezado (algoritmo), carga útil (claims del usuario) y firma digital. 
 * El uso del algoritmo simétrico HmacSha256 garantiza la autenticidad e integridad del token: las aplicaciones 
 * cliente pueden inspeccionar los reclamos (como el identificador o el rol), pero cualquier alteración en el 
 * contenido invalida la firma criptográfica, siendo rechazada de inmediato por el servidor.
 */
