// ============================================================================
// Asignatura: Desarrollo de Aplicaciones Web (Código: 0423807T)
// Facilitador: M.Sc. Ing. Gabriel Alexis Ramírez Sánchez
// email: gramirezs@unet.edu.ve
// Período Académico: Septiembre, 2026
// San Cristóbal, Estado Táchira, Venezuela
// ============================================================================

using System;

namespace Core.Application.DTOs;

/// <summary>
/// DTO que representa un usuario autenticado o registrado para el cliente externo.
/// </summary>
public class UserDto
{
    public Guid Id { get; set; }
    public string Username { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Role { get; set; } = string.Empty;
}

/*
 * La entidad 'User' del dominio almacena el 'PasswordHash'. Bajo ninguna circunstancia este hash 
 * debe exponerse al frontend, previniendo riesgos de seguridad y ataques de fuerza bruta fuera de línea. 
 * 'UserDto' expone únicamente la información de identidad requerida (Id, Username, Email, Role), 
 * garantizando que los datos confidenciales permanezcan estrictamente en el backend.
 */
