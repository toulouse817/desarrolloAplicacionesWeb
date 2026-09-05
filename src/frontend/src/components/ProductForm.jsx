// ============================================================================
// Asignatura: Desarrollo de Aplicaciones Web (Código: 0423807T)
// Facilitador: M.Sc. Ing. Gabriel Alexis Ramírez Sánchez
// Período Académico: Septiembre, 2026
// San Cristóbal, Estado Táchira, Venezuela
// ============================================================================

import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { X, Save, AlertCircle, Package, DollarSign, MapPin, Tag } from 'lucide-react';

export const ProductForm = ({ product, onSubmit, onClose }) => {
  const isEditMode = Boolean(product);

  // Estados de Campos Enriquecidos
  const [name, setName] = useState('');
  const [sku, setSku] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [costPrice, setCostPrice] = useState('');
  const [stock, setStock] = useState('');
  const [minStock, setMinStock] = useState(5);
  const [maxStock, setMaxStock] = useState(100);
  const [location, setLocation] = useState('Almacén Principal');
  const [unitOfMeasure, setUnitOfMeasure] = useState('Unidad');
  const [brand, setBrand] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [categoryId, setCategoryId] = useState('');

  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await api.get('/categories');
        setCategories(data);
        if (!isEditMode && data.length > 0) {
          setCategoryId(data[0].id);
        }
      } catch (err) {
        setError('Error al cargar la lista de categorías.');
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, [isEditMode]);

  useEffect(() => {
    if (product) {
      setName(product.name || '');
      setSku(product.sku || '');
      setDescription(product.description || '');
      setPrice(product.price !== undefined ? product.price : '');
      setCostPrice(product.costPrice !== undefined ? product.costPrice : '');
      setStock(product.stock !== undefined ? product.stock : '');
      setMinStock(product.minStock !== undefined ? product.minStock : 5);
      setMaxStock(product.maxStock !== undefined ? product.maxStock : 100);
      setLocation(product.location || 'Almacén Principal');
      setUnitOfMeasure(product.unitOfMeasure || 'Unidad');
      setBrand(product.brand || '');
      setIsActive(product.isActive !== undefined ? product.isActive : true);
      setCategoryId(product.categoryId || '');
    }
  }, [product]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validaciones Locales Previas
    if (!name.trim() || !sku.trim() || !categoryId) {
      setError('Por favor complete todos los campos obligatorios (*).');
      return;
    }

    if (Number(price) <= 0) {
      setError('El precio de venta debe ser mayor a 0.');
      return;
    }

    if (Number(stock) < 0 || Number(costPrice) < 0) {
      setError('El stock y el costo de adquisición no pueden ser negativos.');
      return;
    }

    setLoading(true);

    const payload = {
      name: name.trim(),
      sku: sku.trim().toUpperCase(),
      description: description.trim(),
      price: Number(price),
      costPrice: Number(costPrice) || Number(price) * 0.7,
      stock: parseInt(stock, 10),
      minStock: parseInt(minStock, 10),
      maxStock: parseInt(maxStock, 10),
      location: location.trim(),
      unitOfMeasure: unitOfMeasure.trim(),
      brand: brand.trim(),
      isActive: Boolean(isActive),
      categoryId,
    };

    try {
      if (isEditMode) {
        await api.put(`/products/${product.id}`, payload);
      } else {
        await api.post('/products', payload);
      }
      onSubmit();
    } catch (err) {
      setError(err.message || 'Ocurrió un error al procesar el producto.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
      <div className="bg-white dark:bg-slate-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-700 relative max-h-[90vh] overflow-y-auto">
        
        {/* Botón de Cierre */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Encabezado del Formulario */}
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-3 bg-unet-50 dark:bg-unet-950/60 text-unet-800 dark:text-unet-300 rounded-2xl border border-unet-200 dark:border-unet-800">
            <Package className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-white">
              {isEditMode ? 'Editar Ficha de Producto' : 'Registrar Nuevo Producto en Catálogo'}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Datos comerciales, financieros, ubicación y parámetros de stock
            </p>
          </div>
        </div>

        {/* Mensaje de Error */}
        {error && (
          <div className="mb-6 p-4 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 rounded-2xl text-rose-800 dark:text-rose-300 text-xs font-semibold flex items-center space-x-2">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* SECCIÓN 1: Identificación y Categoría */}
          <div className="bg-slate-50 dark:bg-slate-900/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-700/60 space-y-3">
            <h4 className="text-xs font-bold text-unet-900 dark:text-unet-300 uppercase tracking-wider flex items-center gap-1.5">
              <Tag className="h-4 w-4" />
              1. Identificación y Clasificación
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1">
                  Nombre del Producto *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ej. Laptop Dell Latitude 5420"
                  className="w-full px-3 py-2 text-xs border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-800 dark:text-white focus:ring-2 focus:ring-unet-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1">
                  Código SKU / Código de Barras *
                </label>
                <input
                  type="text"
                  required
                  value={sku}
                  onChange={(e) => setSku(e.target.value)}
                  placeholder="Ej. LAP-DELL-5420"
                  className="w-full px-3 py-2 text-xs border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-800 dark:text-white focus:ring-2 focus:ring-unet-600 focus:outline-none uppercase font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1">
                  Categoría del Catálogo *
                </label>
                <select
                  required
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  disabled={loadingCategories}
                  className="w-full px-3 py-2 text-xs border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-800 dark:text-white focus:ring-2 focus:ring-unet-600 focus:outline-none"
                >
                  {loadingCategories ? (
                    <option>Cargando categorías...</option>
                  ) : (
                    categories.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))
                  )}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1">
                  Marca / Fabricante
                </label>
                <input
                  type="text"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  placeholder="Ej. Dell, Cisco, LG"
                  className="w-full px-3 py-2 text-xs border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-800 dark:text-white focus:ring-2 focus:ring-unet-600 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1">
                Descripción & Especificaciones
              </label>
              <textarea
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Detalles técnicos, garantía o notas del artículo..."
                className="w-full px-3 py-2 text-xs border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-800 dark:text-white focus:ring-2 focus:ring-unet-600 focus:outline-none resize-none"
              />
            </div>
          </div>

          {/* SECCIÓN 2: Información Financiera y Precios */}
          <div className="bg-slate-50 dark:bg-slate-900/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-700/60 space-y-3">
            <h4 className="text-xs font-bold text-emerald-800 dark:text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
              <DollarSign className="h-4 w-4" />
              2. Precios y Costos Monetarios ($ USD)
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1">
                  Precio de Venta ($ PVP) *
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0.01"
                  required
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="0.00"
                  className="w-full px-3 py-2 text-xs border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-800 dark:text-white focus:ring-2 focus:ring-unet-600 focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1">
                  Costo de Adquisición ($ Compra)
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={costPrice}
                  onChange={(e) => setCostPrice(e.target.value)}
                  placeholder="0.00"
                  className="w-full px-3 py-2 text-xs border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-800 dark:text-white focus:ring-2 focus:ring-unet-600 focus:outline-none font-mono"
                />
              </div>
            </div>
          </div>

          {/* SECCIÓN 3: Control de Existencias y Ubicación en Almacén */}
          <div className="bg-slate-50 dark:bg-slate-900/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-700/60 space-y-3">
            <h4 className="text-xs font-bold text-cyan-800 dark:text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
              <MapPin className="h-4 w-4" />
              3. Existencias, Umbrales y Ubicación
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1">
                  Stock Físico Actual *
                </label>
                <input
                  type="number"
                  min="0"
                  required
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  placeholder="0"
                  className="w-full px-3 py-2 text-xs border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-800 dark:text-white focus:ring-2 focus:ring-unet-600 focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1">
                  Stock Mínimo (Alerta)
                </label>
                <input
                  type="number"
                  min="0"
                  value={minStock}
                  onChange={(e) => setMinStock(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-800 dark:text-white focus:ring-2 focus:ring-unet-600 focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1">
                  Capacidad Máxima
                </label>
                <input
                  type="number"
                  min="1"
                  value={maxStock}
                  onChange={(e) => setMaxStock(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-800 dark:text-white focus:ring-2 focus:ring-unet-600 focus:outline-none font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1">
                  Ubicación en Almacén
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Ej. Almacén Central - Pasillo 2, Estante 3"
                  className="w-full px-3 py-2 text-xs border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-800 dark:text-white focus:ring-2 focus:ring-unet-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1">
                  Unidad de Medida
                </label>
                <select
                  value={unitOfMeasure}
                  onChange={(e) => setUnitOfMeasure(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-800 dark:text-white focus:ring-2 focus:ring-unet-600 focus:outline-none"
                >
                  <option value="Unidad">Unidad (Pza)</option>
                  <option value="Caja">Caja</option>
                  <option value="Paquete">Paquete</option>
                  <option value="Kg">Kilogramo (Kg)</option>
                  <option value="Litro">Litro (L)</option>
                  <option value="Bobina">Bobina / Rollo</option>
                </select>
              </div>
            </div>
          </div>

          {/* Botones de Acción */}
          <div className="flex items-center justify-end space-x-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center space-x-2 px-6 py-2.5 bg-gradient-to-r from-unet-900 via-unet-800 to-unet-700 hover:from-unet-950 hover:to-unet-800 text-white rounded-xl text-xs font-bold shadow-lg shadow-unet-900/20 transition-all transform active:scale-95 disabled:opacity-50"
            >
              <Save className="h-4 w-4" />
              <span>{loading ? 'Guardando en BD...' : isEditMode ? 'Actualizar Producto' : 'Guardar Producto'}</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
