// ============================================================================
// Asignatura: Desarrollo de Aplicaciones Web (Código: 0423807T)
// Facilitador: M.Sc. Ing. Gabriel Alexis Ramírez Sánchez
// Período Académico: Septiembre, 2026
// San Cristóbal, Estado Táchira, Venezuela
// ============================================================================

using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Core.Application.DTOs;
using Core.Application.Interfaces;
using Core.Domain.Entities;
using Core.Domain.Enums;

namespace Core.Application.Services;

/// <summary>
/// Implementación del servicio de aplicación para autenticación y seguridad de usuarios.
/// </summary>
public class UserService : IUserService
{
    private readonly IRepository<User> _userRepository;
    private readonly ITokenService _tokenService;

    public UserService(IRepository<User> userRepository, ITokenService tokenService)
    {
        _userRepository = userRepository;
        _tokenService = tokenService;
    }

    public async Task<AuthResponseDto?> AuthenticateAsync(LoginDto loginDto)
    {
        // 1. Obtener todos los usuarios y buscar coincidencia por nombre de usuario (ignorando mayúsculas)
        var users = await _userRepository.GetAllAsync();
        var user = users.FirstOrDefault(u => u.Username.Equals(loginDto.Username, StringComparison.OrdinalIgnoreCase));

        if (user == null)
        {
            return null; // Usuario no encontrado
        }

        // 2. Verificar si el hash de la contraseña coincide
        if (!VerifyPasswordHash(loginDto.Password, user.PasswordHash))
        {
            return null; // Contraseña incorrecta
        }

        // 3. Generar Token JWT
        var token = _tokenService.GenerateToken(user);

        // 4. Retornar respuesta estructurada
        return new AuthResponseDto
        {
            Token = token,
            User = new UserDto
            {
                Id = user.Id,
                Username = user.Username,
                Email = user.Email,
                Role = user.Role.ToString()
            }
        };
    }

    public async Task<UserDto?> RegisterAsync(LoginDto registerDto, string email, string role)
    {
        // 1. Validar que el usuario no exista previamente
        var users = await _userRepository.GetAllAsync();
        if (users.Any(u => u.Username.Equals(registerDto.Username, StringComparison.OrdinalIgnoreCase)))
        {
            throw new InvalidOperationException($"El nombre de usuario '{registerDto.Username}' ya está registrado.");
        }

        // 2. Determinar el rol
        if (!Enum.TryParse<UserRole>(role, true, out var userRole))
        {
            userRole = UserRole.Employee; // Rol por defecto
        }

        // 3. Crear entidad e indexar hash de contraseña
        var newUser = new User
        {
            Username = registerDto.Username,
            Email = email,
            PasswordHash = HashPassword(registerDto.Password),
            Role = userRole
        };

        // 4. Persistir en base de datos
        await _userRepository.AddAsync(newUser);
        await _userRepository.SaveChangesAsync();

        return new UserDto
        {
            Id = newUser.Id,
            Username = newUser.Username,
            Email = newUser.Email,
            Role = newUser.Role.ToString()
        };
    }

    /// <summary>
    /// Genera un hash criptográfico SHA256 de la contraseña suministrada.
    /// </summary>
    private static string HashPassword(string password)
    {
        using var sha256 = SHA256.Create();
        var bytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
        return Convert.ToBase64String(bytes);
    }

    /// <summary>
    /// Compara la contraseña en texto plano con el hash guardado.
    /// </summary>
    private static bool VerifyPasswordHash(string password, string storedHash)
    {
        var hashOfInput = HashPassword(password);
        return string.Equals(hashOfInput, storedHash, StringComparison.Ordinal);
    }
}

/*
 * Las credenciales de acceso nunca deben persistirse en texto plano. En esta capa se emplea una función 
 * resumen unidireccional SHA-256 para transformar la clave en una cadena irreversible. En entornos 
 * productivos de alta concurrencia o criticidad se aconseja complementar este esquema con factores de trabajo 
 * adaptativos (como BCrypt, PBKDF2 o Argon2ID) y mecanismos de salting dinámico.
 */
