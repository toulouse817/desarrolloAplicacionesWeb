// ============================================================================
// Asignatura: Desarrollo de Aplicaciones Web (Código: 0423807T)
// Facilitador: M.Sc. Ing. Gabriel Alexis Ramírez Sánchez
// email: gramirezs@unet.edu.ve
// Período Académico: Septiembre, 2026
// San Cristóbal, Estado Táchira, Venezuela
// ============================================================================

import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';
import { 
  LogOut, 
  ShieldCheck, 
  User as UserIcon, 
  Sun, 
  Moon, 
  BarChart3, 
  Package, 
  Layers 
} from 'lucide-react';

/**
 * Componente de barra de navegación principal institucional.
 * Proporciona acceso a las vistas autorizadas según el rol de usuario (Admin/Empleado),
 * conmutador de modo claro/oscuro, visualización de identidad y botón de desconexión.
 */
export const Navbar = ({ activeTab, setActiveTab, onOpenCategoryManager }) => {
  // Consumo del contexto de autenticación para obtener datos del usuario y método de desconexión
  const { user, logout } = useContext(AuthContext);

  // Consumo del contexto de tema para conocer el modo activo y alternar estilos
  const { isDark, toggleTheme } = useContext(ThemeContext);

  return (
    // Encabezado fijado en la parte superior con soporte de tema claro y oscuro
    <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-40 shadow-sm transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Logo UNET & Título del Sistema */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab(user?.role === 'Admin' ? 'dashboard' : 'products')}>
            {/* Contenedor del logo con fondo adaptativo */}
            <div className="bg-white dark:bg-slate-800 p-1 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 flex items-center justify-center">
              <img 
                // En modo oscuro se proyecta el imagotipo blanco (/unet-logo-dark.png) y en modo claro el logo original (/unet-logo.png)
                src={isDark ? "/unet-logo-dark.png" : "/unet-logo.png"} 
                alt="Logo UNET" 
                className="h-9 w-auto object-contain"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
            {/* Títulos y metadatos académicos institucionales */}
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-black text-base sm:text-lg tracking-tight text-unet-900 dark:text-unet-300">
                  UNET
                </span>
                <span className="text-slate-400 dark:text-slate-500 font-light">|</span>
                <span className="font-bold text-sm sm:text-base text-slate-800 dark:text-white">
                  Inventario ERP
                </span>
              </div>
              <p className="text-[10px] text-slate-400 dark:text-slate-400 font-medium hidden sm:block">
                Dpto. Informática • Desarrollo de Aplicaciones Web (0423807T)
              </p>
            </div>
          </div>

          {/* Botones de Navegación entre Vistas para pantallas medianas y grandes */}
          <nav className="hidden md:flex items-center space-x-1 bg-slate-100 dark:bg-slate-800/90 p-1 rounded-2xl border border-slate-200 dark:border-slate-700/60">
            {/* Pestaña de Indicadores KPI exclusiva para rol Administrador */}
            {user?.role === 'Admin' && (
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 ${
                  activeTab === 'dashboard'
                    ? 'bg-unet-900 text-white shadow-md shadow-unet-900/20'
                    : 'text-slate-600 dark:text-slate-300 hover:text-unet-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-700/50'
                }`}
              >
                <BarChart3 className="h-4 w-4" />
                <span>Indicadores KPI</span>
              </button>
            )}

            {/* Pestaña de Catálogo de Productos accesible para todos los roles */}
            <button
              onClick={() => setActiveTab('products')}
              className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 ${
                activeTab === 'products'
                  ? 'bg-unet-900 text-white shadow-md shadow-unet-900/20'
                  : 'text-slate-600 dark:text-slate-300 hover:text-unet-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-700/50'
              }`}
            >
              <Package className="h-4 w-4" />
              <span>Catálogo</span>
            </button>

            {/* Botón de Gestión de Categorías para Administradores */}
            {user?.role === 'Admin' && (
              <button
                onClick={onOpenCategoryManager}
                className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-unet-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-700/50 transition-colors"
              >
                <Layers className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
                <span>Categorías</span>
              </button>
            )}
          </nav>

          {/* Controles de Usuario y Tema Oscuro/Claro */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            
            {/* Botón Switch Modo Oscuro / Claro con rotación animada */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-all duration-200 hover:scale-110 active:scale-95 shadow-xs"
              title={isDark ? 'Cambiar a Modo Claro' : 'Cambiar a Modo Oscuro'}
            >
              {isDark ? (
                <Sun className="h-4 w-4 text-amber-400 hover:rotate-90 transition-transform duration-300" />
              ) : (
                <Moon className="h-4 w-4 text-unet-800 hover:-rotate-45 transition-transform duration-300" />
              )}
            </button>

            {/* Credenciales e Identificación del Usuario en Sesión */}
            <div className="hidden sm:flex items-center space-x-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 px-3 py-1.5 rounded-xl">
              <div className="p-1 bg-unet-100 dark:bg-unet-950 text-unet-800 dark:text-unet-300 rounded-lg">
                <UserIcon className="h-3.5 w-3.5" />
              </div>
              <div className="text-left">
                <p className="text-xs font-bold text-slate-800 dark:text-white leading-none">
                  {user?.username}
                </p>
                <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded-full inline-block mt-0.5 ${
                  user?.role === 'Admin' 
                    ? 'bg-rose-100 dark:bg-rose-950/80 text-rose-700 dark:text-rose-300' 
                    : 'bg-unet-100 dark:bg-unet-950/80 text-unet-800 dark:text-unet-300'
                }`}>
                  {user?.role}
                </span>
              </div>
            </div>

            {/* Botón de Cierre de Sesión (Logout) */}
            <button
              onClick={logout}
              className="flex items-center space-x-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-rose-50 dark:hover:bg-rose-950/60 hover:text-rose-600 text-slate-600 dark:text-slate-300 px-3 py-2 rounded-xl text-xs font-bold border border-slate-200 dark:border-slate-700 hover:border-rose-300 transition-all duration-200 hover:scale-105 active:scale-95"
              title="Cerrar sesión"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Salir</span>
            </button>

          </div>

        </div>
      </div>
    </header>
  );
};
