// ============================================================================
// Asignatura: Desarrollo de Aplicaciones Web (Código: 0423807T)
// Facilitador: M.Sc. Ing. Gabriel Alexis Ramírez Sánchez
// Período Académico: Septiembre, 2026
// San Cristóbal, Estado Táchira, Venezuela
// ============================================================================

using System;
using Core.Domain.Enums;

namespace Core.Domain.Entities;

/// <summary>
/// Representa un usuario dentro del sistema, utilizado para autenticación y autorización.
/// </summary>
public class User : BaseEntity
{
    /// <summary>
    /// Nombre de usuario único para inicio de sesión.
    /// </summary>
    public string Username { get; set; } = string.Empty;

    /// <summary>
    /// Correo electrónico institucional o personal del usuario.
    /// </summary>
    public string Email { get; set; } = string.Empty;

    /// <summary>
    /// Contraseña cifrada en hash. Nunca debe guardarse en texto plano.
    /// </summary>
    public string PasswordHash { get; set; } = string.Empty;

    /// <summary>
    /// Rol asignado al usuario para control de acceso basado en roles.
    /// </summary>
    public UserRole Role { get; set; } = UserRole.Employee;
}

/*
 * Las entidades de dominio modelan los conceptos fundamentales de la aplicación. En el ámbito de la 
 * seguridad informática y en concordancia con los estándares OWASP, es imperativo estructurar los datos 
 * de acceso aplicando el principio de seguridad por diseño. Almacenar exclusivamente un hash criptográfico 
 * ('PasswordHash') previene la exposición de contraseñas en texto claro ante eventuales brechas de datos. 
 * El dominio delega el cálculo del hash a las capas superiores, estableciendo la regla inquebrantable de 
 * que el sistema solo almacena claves procesadas criptográficamente.
 */
