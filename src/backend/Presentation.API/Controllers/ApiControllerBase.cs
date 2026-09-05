// ============================================================================
// Asignatura: Desarrollo de Aplicaciones Web (Código: 0423807T)
// Facilitador: M.Sc. Ing. Gabriel Alexis Ramírez Sánchez
// Período Académico: Septiembre, 2026
// San Cristóbal, Estado Táchira, Venezuela
// ============================================================================

using Microsoft.AspNetCore.Mvc;

namespace Presentation.API.Controllers;

/// <summary>
/// Controlador base para todos los endpoints de la API.
/// Centraliza la configuración de rutas y comportamiento del controlador.
/// </summary>
[ApiController]
[Route("api/[controller]")]
public abstract class ApiControllerBase : ControllerBase
{
}

/*
 * Un controlador base unifica las convenciones de enrutamiento y comportamiento de la API REST. Al anotar la 
 * clase con [ApiController], ASP.NET habilita automáticamente la inferencia de parámetros de enlace y la 
 * validación automática de modelos (ModelState), respondiendo con HTTP 400 Bad Request si un DTO no satisface 
 * las reglas de validación declaradas, antes de ingresar al método del controlador.
 */
