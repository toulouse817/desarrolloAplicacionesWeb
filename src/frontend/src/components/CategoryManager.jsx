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
import { Layers, Plus, Edit2, Trash2, X, Save, AlertCircle, RefreshCw, CheckCircle2 } from 'lucide-react';

export const CategoryManager = ({ onCategoriesChanged, onClose }) => {
  const { user } = useContext(AuthContext);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Estados del Formulario
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [saving, setSaving] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(null);

  const fetchCategories = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await api.get('/categories');
      setCategories(data);
    } catch (err) {
      setError(err.message || 'Error al obtener las categorías.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const resetForm = () => {
    setName('');
    setDescription('');
    setIsEditing(false);
    setCurrentId(null);
    setError('');
  };

  const handleEdit = (cat) => {
    setName(cat.name);
    setDescription(cat.description || '');
    setIsEditing(true);
    setCurrentId(cat.id);
    setError('');
    setSuccessMsg('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('El nombre de la categoría es obligatorio.');
      return;
    }

    setSaving(true);
    setError('');
    setSuccessMsg('');

    try {
      if (isEditing) {
        await api.put(`/categories/${currentId}`, { name, description });
        setSuccessMsg('Categoría actualizada con éxito.');
      } else {
        await api.post('/categories', { name, description });
        setSuccessMsg('Categoría creada con éxito.');
      }
      resetForm();
      await fetchCategories();
      if (onCategoriesChanged) onCategoriesChanged();
    } catch (err) {
      setError(err.message || 'Error al guardar la categoría.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`¿Está seguro de que desea eliminar la categoría "${name}"?`)) {
      return;
    }

    setDeleteLoading(id);
    setError('');
    setSuccessMsg('');

    try {
      await api.delete(`/categories/${id}`);
      setSuccessMsg(`Categoría "${name}" eliminada.`);
      setCategories(categories.filter(c => c.id !== id));
      if (onCategoriesChanged) onCategoriesChanged();
    } catch (err) {
      setError(err.message || 'No se pudo eliminar la categoría.');
    } finally {
      setDeleteLoading(null);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
      <div className="bg-white dark:bg-slate-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-700 relative">
        
        {/* Botón de Cierre */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Encabezado */}
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-3 bg-unet-50 dark:bg-unet-950/60 text-unet-800 dark:text-unet-300 rounded-2xl border border-unet-200 dark:border-unet-800">
            <Layers className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-white">
              Gestión de Categorías del Catálogo
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Crear, actualizar o retirar clasificaciones de inventario
            </p>
          </div>
        </div>

        {/* Alertas */}
        {error && (
          <div className="bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 p-3.5 rounded-xl text-rose-800 dark:text-rose-300 text-xs font-semibold flex items-center gap-2 mb-4">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {successMsg && (
          <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 p-3.5 rounded-xl text-emerald-800 dark:text-emerald-300 text-xs font-semibold flex items-center gap-2 mb-4">
            <CheckCircle2 className="h-4 w-4 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Formulario de Creación / Edición (Solo Admin) */}
        {user?.role === 'Admin' && (
          <form onSubmit={handleSubmit} className="bg-slate-50 dark:bg-slate-900/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-700/60 mb-6 space-y-3">
            <h4 className="text-xs font-bold text-unet-900 dark:text-unet-300 uppercase tracking-wider">
              {isEditing ? 'Editar Categoría' : 'Nueva Categoría'}
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1">
                  Nombre de la Categoría *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ej. Redes y Conectividad"
                  className="w-full px-3 py-2 text-xs border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-800 dark:text-white focus:ring-2 focus:ring-unet-600 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1">
                  Descripción
                </label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Breve descripción del rubro..."
                  className="w-full px-3 py-2 text-xs border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-800 dark:text-white focus:ring-2 focus:ring-unet-600 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-1">
              {isEditing && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-3 py-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-colors"
                >
                  Cancelar
                </button>
              )}
              <button
                type="submit"
                disabled={saving}
                className="flex items-center space-x-1.5 px-4 py-1.5 bg-unet-800 hover:bg-unet-900 text-white rounded-xl text-xs font-bold shadow-md shadow-unet-900/20 transition-transform active:scale-95 disabled:opacity-50"
              >
                <Save className="h-3.5 w-3.5" />
                <span>{saving ? 'Guardando...' : isEditing ? 'Actualizar' : 'Agregar Categoría'}</span>
              </button>
            </div>
          </form>
        )}

        {/* Listado de Categorías Existentes */}
        <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
          <div className="flex justify-between items-center text-xs font-bold text-slate-400 uppercase tracking-wider pb-1">
            <span>Categorías Registradas</span>
            <span>{categories.length} en total</span>
          </div>

          {loading ? (
            <div className="py-8 text-center text-xs text-slate-500">
              <RefreshCw className="h-5 w-5 animate-spin mx-auto text-unet-600 mb-2" />
              Cargando categorías...
            </div>
          ) : categories.length === 0 ? (
            <div className="py-6 text-center text-xs text-slate-500">
              No hay categorías registradas.
            </div>
          ) : (
            categories.map((cat) => (
              <div 
                key={cat.id}
                className="flex items-center justify-between p-3 bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl hover:border-unet-400 transition-colors"
              >
                <div className="overflow-hidden pr-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold text-slate-800 dark:text-white">
                      {cat.name}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-unet-50 dark:bg-unet-950/60 text-unet-800 dark:text-unet-300 border border-unet-200 dark:border-unet-800">
                      {cat.productsCount || 0} {cat.productsCount === 1 ? 'producto' : 'productos'}
                    </span>
                  </div>
                  {cat.description && (
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                      {cat.description}
                    </p>
                  )}
                </div>

                <div className="flex items-center space-x-1 shrink-0">
                  {user?.role === 'Admin' && (
                    <>
                      <button
                        onClick={() => handleEdit(cat)}
                        className="p-1.5 text-unet-700 dark:text-unet-400 hover:bg-unet-50 dark:hover:bg-unet-950 rounded-lg transition-colors"
                        title="Editar"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(cat.id, cat.name)}
                        disabled={deleteLoading === cat.id}
                        className="p-1.5 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950 rounded-lg transition-colors disabled:opacity-50"
                        title="Eliminar"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};
