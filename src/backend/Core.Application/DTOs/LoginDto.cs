// ============================================================================
// Asignatura: Desarrollo de Aplicaciones Web (Código: 0423807T)
// Facilitador: M.Sc. Ing. Gabriel Alexis Ramírez Sánchez
// Período Académico: Septiembre, 2026
// San Cristóbal, Estado Táchira, Venezuela
// ============================================================================

namespace Core.Application.DTOs;

/// <summary>
/// DTO de entrada que contiene las credenciales de acceso de un usuario.
/// </summary>
public class LoginDto
{
    public string Username { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
}

/*
 * La autenticación de usuarios es un caso de uso específico que demanda credenciales transitorias. 
 * Definir un DTO dedicado como 'LoginDto' evita exponer la entidad completa 'User', preservando 
 * una alta cohesión, reduciendo el acoplamiento y delimitando estrictamente los datos requeridos 
 * para el inicio de sesión.
 */
