// ============================================================================
// Asignatura: Desarrollo de Aplicaciones Web (Código: 0423807T)
// Facilitador: M.Sc. Ing. Gabriel Alexis Ramírez Sánchez
// Período Académico: Septiembre, 2026
// San Cristóbal, Estado Táchira, Venezuela
// ============================================================================

namespace Core.Application.DTOs;

/// <summary>
/// DTO de salida que contiene la respuesta de autenticación exitosa.
/// </summary>
public class AuthResponseDto
{
    public string Token { get; set; } = string.Empty;
    public UserDto User { get; set; } = new();
}

/*
 * En la arquitectura web moderna orientada a servicios REST sin estado (Stateless), el servidor no mantiene 
 * sesiones en memoria. Al devolver un JWT firmado a través de 'AuthResponseDto', el cliente asume la 
 * responsabilidad de almacenar el token y remitirlo en la cabecera HTTP 'Authorization: Bearer <token>' 
 * en peticiones subsecuentes. Esto optimiza la escalabilidad horizontal del backend al eliminar la dependencia 
 * de sesiones locales en el servidor.
 */
