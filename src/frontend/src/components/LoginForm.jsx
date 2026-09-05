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

export const LoginForm = () => {
  const { login } = useContext(AuthContext);
  const { isDark, toggleTheme } = useContext(ThemeContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(username, password);
    } catch (err) {
      setError(err.message || 'Credenciales inválidas. Verifique su usuario y contraseña.');
    } finally {
      setLoading(false);
    }
  };

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
    <div className="min-h-screen bg-gradient-to-br from-unet-900 via-unet-800 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden transition-colors">
      
      {/* Botón de tema en la esquina superior */}
      <div className="absolute top-6 right-6 z-20">
        <button
          onClick={toggleTheme}
          className="p-2.5 bg-white/10 backdrop-blur-md hover:bg-white/20 border border-white/20 rounded-2xl text-white transition-colors"
          title={isDark ? 'Modo Claro' : 'Modo Oscuro'}
        >
          {isDark ? <Sun className="h-5 w-5 text-amber-300" /> : <Moon className="h-5 w-5 text-cyan-200" />}
        </button>
      </div>

      {/* Efectos de fondo decorativos */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-unet-600/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="bg-white dark:bg-slate-900 max-w-md w-full rounded-3xl shadow-2xl border border-slate-200/80 dark:border-slate-800 p-8 relative z-10">
        
        {/* Encabezado con Logo UNET */}
        <div className="text-center mb-6">
          <div className="inline-flex p-3 bg-white dark:bg-slate-800 rounded-3xl shadow-md border border-slate-100 dark:border-slate-700 mb-4">
            <img 
              src="/unet-logo.png" 
              alt="Logo UNET" 
              className="h-16 w-auto object-contain mx-auto"
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

        {/* Mensaje de Error */}
        {error && (
          <div className="mb-5 p-3.5 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/80 rounded-2xl text-rose-800 dark:text-rose-300 text-xs font-semibold flex items-center space-x-2 animate-fadeIn">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wider">
              Nombre de Usuario
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <User className="h-4 w-4" />
              </div>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-3 py-2.5 text-xs bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-unet-600 focus:outline-none text-slate-800 dark:text-white"
                placeholder="Ingrese su usuario (ej. admin)"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wider">
              Contraseña de Acceso
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Lock className="h-4 w-4" />
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-3 py-2.5 text-xs bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-unet-600 focus:outline-none text-slate-800 dark:text-white"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 flex items-center justify-center space-x-2 py-3 px-4 bg-gradient-to-r from-unet-900 via-unet-800 to-unet-700 hover:from-unet-950 hover:to-unet-800 text-white rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg shadow-unet-900/30 transition-all transform active:scale-98 disabled:opacity-50"
          >
            <span>{loading ? 'Validando Credenciales...' : 'Iniciar Sesión en el Sistema'}</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>

        {/* Cajas de Autocompletado de Prueba */}
        <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Credenciales Sembradas para Pruebas:
            </span>
            <Sparkles className="h-3.5 w-3.5 text-unet-600 dark:text-unet-400" />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleQuickFill('admin')}
              className="p-2 bg-slate-50 dark:bg-slate-800/60 hover:bg-unet-50 dark:hover:bg-unet-950/60 border border-slate-200 dark:border-slate-700 rounded-xl text-left transition-colors"
            >
              <p className="text-[10px] font-bold text-unet-800 dark:text-unet-300">Rol Administrador</p>
              <p className="text-[9px] text-slate-500 dark:text-slate-400">admin / admin123</p>
            </button>
            <button
              type="button"
              onClick={() => handleQuickFill('empleado')}
              className="p-2 bg-slate-50 dark:bg-slate-800/60 hover:bg-unet-50 dark:hover:bg-unet-950/60 border border-slate-200 dark:border-slate-700 rounded-xl text-left transition-colors"
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
