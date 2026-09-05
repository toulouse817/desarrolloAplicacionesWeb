// ============================================================================
// Asignatura: Desarrollo de Aplicaciones Web (CÃ³digo: 0423807T)
// Facilitador: M.Sc. Ing. Gabriel Alexis RamÃ­rez SÃ¡nchez
// email: gramirezs@unet.edu.ve
// PerÃ­odo AcadÃ©mico: Septiembre, 2026
// San CristÃ³bal, Estado TÃ¡chira, Venezuela
// ============================================================================

using System;
using System.Collections.Generic;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Core.Application.DTOs;
using Core.Application.Interfaces;
using Core.Application.Services;
using Core.Domain.Entities;
using Core.Domain.Enums;
using FluentAssertions;
using Moq;
using Xunit;

namespace Core.Application.Tests.Services;

/// <summary>
/// Pruebas unitarias de autenticaciÃ³n y verificaciÃ³n criptogrÃ¡fica en UserService.
/// Comprueba emisiÃ³n de tokens JWT, validaciÃ³n de contraseÃ±as con hash SHA-256 y control de acceso RBAC.
/// </summary>
public class UserServiceTests
{
    private readonly Mock<IRepository<User>> _userRepositoryMock;
    private readonly Mock<ITokenService> _tokenServiceMock;
    private readonly UserService _userService;

    public UserServiceTests()
    {
        _userRepositoryMock = new Mock<IRepository<User>>();
        _tokenServiceMock = new Mock<ITokenService>();

        _userService = new UserService(
            _userRepositoryMock.Object,
            _tokenServiceMock.Object
        );
    }

    private static string HashPassword(string password)
    {
        using var sha256 = SHA256.Create();
        var bytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
        return Convert.ToBase64String(bytes);
    }

    [Fact]
    public async Task AuthenticateAsync_DeberiaRetornarNull_CuandoUsuarioNoExiste()
    {
        // Arrange
        _userRepositoryMock
            .Setup(r => r.GetAllAsync())
            .ReturnsAsync(new List<User>());

        var loginDto = new LoginDto { Username = "usuario_inexistente", Password = "password123" };

        // Act
        var resultado = await _userService.AuthenticateAsync(loginDto);

        // Assert
        resultado.Should().BeNull();
    }

    [Fact]
    public async Task AuthenticateAsync_DeberiaRetornarNull_CuandoContrasenaEsIncorrecta()
    {
        // Arrange
        var user = new User
        {
            Id = Guid.NewGuid(),
            Username = "admin",
            PasswordHash = HashPassword("admin123"),
            Role = UserRole.Admin,
            Email = "admin@unet.edu.ve"
        };

        _userRepositoryMock
            .Setup(r => r.GetAllAsync())
            .ReturnsAsync(new List<User> { user });

        var loginDto = new LoginDto { Username = "admin", Password = "contrasena_erronea" };

        // Act
        var resultado = await _userService.AuthenticateAsync(loginDto);

        // Assert
        resultado.Should().BeNull();
    }

    [Fact]
    public async Task AuthenticateAsync_DeberiaRetornarTokenYUsuario_CuandoCredencialesSonCorrectas()
    {
        // Arrange
        var user = new User
        {
            Id = Guid.NewGuid(),
            Username = "admin",
            PasswordHash = HashPassword("admin123"),
            Role = UserRole.Admin,
            Email = "admin@unet.edu.ve"
        };

        _userRepositoryMock
            .Setup(r => r.GetAllAsync())
            .ReturnsAsync(new List<User> { user });

        _tokenServiceMock
            .Setup(t => t.GenerateToken(user))
            .Returns("token.jwt.simulado");

        var loginDto = new LoginDto { Username = "admin", Password = "admin123" };

        // Act
        var resultado = await _userService.AuthenticateAsync(loginDto);

        // Assert
        resultado.Should().NotBeNull();
        resultado!.Token.Should().Be("token.jwt.simulado");
        resultado.User.Username.Should().Be("admin");
        resultado.User.Role.Should().Be("Admin");
        resultado.User.Email.Should().Be("admin@unet.edu.ve");
    }
}