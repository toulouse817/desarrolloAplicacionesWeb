// ============================================================================
// Asignatura: Desarrollo de Aplicaciones Web (Código: 0423807T)
// Facilitador: M.Sc. Ing. Gabriel Alexis Ramírez Sánchez
// email: gramirezs@unet.edu.ve
// Período Académico: Septiembre, 2026
// San Cristóbal, Estado Táchira, Venezuela
// ============================================================================

import React, { useState, useEffect, useContext } from 'react';
import { api } from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { 
  Edit2, 
  Trash2, 
  Plus, 
  Search, 
  AlertCircle, 
  RefreshCw, 
  Filter, 
  MapPin, 
  Tag, 
  DollarSign, 
  Package, 
  Layers 
} from 'lucide-react';

export const ProductList = ({ onEditProduct, onOpenCategoryManager }) => {
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteLoading, setDeleteLoading] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError('');
    try {
      const [prodsData, catsData] = await Promise.all([
        api.get('/products'),
        api.get('/categories')
      ]);
      setProducts(prodsData);
      setCategories(catsData);
    } catch (err) {
      setError(err.message || 'Error al obtener los datos del servidor.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id, name) => {
    if (!window.confirm(`¿Está seguro de que desea eliminar el producto "${name}"?`)) {
      return;
    }

    setDeleteLoading(id);
    try {
      await api.delete(`/products/${id}`);
      setProducts(products.filter((p) => p.id !== id));
    } catch (err) {
      alert(err.message || 'No se pudo eliminar el producto.');
    } finally {
      setDeleteLoading(null);
    }
  };

  // Filtrado reactivo en memoria por texto y categoría
  const filteredProducts = products.filter((p) => {
    const query = searchQuery.toLowerCase();
    const matchesSearch = 
      p.name.toLowerCase().includes(query) ||
      p.sku.toLowerCase().includes(query) ||
      (p.brand && p.brand.toLowerCase().includes(query)) ||
      (p.location && p.location.toLowerCase().includes(query));
    
    const matchesCategory = selectedCategory === 'ALL' || (p.categoryName || 'Sin Categoría') === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Badge de estado de existencias
  const getStockBadge = (stock, minStock = 5) => {
    if (stock === 0) {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-rose-100 dark:bg-rose-950/80 text-rose-800 dark:text-rose-300 border border-rose-300 dark:border-rose-800">
          Agotado (0)
        </span>
      );
    }
    if (stock <= minStock) {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
          Crítico ({stock} / min {minStock})
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
        Óptimo ({stock})
      </span>
    );
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl border border-slate-200/80 dark:border-slate-700 p-6 overflow-hidden transition-colors">
      
      {/* Controles de búsqueda, filtrado y acciones */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        
        <div className="flex flex-col sm:flex-row gap-3 w-full md:max-w-xl">
          {/* Barra de Búsqueda */}
          <div className="relative w-full">
            <div className="relative group flex-1">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-unet-600 dark:group-focus-within:text-unet-400 transition-colors">
                <Search className="h-4 w-4" />
              </div>
              <input
                type="text"
                placeholder="Buscar por Nombre, SKU, Marca o Ubicación..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl text-xs focus:ring-4 focus:ring-unet-600/20 focus:border-unet-600 focus:outline-none text-slate-800 dark:text-white bg-slate-50 dark:bg-slate-900/60 transition-all duration-200"
              />
            </div>

            {/* Filtro por Categoría */}
            <div className="relative shrink-0">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Filter className="h-3.5 w-3.5" />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="block w-full pl-8 pr-8 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold focus:ring-4 focus:ring-unet-600/20 focus:border-unet-600 text-slate-700 dark:text-slate-200 bg-slate-50 dark:bg-slate-900/60 cursor-pointer transition-all duration-200"
              >
                <option value="ALL">Todas las Categorías</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.name}>{cat.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Botones de Acción */}
          <div className="flex items-center space-x-2 shrink-0">
            <button
              onClick={fetchData}
              className="p-2.5 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl text-slate-500 dark:text-slate-300 transition-all duration-200 active:scale-90 hover:scale-105"
              title="Refrescar catálogo"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            </button>

            {user?.role === 'Admin' && (
              <button
                onClick={onOpenCategoryManager}
                className="flex items-center space-x-1.5 px-3.5 py-2.5 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-bold transition-all duration-200 active:scale-95 hover:scale-105"
              >
                <Layers className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
                <span>Categorías</span>
              </button>
            )}

            <button
              onClick={() => onEditProduct(null)}
              className="flex items-center space-x-1.5 bg-gradient-to-r from-unet-900 via-unet-800 to-unet-700 hover:from-unet-950 hover:to-unet-800 text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow-md shadow-unet-900/20 hover:shadow-lg hover:shadow-unet-900/30 transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 active:scale-95"
            >
              <Plus className="h-4 w-4" />
              <span>Nuevo Producto</span>
            </button>
          </div>
        </div>

        {/* Manejo de Estados Asíncronos */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-4 animate-fade-in">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-unet-700"></div>
            <span className="text-xs text-slate-500 font-medium">Cargando catálogo de inventario...</span>
          </div>
        ) : error ? (
          <div className="bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 p-6 rounded-2xl text-center text-rose-800 dark:text-rose-300 animate-fade-in">
            <AlertCircle className="h-10 w-10 text-rose-500 mx-auto mb-3" />
            <p className="text-xs font-bold">{error}</p>
            <button
              onClick={fetchData}
              className="mt-4 px-4 py-1.5 bg-rose-600 text-white rounded-xl text-xs font-bold hover:bg-rose-700 transition-colors"
            >
              Reintentar
            </button>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-slate-50 dark:bg-slate-900/40 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700 animate-fade-in">
            <Package className="h-10 w-10 text-slate-400 mx-auto mb-2" />
            <p className="text-xs font-bold text-slate-600 dark:text-slate-300">No se encontraron productos registrados.</p>
            <p className="text-[11px] text-slate-400 mt-0.5">Pruebe ajustando los filtros o agregue un nuevo producto.</p>
          </div>
        ) : (
          /* Tabla Principal de Catálogo */
          <div className="overflow-x-auto rounded-2xl border border-slate-200/80 dark:border-slate-700 animate-fade-in">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-700 text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  <th className="py-3.5 px-4">Producto & SKU</th>
                  <th className="py-3.5 px-4">Categoría / Marca</th>
                  <th className="py-3.5 px-4">Precios ($ Venta / Costo)</th>
                  <th className="py-3.5 px-4">Stock & Umbral</th>
                  <th className="py-3.5 px-4">Ubicación / Medida</th>
                  <th className="py-3.5 px-4 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60 text-xs">
                {filteredProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-700/40 transition-colors duration-150">
                  
                  {/* Nombre y SKU */}
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-slate-800 dark:text-white">
                      {p.name}
                    </div>
                    <div className="text-[11px] font-mono text-unet-800 dark:text-unet-400 mt-0.5">
                      SKU: {p.sku}
                    </div>
                    {p.description && (
                      <div className="text-[10px] text-slate-400 truncate max-w-xs mt-0.5">
                        {p.description}
                      </div>
                    )}
                  </td>

                  {/* Categoría y Marca */}
                  <td className="py-3.5 px-4">
                    <span className="inline-block px-2.5 py-0.5 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-full text-[10px] font-bold">
                      {p.categoryName || 'Sin Categoría'}
                    </span>
                    {p.brand && (
                      <div className="text-[10px] text-slate-400 mt-1">
                        Marca: <strong className="text-slate-600 dark:text-slate-300">{p.brand}</strong>
                      </div>
                    )}
                  </td>

                  {/* Precios (Venta y Costo) */}
                  <td className="py-3.5 px-4">
                    <div className="font-bold font-mono text-emerald-600 dark:text-emerald-400">
                      ${Number(p.price).toFixed(2)}
                    </div>
                    {p.costPrice > 0 && (
                      <div className="text-[10px] font-mono text-slate-400">
                        Costo: ${Number(p.costPrice).toFixed(2)}
                      </div>
                    )}
                  </td>

                  {/* Stock y Badges */}
                  <td className="py-3.5 px-4">
                    {getStockBadge(p.stock, p.minStock)}
                    <div className="text-[10px] text-slate-400 mt-1">
                      Máx: {p.maxStock || 100} {p.unitOfMeasure || 'Unid'}
                    </div>
                  </td>

                  {/* Ubicación y Unidad */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center text-slate-600 dark:text-slate-300 text-[11px]">
                      <MapPin className="h-3.5 w-3.5 mr-1 text-slate-400 shrink-0" />
                      <span className="truncate max-w-[150px]">{p.location || 'Almacén Principal'}</span>
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5">
                      Medida: {p.unitOfMeasure || 'Unidad'}
                    </div>
                  </td>

                  {/* Botones de Acción */}
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end space-x-1.5">
                      <button
                        onClick={() => onEditProduct(p)}
                        className="p-1.5 hover:bg-unet-50 dark:hover:bg-unet-950 text-unet-800 dark:text-unet-300 rounded-lg transition-colors"
                        title="Editar ficha de producto"
                        disabled={deleteLoading !== null}
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>

                      {user?.role === 'Admin' && (
                        <button
                          onClick={() => handleDelete(p.id, p.name)}
                          className="p-1.5 hover:bg-rose-50 dark:hover:bg-rose-950 text-rose-600 rounded-lg transition-colors disabled:opacity-50"
                          title="Eliminar producto (Solo Administradores)"
                          disabled={deleteLoading !== null}
                        >
                          {deleteLoading === p.id ? (
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-rose-600"></div>
                          ) : (
                            <Trash2 className="h-4 w-4" />
                          )}
                        </button>
                      )}
                    </div>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

    </div>
  );
};
