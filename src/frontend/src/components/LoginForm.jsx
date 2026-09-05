// ============================================================================
// Asignatura: Desarrollo de Aplicaciones Web (Código: 0423807T)
// Facilitador: M.Sc. Ing. Gabriel Alexis Ramírez Sánchez
// email: gramirezs@unet.edu.ve
// Período Académico: Septiembre, 2026
// San Cristóbal, Estado Táchira, Venezuela
// ============================================================================

import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';
import { Lock, User, AlertCircle, Sparkles, Sun, Moon, ArrowRight } from 'lucide-react';

/**
 * Vista de autenticación institucional del sistema de inventario.
 * Gestiona la captura de credenciales (JWT), validación asíncrona contra la API REST,
 * alternancia de modo oscuro/claro y despliegue de animaciones de fondo y micro-interacciones.
 */
export const LoginForm = () => {
  // Contexto de autenticación para invocar la mutación de inicio de sesión
  const { login } = useContext(AuthContext);

  // Contexto de tema para detectar modo oscuro y conmutar paleta visual
  const { isDark, toggleTheme } = useContext(ThemeContext);

  // Estados locales para captura de credenciales y retroalimentación de interfaz
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  /**
   * Controlador de envío del formulario de inicio de sesión.
   * Envía las credenciales ingresadas hacia el backend y maneja posibles excepciones.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Envío de credenciales hacia el servicio de autenticación
      await login(username, password);
    } catch (err) {
      // Despliegue de mensaje de error descriptivo en caso de fallo
      setError(err.message || 'Credenciales inválidas. Verifique su usuario y contraseña.');
    } finally {
      // Restablecimiento del estado de carga al concluir la petición
      setLoading(false);
    }
  };

  /**
   * Función auxiliar para poblar rápidamente credenciales predeterminadas de prueba
   */
  const handleQuickFill = (userType) => {
    if (userType === 'admin') {
      setUsername('admin');
      setPassword('admin123');
    } else {
      setUsername('empleado');
      setPassword('empleado123');
    }
  };

  return (
    // Contenedor principal con fondo degradado y orbes flotantes
    <div className="min-h-screen bg-gradient-to-br from-unet-950 via-unet-900 to-slate-950 flex items-center justify-center p-4 relative overflow-hidden transition-colors">
      
      {/* Botón flotante para alternar entre Modo Claro y Modo Oscuro */}
      <div className="absolute top-6 right-6 z-20">
        <button
          onClick={toggleTheme}
          className="p-2.5 bg-white/10 backdrop-blur-md hover:bg-white/20 border border-white/20 rounded-2xl text-white transition-all duration-300 hover:scale-110 active:scale-95 shadow-lg"
          title={isDark ? 'Modo Claro' : 'Modo Oscuro'}
        >
          {isDark ? (
            <Sun className="h-5 w-5 text-amber-300 transform transition-transform duration-500 hover:rotate-90" />
          ) : (
            <Moon className="h-5 w-5 text-cyan-200 transform transition-transform duration-500 hover:-rotate-45" />
          )}
        </button>
      </div>

      {/* Orbes de luz ambiental animados en segundo plano */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none animate-float-slow"></div>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-unet-600/30 rounded-full blur-3xl pointer-events-none animate-float-reverse"></div>
      <div className="absolute top-1/2 left-1/4 w-80 h-80 bg-blue-500/15 rounded-full blur-3xl pointer-events-none animate-float-delayed"></div>
      <div className="absolute -top-10 right-1/3 w-72 h-72 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none animate-pulse-glow"></div>

      {/* Tarjeta de Autenticación con efecto Glassmorphism y animación de entrada */}
      <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl max-w-md w-full rounded-3xl shadow-2xl border border-slate-200/80 dark:border-slate-800 p-8 relative z-10 animate-fade-in-up transition-all duration-300 hover:shadow-cyan-950/20">
        
        {/* Encabezado con Logo Institucional adaptativo según el tema activo */}
        <div className="text-center mb-6">
          <div className="inline-flex p-3.5 bg-white dark:bg-slate-800 rounded-3xl shadow-md border border-slate-100 dark:border-slate-700/80 mb-4 transition-transform duration-300 hover:scale-105">
            <img 
              // En modo oscuro se proyecta el imagotipo blanco (/unet-logo-dark.png) y en modo claro el logo original (/unet-logo.png)
              src={isDark ? "/unet-logo-dark.png" : "/unet-logo.png"} 
              alt="Logo UNET" 
              className="h-16 w-auto object-contain mx-auto transition-opacity duration-300"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
          </div>
          <h2 className="text-2xl font-black text-slate-800 dark:text-white tracking-tight">
            Universidad Nacional Experimental del Táchira
          </h2>
          <p className="text-xs font-semibold text-unet-800 dark:text-unet-300 uppercase tracking-wider mt-1">
            Sistema de Gestión de Inventario ERP
          </p>
          <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">
            Asignatura: Desarrollo de Aplicaciones Web (0423807T)
          </p>
        </div>

        {/* Notificación de Error en caso de credenciales erróneas */}
        {error && (
          <div className="mb-5 p-3.5 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/80 rounded-2xl text-rose-800 dark:text-rose-300 text-xs font-semibold flex items-center space-x-2 animate-fadeIn">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Formulario de Captura de Credenciales */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Campo de Nombre de Usuario */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wider">
              Nombre de Usuario
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-unet-600 dark:group-focus-within:text-unet-400 transition-colors">
                <User className="h-4 w-4" />
              </div>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-3 py-2.5 text-xs bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-4 focus:ring-unet-600/20 focus:border-unet-600 dark:focus:border-unet-400 focus:outline-none text-slate-800 dark:text-white transition-all duration-200"
                placeholder="Ingrese su usuario (ej. admin)"
              />
            </div>
          </div>

          {/* Campo de Contraseña de Acceso */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wider">
              Contraseña de Acceso
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-unet-600 dark:group-focus-within:text-unet-400 transition-colors">
                <Lock className="h-4 w-4" />
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-3 py-2.5 text-xs bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-4 focus:ring-unet-600/20 focus:border-unet-600 dark:focus:border-unet-400 focus:outline-none text-slate-800 dark:text-white transition-all duration-200"
                placeholder="••••••••"
              />
            </div>
          </div>

          {/* Botón de Envío con Efecto Shimmer (destello diagonal) e interacción reactiva */}
          <button
            type="submit"
            disabled={loading}
            className="group relative overflow-hidden w-full mt-2 flex items-center justify-center space-x-2 py-3 px-4 bg-gradient-to-r from-unet-900 via-unet-800 to-unet-700 hover:from-unet-950 hover:to-unet-800 text-white rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg shadow-unet-900/30 hover:shadow-unet-800/40 hover:-translate-y-0.5 active:translate-y-0 active:scale-98 transition-all duration-200 disabled:opacity-50"
          >
            {/* Destello de luz diagonal reflectivo */}
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none"></span>

            <span className="relative z-10">{loading ? 'Validando Credenciales...' : 'Iniciar Sesión en el Sistema'}</span>
            <ArrowRight className="h-4 w-4 relative z-10 transform group-hover:translate-x-1 transition-transform duration-200" />
          </button>
        </form>

        {/* Sección de Credenciales Sembradas de Prueba Rápida */}
        <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Credenciales Sembradas para Pruebas:
            </span>
            <Sparkles className="h-3.5 w-3.5 text-unet-600 dark:text-unet-400 animate-pulse" />
          </div>
          <div className="grid grid-cols-2 gap-2">
            {/* Botón de Autocompletado para Rol Administrador */}
            <button
              type="button"
              onClick={() => handleQuickFill('admin')}
              className="p-2.5 bg-slate-50 dark:bg-slate-800/60 hover:bg-unet-50 dark:hover:bg-unet-950/60 border border-slate-200 dark:border-slate-700 rounded-xl text-left transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] hover:border-unet-300 dark:hover:border-unet-700 shadow-sm"
            >
              <p className="text-[10px] font-bold text-unet-800 dark:text-unet-300">Rol Administrador</p>
              <p className="text-[9px] text-slate-500 dark:text-slate-400">admin / admin123</p>
            </button>
            {/* Botón de Autocompletado para Rol Empleado */}
            <button
              type="button"
              onClick={() => handleQuickFill('empleado')}
              className="p-2.5 bg-slate-50 dark:bg-slate-800/60 hover:bg-unet-50 dark:hover:bg-unet-950/60 border border-slate-200 dark:border-slate-700 rounded-xl text-left transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] hover:border-unet-300 dark:hover:border-unet-700 shadow-sm"
            >
              <p className="text-[10px] font-bold text-slate-700 dark:text-slate-300">Rol Empleado</p>
              <p className="text-[9px] text-slate-500 dark:text-slate-400">empleado / empleado123</p>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
