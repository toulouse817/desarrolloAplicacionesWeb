// ============================================================================
// Asignatura: Desarrollo de Aplicaciones Web (Código: 0423807T)
// Facilitador: M.Sc. Ing. Gabriel Alexis Ramírez Sánchez
// email: gramirezs@unet.edu.ve
// Período Académico: Septiembre, 2026
// San Cristóbal, Estado Táchira, Venezuela
// ============================================================================

import React from 'react';
import { 
  Package, 
  DollarSign, 
  AlertTriangle, 
  TrendingUp, 
  Layers, 
  CheckCircle2, 
  BarChart3
} from 'lucide-react';

/**
 * Componente reactivo encargado de calcular y visualizar los indicadores clave de 
 * rendimiento (KPIs) del inventario en tiempo de ejecución. Procesa en memoria el catálogo 
 * obtenido del backend, computando existencias totales, valorización económica, umbrales de seguridad 
 * y distribución por categorías mediante renderizado en el cliente (Client-Side Rendering).
 */
export const DashboardKPI = ({ products = [] }) => {
  // 1. Cálculo del Total de Referencias/Productos Únicos en el Catálogo
  const totalProducts = products.length;

  // 2. Cálculo del Stock Total Físico (Suma acumulada de todas las unidades en existencia)
  const totalUnits = products.reduce((acc, p) => acc + (Number(p.stock) || 0), 0);

  // 3. Valorización Monetaria Total del Inventario ($ USD) -> Sumatoria de (Precio * Stock)
  const totalValuation = products.reduce((acc, p) => acc + ((Number(p.price) || 0) * (Number(p.stock) || 0)), 0);

  // 4. Conteo de Productos Sin Existencias (Stock == 0) -> Riesgo de Quiebre de Stock
  const outOfStockCount = products.filter(p => Number(p.stock) === 0).length;

  // 5. Conteo de Productos con Stock Crítico (Entre 1 y 5 unidades disponibles)
  const lowStockCount = products.filter(p => Number(p.stock) > 0 && Number(p.stock) <= 5).length;

  // 6. Conteo de Productos con Stock Óptimo / Abundante (> 5 unidades)
  const healthyStockCount = products.filter(p => Number(p.stock) > 5).length;

  // 7. Cálculo del Precio Promedio por Referencia en el Inventario
  const averagePrice = totalProducts > 0 
    ? (products.reduce((acc, p) => acc + (Number(p.price) || 0), 0) / totalProducts) 
    : 0;

  // 8. Agrupación y Distribución por Categoría de Productos
  const categoryStats = products.reduce((acc, p) => {
    const catName = p.categoryName || 'Sin Categoría';
    if (!acc[catName]) {
      acc[catName] = { count: 0, units: 0, value: 0 };
    }
    acc[catName].count += 1;
    acc[catName].units += Number(p.stock) || 0;
    acc[catName].value += (Number(p.price) || 0) * (Number(p.stock) || 0);
    return acc;
  }, {});

  return (
    <section className="space-y-6 animate-fade-in">
      {/* ========================================================= */}
      {/* SECCIÓN 1: Tarjetas Principales de Indicadores (KPIs)     */}
      {/* ========================================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* KPI 1: Total de Referencias */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 shadow-sm hover:shadow-xl hover:-translate-y-1.5 border border-slate-100 dark:border-slate-800 transition-all duration-300 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-br from-emerald-500/10 to-teal-500/0 rounded-bl-full pointer-events-none transition-transform group-hover:scale-125 duration-500"></div>
          <div className="flex items-center justify-between">
            <div className="p-3 bg-gradient-to-tr from-emerald-500 to-teal-600 text-white rounded-2xl shadow-md shadow-emerald-500/20 group-hover:scale-110 transition-transform duration-300">
              <Package className="h-6 w-6" />
            </div>
            <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200/50 dark:border-emerald-800/60">
              Catálogo
            </span>
          </div>
          <div className="mt-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">Total Referencias</p>
            <h3 className="text-2xl font-black text-slate-800 dark:text-white tracking-tight mt-0.5">
              {totalProducts} <span className="text-xs font-medium text-slate-500 dark:text-slate-400">productos</span>
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-1">
              <Layers className="h-3.5 w-3.5 text-teal-600 dark:text-teal-400 inline" />
              <span><strong>{totalUnits}</strong> unidades físicas totales</span>
            </p>
          </div>
        </div>

        {/* KPI 2: Valorización Total del Inventario */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 shadow-sm hover:shadow-xl hover:-translate-y-1.5 border border-slate-100 dark:border-slate-800 transition-all duration-300 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-br from-sky-500/10 to-indigo-500/0 rounded-bl-full pointer-events-none transition-transform group-hover:scale-125 duration-500"></div>
          <div className="flex items-center justify-between">
            <div className="p-3 bg-gradient-to-tr from-sky-500 to-indigo-600 text-white rounded-2xl shadow-md shadow-sky-500/20 group-hover:scale-110 transition-transform duration-300">
              <DollarSign className="h-6 w-6" />
            </div>
            <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 border border-sky-200/50 dark:border-sky-800/60">
              Activo Total
            </span>
          </div>
          <div className="mt-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">Valor del Inventario</p>
            <h3 className="text-2xl font-black text-indigo-900 dark:text-indigo-300 tracking-tight mt-0.5">
              ${totalValuation.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-1">
              <TrendingUp className="h-3.5 w-3.5 text-sky-600 dark:text-sky-400 inline" />
              <span>Promedio: <strong>${averagePrice.toFixed(2)}</strong> / ref</span>
            </p>
          </div>
        </div>

        {/* KPI 3: Estado de Disponibilidad Crítica */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 shadow-sm hover:shadow-xl hover:-translate-y-1.5 border border-slate-100 dark:border-slate-800 transition-all duration-300 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-br from-amber-500/10 to-red-500/0 rounded-bl-full pointer-events-none transition-transform group-hover:scale-125 duration-500"></div>
          <div className="flex items-center justify-between">
            <div className={`p-3 bg-gradient-to-tr from-amber-500 to-rose-600 text-white rounded-2xl shadow-md shadow-amber-500/20 group-hover:scale-110 transition-transform duration-300 ${outOfStockCount > 0 ? 'animate-pulse' : ''}`}>
              <AlertTriangle className="h-6 w-6" />
            </div>
            <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${
              outOfStockCount > 0 
                ? 'bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border-rose-200/50 dark:border-rose-800/60' 
                : 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200/50 dark:border-emerald-800/60'
            }`}>
              {outOfStockCount > 0 ? 'Atención Requerida' : 'Nivel Estable'}
            </span>
          </div>
          <div className="mt-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">Agotados / Críticos</p>
            <h3 className="text-2xl font-black text-slate-800 dark:text-white tracking-tight mt-0.5">
              <span className={outOfStockCount > 0 ? 'text-rose-600 dark:text-rose-400' : 'text-slate-800 dark:text-white'}>{outOfStockCount}</span>
              <span className="text-slate-400 dark:text-slate-600 text-lg font-normal"> / </span>
              <span className={lowStockCount > 0 ? 'text-amber-600 dark:text-amber-400' : 'text-slate-800 dark:text-white'}>{lowStockCount}</span>
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
              <span>{outOfStockCount} agotados • {lowStockCount} con stock ≤ 5</span>
            </p>
          </div>
        </div>

        {/* KPI 4: Tasa de Disponibilidad Óptima */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 shadow-sm hover:shadow-xl hover:-translate-y-1.5 border border-slate-100 dark:border-slate-800 transition-all duration-300 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-br from-teal-500/10 to-emerald-500/0 rounded-bl-full pointer-events-none transition-transform group-hover:scale-125 duration-500"></div>
          <div className="flex items-center justify-between">
            <div className="p-3 bg-gradient-to-tr from-teal-500 to-emerald-600 text-white rounded-2xl shadow-md shadow-teal-500/20 group-hover:scale-110 transition-transform duration-300">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 border border-teal-200/50 dark:border-teal-800/60">
              Salud Operativa
            </span>
          </div>
          <div className="mt-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">Stock Óptimo</p>
            <h3 className="text-2xl font-black text-emerald-600 dark:text-emerald-400 tracking-tight mt-0.5">
              {totalProducts > 0 ? Math.round((healthyStockCount / totalProducts) * 100) : 0}%
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
              <span><strong>{healthyStockCount}</strong> de {totalProducts} con existencias normales</span>
            </p>
          </div>
        </div>

      </div>

      {/* ========================================================= */}
      {/* SECCIÓN 2: Desglose y Distribución por Categorías         */}
      {/* ========================================================= */}
      {totalProducts > 0 && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-800 transition-all duration-300">
          <div className="flex items-center justify-between mb-4 border-b border-slate-100 dark:border-slate-800 pb-3">
            <div className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              <h4 className="font-bold text-slate-800 dark:text-white text-sm md:text-base">
                Distribución y Desglose por Categoría
              </h4>
            </div>
            <span className="text-xs text-slate-400 dark:text-slate-500 font-medium">
              {Object.keys(categoryStats).length} categorías activas
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.entries(categoryStats).map(([catName, stats]) => {
              const percentage = totalUnits > 0 ? Math.round((stats.units / totalUnits) * 100) : 0;
              return (
                <div key={catName} className="bg-slate-50/70 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/60 rounded-2xl p-4 hover:bg-slate-100/80 dark:hover:bg-slate-800 hover:scale-[1.02] transition-all duration-200">
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="font-bold text-slate-700 dark:text-slate-200 text-xs truncate max-w-[150px]">{catName}</span>
                    <span className="text-xs font-bold text-indigo-700 dark:text-indigo-400 font-mono">
                      ${stats.value.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                  
                  {/* Barra de progreso de volumen físico */}
                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 overflow-hidden my-2">
                    <div 
                      className="bg-gradient-to-r from-emerald-500 to-sky-500 h-2 rounded-full transition-all duration-700 ease-out"
                      style={{ width: `${Math.max(percentage, 5)}%` }}
                    ></div>
                  </div>

                  <div className="flex justify-between items-center text-[11px] text-slate-500 dark:text-slate-400">
                    <span>{stats.count} {stats.count === 1 ? 'producto' : 'productos'}</span>
                    <span><strong>{stats.units}</strong> unid. ({percentage}%)</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
};
