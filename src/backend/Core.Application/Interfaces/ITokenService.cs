// ============================================================================
// Asignatura: Desarrollo de Aplicaciones Web (Código: 0423807T)
// Facilitador: M.Sc. Ing. Gabriel Alexis Ramírez Sánchez
// email: gramirezs@unet.edu.ve
// Período Académico: Septiembre, 2026
// San Cristóbal, Estado Táchira, Venezuela
// ============================================================================

using Core.Domain.Entities;

namespace Core.Application.Interfaces;

/// <summary>
/// Contrato para el servicio encargado de la emisión de tokens de seguridad (JWT).
/// </summary>
public interface ITokenService
{
    /// <summary>
    /// Genera un token JWT firmado digitalmente para el usuario autenticado.
    /// </summary>
    string GenerateToken(User user);
}

/*
 * La emisión y firma de un token JWT involucra detalles de infraestructura técnica como claves simétricas, 
 * algoritmos criptográficos (HS256) y tiempos de expiración. Al declarar 'ITokenService' en la capa de 
 * Aplicación, la lógica de negocio permanece completamente desacoplada de paquetes externos de identidad y 
 * tokens, interactuando únicamente con el contrato abstracto.
 */
