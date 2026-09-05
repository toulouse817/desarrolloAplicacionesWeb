// ============================================================================
// Asignatura: Desarrollo de Aplicaciones Web (Código: 0423807T)
// Facilitador: M.Sc. Ing. Gabriel Alexis Ramírez Sánchez
// Período Académico: Septiembre, 2026
// San Cristóbal, Estado Táchira, Venezuela
// ============================================================================

using System.Threading.Tasks;
using Core.Application.DTOs;

namespace Core.Application.Interfaces;

/// <summary>
/// Contrato para el servicio de aplicación que gestiona usuarios y seguridad (Autenticación y Registro).
/// </summary>
public interface IUserService
{
    /// <summary>
    /// Valida las credenciales de inicio de sesión y devuelve un token JWT si es exitoso.
    /// </summary>
    Task<AuthResponseDto?> AuthenticateAsync(LoginDto loginDto);

    /// <summary>
    /// Registra un nuevo usuario en la base de datos con contraseña cifrada en hash.
    /// </summary>
    Task<UserDto?> RegisterAsync(LoginDto registerDto, string email, string role);
}

/*
 * La gestión de identidades y acceso (IAM) representa una preocupación central del sistema. 
 * 'IUserService' define las reglas del proceso de autenticación y registro. Modelar estas operaciones 
 * bajo una interfaz de aplicación permite cambiar o extender el mecanismo de persistencia y verificación 
 * de credenciales sin afectar las capas de presentación ni de dominio.
 */
