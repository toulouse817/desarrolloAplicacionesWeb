// ============================================================================
// Asignatura: Desarrollo de Aplicaciones Web (Código: 0423807T)
// Facilitador: M.Sc. Ing. Gabriel Alexis Ramírez Sánchez
// Período Académico: Septiembre, 2026
// San Cristóbal, Estado Táchira, Venezuela
// ============================================================================

using System;
using System.Collections.Generic;
using System.Net;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Presentation.API.Middleware;

/// <summary>
/// Middleware global para capturar excepciones no manejadas y formatear la salida bajo la norma RFC 7807 (Problem Details).
/// </summary>
public class ExceptionMiddleware
{
    private readonly RequestDelegate _next;

    public ExceptionMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (Exception ex)
        {
            await HandleExceptionAsync(context, ex);
        }
    }

    private static Task HandleExceptionAsync(HttpContext context, Exception exception)
    {
        context.Response.ContentType = "application/problem+json";

        var status = HttpStatusCode.InternalServerError;
        var title = "Ocurrió un error inesperado en el servidor.";
        var detail = exception.Message;

        // Mapear tipos de excepciones de negocio a códigos de estado HTTP correctos
        switch (exception)
        {
            case KeyNotFoundException:
                status = HttpStatusCode.NotFound;
                title = "Recurso no encontrado.";
                break;

            case InvalidOperationException:
                status = HttpStatusCode.BadRequest;
                title = "Operación de negocio inválida.";
                break;

            case UnauthorizedAccessException:
                status = HttpStatusCode.Unauthorized;
                title = "Acceso no autorizado.";
                break;
        }

        context.Response.StatusCode = (int)status;

        // Estructura oficial según RFC 7807
        var problemDetails = new ProblemDetails
        {
            Type = $"https://httpstatuses.com/{(int)status}",
            Title = title,
            Status = (int)status,
            Detail = detail,
            Instance = context.Request.Path
        };

        var options = new JsonSerializerOptions
        {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase
        };

        var json = JsonSerializer.Serialize(problemDetails, options);
        return context.Response.WriteAsync(json);
    }
}

/*
 * El manejo centralizado de excepciones mediante middleware evita la proliferación de bloques try-catch 
 * dispersos en los controladores. Al capturar cualquier error no controlado en la canalización (Pipeline) 
 * de ASP.NET Core, el middleware serializa la respuesta bajo el estándar RFC 7807 (Problem Details), 
 * proporcionando al cliente un esquema de error predecible y uniforme.
 */
