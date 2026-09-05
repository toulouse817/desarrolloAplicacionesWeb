// ============================================================================
// Asignatura: Desarrollo de Aplicaciones Web (Código: 0423807T)
// Facilitador: M.Sc. Ing. Gabriel Alexis Ramírez Sánchez
// Período Académico: Septiembre, 2026
// San Cristóbal, Estado Táchira, Venezuela
// ============================================================================

namespace Core.Domain.Enums;

/// <summary>
/// Roles de usuario permitidos dentro del sistema de inventario.
/// </summary>
public enum UserRole
{
    /// <summary>
    /// Rol de administrador. Tiene acceso total al sistema (CRUD de productos, categorías y gestión de usuarios).
    /// </summary>
    Admin = 1,

    /// <summary>
    /// Rol de empleado. Puede consultar y actualizar inventario, pero no administrar usuarios ni eliminar registros sensibles.
    /// </summary>
    Employee = 2
}

/*
 * El uso de enumeraciones fuertemente tipadas en la capa de Dominio previene el antipatrón 'Primitive Obsession'. 
 * Al restringir los roles a valores discretos validados por el compilador, se evitan errores de tipeo y 
 * se garantiza que los mecanismos de autorización RBAC (Role-Based Access Control) operen sobre un conjunto 
 * finito y controlado de privilegios de negocio.
 */
