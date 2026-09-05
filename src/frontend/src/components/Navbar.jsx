// ============================================================================
// Asignatura: Desarrollo de Aplicaciones Web (Código: 0423807T)
// Facilitador: M.Sc. Ing. Gabriel Alexis Ramírez Sánchez
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

export const Navbar = ({ activeTab, setActiveTab, onOpenCategoryManager }) => {
  const { user, logout } = useContext(AuthContext);
  const { isDark, toggleTheme } = useContext(ThemeContext);

  return (
    <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-40 shadow-sm transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Logo UNET & Título del Sistema */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab(user?.role === 'Admin' ? 'dashboard' : 'products')}>
            <div className="bg-white p-1 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 flex items-center justify-center">
              <img 
                src="/unet-logo.png" 
                alt="Logo UNET" 
                className="h-9 w-auto object-contain"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
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

          {/* Botones de Navegación entre Vistas */}
          <nav className="hidden md:flex items-center space-x-1 bg-slate-100 dark:bg-slate-800/90 p-1 rounded-2xl border border-slate-200 dark:border-slate-700/60">
            {user?.role === 'Admin' && (
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'dashboard'
                    ? 'bg-unet-900 text-white shadow-md shadow-unet-900/20'
                    : 'text-slate-600 dark:text-slate-300 hover:text-unet-900 dark:hover:text-white'
                }`}
              >
                <BarChart3 className="h-4 w-4" />
                <span>Indicadores KPI</span>
              </button>
            )}

            <button
              onClick={() => setActiveTab('products')}
              className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'products'
                  ? 'bg-unet-900 text-white shadow-md shadow-unet-900/20'
                  : 'text-slate-600 dark:text-slate-300 hover:text-unet-900 dark:hover:text-white'
              }`}
            >
              <Package className="h-4 w-4" />
              <span>Catálogo</span>
            </button>

            {user?.role === 'Admin' && (
              <button
                onClick={onOpenCategoryManager}
                className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-unet-900 dark:hover:text-white transition-colors"
              >
                <Layers className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
                <span>Categorías</span>
              </button>
            )}
          </nav>

          {/* Controles de Usuario y Tema Oscuro/Claro */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            
            {/* Botón Switch Modo Oscuro / Claro */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-colors"
              title={isDark ? 'Cambiar a Modo Claro' : 'Cambiar a Modo Oscuro'}
            >
              {isDark ? (
                <Sun className="h-4 w-4 text-amber-400 hover:rotate-45 transition-transform" />
              ) : (
                <Moon className="h-4 w-4 text-unet-800 hover:-rotate-12 transition-transform" />
              )}
            </button>

            {/* Credenciales de Usuario */}
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

            {/* Botón Cerrar Sesión */}
            <button
              onClick={logout}
              className="flex items-center space-x-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-rose-50 dark:hover:bg-rose-950/60 hover:text-rose-600 text-slate-600 dark:text-slate-300 px-3 py-2 rounded-xl text-xs font-bold border border-slate-200 dark:border-slate-700 hover:border-rose-300 transition-all"
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
