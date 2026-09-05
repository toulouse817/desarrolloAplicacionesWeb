// ============================================================================
// Asignatura: Desarrollo de Aplicaciones Web (Código: 0423807T)
// Facilitador: M.Sc. Ing. Gabriel Alexis Ramírez Sánchez
// email: gramirezs@unet.edu.ve
// Período Académico: Septiembre, 2026
// San Cristóbal, Estado Táchira, Venezuela
// ============================================================================

using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Core.Application.DTOs;
using Core.Application.Interfaces;

namespace Presentation.API.Controllers;

/// <summary>
/// Gestiona los endpoints de autenticación y registro de usuarios.
/// </summary>
public class AuthController : ApiControllerBase
{
    private readonly IUserService _userService;

    public AuthController(IUserService userService)
    {
        _userService = userService;
    }

    /// <summary>
    /// Endpoint para iniciar sesión en la aplicación.
    /// Retorna un token JWT y los datos del usuario si las credenciales son válidas.
    /// </summary>
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
    {
        var response = await _userService.AuthenticateAsync(loginDto);
        if (response == null)
        {
            return Unauthorized(new { message = "Nombre de usuario o contraseña incorrectos." });
        }

        return Ok(response);
    }

    /// <summary>
    /// Endpoint para registrar un nuevo usuario.
    /// </summary>
    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterRequest request)
    {
        var userDto = await _userService.RegisterAsync(
            new LoginDto { Username = request.Username, Password = request.Password },
            request.Email,
            request.Role
        );

        if (userDto == null)
        {
            return BadRequest(new { message = "No se pudo registrar el usuario." });
        }

        return Ok(userDto);
    }
}

/// <summary>
/// Modelo de solicitud para el registro de usuarios.
/// </summary>
public class RegisterRequest
{
    public string Username { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
    public string Role { get; set; } = string.Empty;
}

/*
 * Los controladores de la API deben estructurarse de manera ligera (Thin Controllers), limitándose a 
 * recibir la petición HTTP, deserializar el cuerpo, invocar el caso de uso respectivo en la capa de servicio 
 * y retornar la respuesta con el código de estado HTTP pertinente (200 OK, 401 Unauthorized, 400 BadRequest). 
 * Esta separación garantiza que la lógica de negocio y las operaciones de seguridad no queden acopladas al protocolo web.
 */
