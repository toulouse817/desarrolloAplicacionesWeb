// ============================================================================
// Asignatura: Desarrollo de Aplicaciones Web (Código: 0423807T)
// Facilitador: M.Sc. Ing. Gabriel Alexis Ramírez Sánchez
// email: gramirezs@unet.edu.ve
// Período Académico: Septiembre, 2026
// San Cristóbal, Estado Táchira, Venezuela
// ============================================================================

import React, { createContext, useState, useEffect } from 'react';
import { api } from '../services/api';

export const AuthContext = createContext(null);

/**
 * Utilidad en JavaScript puro para decodificar el payload de un JWT
 * sin depender de paquetes npm externos.
 */
function parseJwt(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      window.atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
}

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Cargar sesión al iniciar o refrescar la pestaña
  useEffect(() => {
    if (token) {
      const decoded = parseJwt(token);
      if (decoded && decoded.exp * 1000 > Date.now()) {
        // El token sigue siendo válido
        setUser({
          username: decoded.unique_name || decoded.sub,
          email: decoded.email,
          role: decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] || decoded.role
        });
      } else {
        // Expirado o dañado
        logout();
      }
    }
    setLoading(false);
  }, [token]);

  const login = async (username, password) => {
    setLoading(true);
    try {
      const res = await api.post('/auth/login', { username, password });
      localStorage.setItem('token', res.token);
      setToken(res.token);
      
      const decoded = parseJwt(res.token);
      const authenticatedUser = {
        username: res.user.username,
        email: res.user.email,
        role: res.user.role
      };
      
      setUser(authenticatedUser);
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

/*
 * En aplicaciones React SPA, el estado de sesión y los permisos de usuario deben gestionarse 
 * globalmente. El uso de la API Context ('AuthContext') proporciona un contenedor reactivo centralizado. 
 * Al decodificar el JWT del lado del cliente, la interfaz puede adaptar sus elementos visuales y rutas 
 * de manera instantánea, manteniendo sincronizada la experiencia de usuario con las credenciales activas.
 */
