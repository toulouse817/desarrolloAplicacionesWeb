// ============================================================================
// Asignatura: Desarrollo de Aplicaciones Web (Código: 0423807T)
// Facilitador: M.Sc. Ing. Gabriel Alexis Ramírez Sánchez
// email: gramirezs@unet.edu.ve
// Período Académico: Septiembre, 2026
// San Cristóbal, Estado Táchira, Venezuela
// ============================================================================

import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

/// <summary>
/// Componente contenedor que protege rutas e interfaces basadas en la sesión del usuario.
/// </summary>
export const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  // Si no está autenticado
  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-100 p-6 text-center">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md">
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Acceso Denegado</h2>
          <p className="text-slate-600 mb-6">Debe iniciar sesión para ver esta pantalla.</p>
          <span className="text-sm text-slate-400">UNET - Ingeniería Informática</span>
        </div>
      </div>
    );
  }

  // Si se requieren roles específicos y el usuario no cuenta con ellos
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-100 p-6 text-center">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md">
          <h2 className="text-2xl font-bold text-red-600 mb-2">Permisos Insuficientes</h2>
          <p className="text-slate-600 mb-6">Esta funcionalidad requiere un nivel de acceso superior (Admin).</p>
          <span className="text-sm text-slate-400">Consulte al administrador del sistema.</span>
        </div>
      </div>
    );
  }

  return children;
};

/*
 * La protección de rutas en el cliente mejora la experiencia de usuario (UX), adaptando la interfaz 
 * según los privilegios asignados. 'ProtectedRoute' funciona como un interceptor visual. Debe considerarse 
 * que la seguridad en el cliente complementa pero nunca sustituye la autorización en el servidor, 
 * el cual valida rigurosamente los tokens y roles en cada endpoint protegido.
 */
