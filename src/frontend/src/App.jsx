// ============================================================================
// Asignatura: Desarrollo de Aplicaciones Web (Código: 0423807T)
// Facilitador: M.Sc. Ing. Gabriel Alexis Ramírez Sánchez
// email: gramirezs@unet.edu.ve
// Período Académico: Septiembre, 2026
// San Cristóbal, Estado Táchira, Venezuela
// ============================================================================

import React, { useContext, useState, useEffect } from 'react';
import { AuthProvider, AuthContext } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { LoginForm } from './components/LoginForm';
import { ProductList } from './components/ProductList';
import { ProductForm } from './components/ProductForm';
import { CategoryManager } from './components/CategoryManager';
import { PowerBIDashboard } from './components/PowerBIDashboard';
import { ProtectedRoute } from './components/ProtectedRoute';
import { api } from './services/api';
import { Info, BarChart3, Package, Layers } from 'lucide-react';

/**
 * Componente contenedor de la aplicación protegida tras autenticación exitosa.
 * Administra el estado global de productos, categorías, pestaña activa y modales.
 */
const DashboardContent = () => {
  // Consumo de datos del usuario autenticado desde el contexto
  const { user } = useContext(AuthContext);

  // Verificación de privilegios administrativos
  const isAdmin = user?.role === 'Admin';

  // Control de navegación entre vistas ('dashboard' para analítica KPI, 'products' para catálogo)
  const [activeTab, setActiveTab] = useState(isAdmin ? 'dashboard' : 'products');

  // Estados para almacenamiento de datos sincronizados con la API REST
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Estados de visibilidad y referencia para ventanas modales
  const [editingProduct, setEditingProduct] = useState(null);
  const [isProductFormOpen, setIsProductFormOpen] = useState(false);
  const [isCategoryManagerOpen, setIsCategoryManagerOpen] = useState(false);

  // Asegura que los usuarios sin privilegios administrativos permanezcan en la vista de catálogo
  useEffect(() => {
    if (!isAdmin && activeTab === 'dashboard') {
      setActiveTab('products');
    }
  }, [isAdmin, activeTab]);

  /**
   * Carga asíncrona concurrente de productos y categorías desde los endpoints del backend
   */
  const loadData = async () => {
    try {
      // Peticiones paralelas mediante Promise.all para optimizar tiempos de respuesta
      const [prods, cats] = await Promise.all([
        api.get('/products'),
        api.get('/categories')
      ]);
      setProducts(prods);
      setCategories(cats);
    } catch (err) {
      setError(err.message || 'Error al sincronizar datos.');
    } finally {
      setLoading(false);
    }
  };

  // Ejecución inicial al montar el componente
  useEffect(() => {
    loadData();
  }, []);

  /**
   * Apertura del modal de formulario en modo edición con el producto seleccionado
   */
  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setIsProductFormOpen(true);
  };

  /**
   * Cierre del modal de producto y refresco reactivo de los datos en catálogo
   */
  const handleProductFormSubmit = () => {
    setIsProductFormOpen(false);
    setEditingProduct(null);
    loadData();
  };

  return (
    // Envoltorio principal con adaptación cromática a modo claro y oscuro
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col transition-colors duration-300">
      {/* Barra de navegación superior */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onOpenCategoryManager={() => isAdmin && setIsCategoryManagerOpen(true)}
      />

      {/* Área de contenido principal */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-6 space-y-6">
        
        {/* Banner Institucional Informativo UNET */}
        <div className="bg-gradient-to-r from-unet-900/10 via-unet-700/10 to-cyan-500/10 dark:from-unet-950 dark:via-slate-900 dark:to-slate-900 border border-unet-200/80 dark:border-slate-800 p-4 sm:p-5 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm hover:shadow-md transition-all duration-300 animate-slide-down">
          {/* Identificación de la sesión */}
          <div className="flex items-start space-x-3">
            <div className="p-2.5 bg-unet-100 dark:bg-unet-950 text-unet-800 dark:text-unet-300 rounded-2xl shrink-0 mt-0.5 shadow-sm">
              <Info className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-bold text-slate-800 dark:text-white text-sm sm:text-base">
                Panel Institucional UNET • Sesión de {user?.username}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Rol: <strong className="text-unet-700 dark:text-unet-400">{user?.role}</strong> • 
                Persistencia en PostgreSQL & API REST ASP.NET Core 10
              </p>
            </div>
          </div>

          {/* Selector de pestañas para dispositivos móviles */}
          <div className="flex md:hidden w-full space-x-2">
            {isAdmin && (
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`flex-1 py-2 text-xs font-bold rounded-xl text-center transition-all duration-200 ${
                  activeTab === 'dashboard'
                    ? 'bg-unet-900 text-white shadow-md'
                    : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 active:scale-95'
                }`}
              >
                Indicadores KPI
              </button>
            )}
            <button
              onClick={() => setActiveTab('products')}
              className={`flex-1 py-2 text-xs font-bold rounded-xl text-center transition-all duration-200 ${
                activeTab === 'products'
                  ? 'bg-unet-900 text-white shadow-md'
                  : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 active:scale-95'
              }`}
            >
              Catálogo
            </button>
            {isAdmin && (
              <button
                onClick={() => setIsCategoryManagerOpen(true)}
                className="px-3 py-2 text-xs font-bold rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-all duration-200 active:scale-95"
              >
                Categorías
              </button>
            )}
          </div>

          {/* Etiqueta institucional para pantallas de escritorio */}
          <div className="hidden md:block text-[11px] text-slate-500 dark:text-slate-400 font-mono bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-3 py-1.5 rounded-xl shadow-xs">
            UNET / Dpto. Informática / DAW 2026
          </div>
        </div>

        {/* Renderizado condicional de vistas según la pestaña seleccionada */}
        {isAdmin && activeTab === 'dashboard' ? (
          // Vista de analítica gerencial y catálogo complementario (Solo Administradores)
          <section key="dashboard-view" className="space-y-6 animate-fade-in">
            <PowerBIDashboard products={products} categories={categories} />
            <div className="mt-6">
              <ProductList 
                onEditProduct={handleEditProduct} 
                onOpenCategoryManager={() => isAdmin && setIsCategoryManagerOpen(true)}
              />
            </div>
          </section>
        ) : (
          // Vista directa del catálogo de productos y operaciones de inventario
          <section key="products-view" className="space-y-6 animate-fade-in">
            <ProductList 
              onEditProduct={handleEditProduct} 
              onOpenCategoryManager={() => isAdmin && setIsCategoryManagerOpen(true)}
            />
          </section>
        )}

        {/* Modal para Creación y Edición de Fichas de Producto */}
        {isProductFormOpen && (
          <ProtectedRoute allowedRoles={['Admin', 'Employee']}>
            <ProductForm
              product={editingProduct}
              onSubmit={handleProductFormSubmit}
              onClose={() => {
                setIsProductFormOpen(false);
                setEditingProduct(null);
              }}
            />
          </ProtectedRoute>
        )}

        {/* Modal para Administración de Categorías */}
        {isCategoryManagerOpen && (
          <CategoryManager
            onCategoriesChanged={loadData}
            onClose={() => setIsCategoryManagerOpen(false)}
          />
        )}

      </main>
    </div>
  );
};

/**
 * Componente raíz de la aplicación web.
 * Integra los proveedores de tema (ThemeContext) y autenticación (AuthContext),
 * determinando si se muestra el formulario de login o el panel principal.
 */
const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AuthContext.Consumer>
          {({ token, loading }) => {
            // Pantalla de carga mientras se valida la persistencia del token JWT
            if (loading) {
              return (
                <div className="flex items-center justify-center min-h-screen bg-slate-50 dark:bg-slate-950">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-unet-800"></div>
                </div>
              );
            }
            // Enrutamiento condicional: sesión activa -> Dashboard, sin sesión -> Login
            return token ? <DashboardContent /> : <LoginForm />;
          }}
        </AuthContext.Consumer>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
