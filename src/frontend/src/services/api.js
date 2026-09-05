// ============================================================================
// Asignatura: Desarrollo de Aplicaciones Web (Código: 0423807T)
// Facilitador: M.Sc. Ing. Gabriel Alexis Ramírez Sánchez
// email: gramirezs@unet.edu.ve
// Período Académico: Septiembre, 2026
// San Cristóbal, Estado Táchira, Venezuela
// ============================================================================

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * Cliente HTTP genérico basado en la API nativa Fetch.
 * Intercepta peticiones para adjuntar el token JWT e interpreta respuestas de error RFC 7807.
 */
async function request(path, options = {}) {
  const token = localStorage.getItem('token');
  
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
  });

  // Manejo de códigos de estado de error (4xx y 5xx)
  if (!response.ok) {
    let errorMessage = 'Ocurrió un error inesperado.';
    try {
      const errData = await response.json();
      // Interpretar formato de error estándar de ASP.NET / RFC 7807 (detail o message)
      errorMessage = errData.detail || errData.message || errorMessage;
    } catch {
      // Capturar errores si el cuerpo no es JSON plano
    }
    throw new Error(errorMessage);
  }

  // Respuestas vacías exitosas (ej. 204 No Content)
  if (response.status === 204) {
    return null;
  }

  return response.json();
}

export const api = {
  get: (path) => request(path, { method: 'GET' }),
  post: (path, body) => request(path, { method: 'POST', body: JSON.stringify(body) }),
  put: (path, body) => request(path, { method: 'PUT', body: JSON.stringify(body) }),
  delete: (path) => request(path, { method: 'DELETE' }),
};

/*
 * La centralización de las llamadas HTTP en un módulo de servicio encapsula la inyección del token JWT 
 * en la cabecera 'Authorization: Bearer <token>' y estandariza la deserialización de errores bajo la norma 
 * RFC 7807 (Problem Details). Esto evita duplicación de código en los componentes visuales y garantiza una 
 * gestión consistente de respuestas del servidor.
 */
