// ============================================================================
// Asignatura: Desarrollo de Aplicaciones Web (Código: 0423807T)
// Facilitador: M.Sc. Ing. Gabriel Alexis Ramírez Sánchez
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
    <section className="space-y-6 animate-fadeIn">
      {/* ========================================================= */}
      {/* SECCIÓN 1: Tarjetas Principales de Indicadores (KPIs)     */}
      {/* ========================================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* KPI 1: Total de Referencias */}
        <div className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md border border-slate-100 transition-all duration-300 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-emerald-500/10 to-teal-500/0 rounded-bl-full pointer-events-none transition-transform group-hover:scale-110"></div>
          <div className="flex items-center justify-between">
            <div className="p-3 bg-gradient-to-tr from-emerald-500 to-teal-600 text-white rounded-xl shadow-md shadow-emerald-500/20">
              <Package className="h-6 w-6" />
            </div>
            <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/50">
              Catálogo
            </span>
          </div>
          <div className="mt-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Total Referencias</p>
            <h3 className="text-2xl font-black text-slate-800 tracking-tight mt-0.5">
              {totalProducts} <span className="text-xs font-medium text-slate-500">productos</span>
            </h3>
            <p className="text-[11px] text-slate-500 mt-1 flex items-center gap-1">
              <Layers className="h-3.5 w-3.5 text-teal-600 inline" />
              <span><strong>{totalUnits}</strong> unidades físicas totales</span>
            </p>
          </div>
        </div>

        {/* KPI 2: Valorización Total del Inventario */}
        <div className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md border border-slate-100 transition-all duration-300 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-sky-500/10 to-indigo-500/0 rounded-bl-full pointer-events-none transition-transform group-hover:scale-110"></div>
          <div className="flex items-center justify-between">
            <div className="p-3 bg-gradient-to-tr from-sky-500 to-indigo-600 text-white rounded-xl shadow-md shadow-sky-500/20">
              <DollarSign className="h-6 w-6" />
            </div>
            <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-sky-50 text-sky-700 border border-sky-200/50">
              Activo Total
            </span>
          </div>
          <div className="mt-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Valor del Inventario</p>
            <h3 className="text-2xl font-black text-indigo-900 tracking-tight mt-0.5">
              ${totalValuation.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </h3>
            <p className="text-[11px] text-slate-500 mt-1 flex items-center gap-1">
              <TrendingUp className="h-3.5 w-3.5 text-sky-600 inline" />
              <span>Promedio: <strong>${averagePrice.toFixed(2)}</strong> / ref</span>
            </p>
          </div>
        </div>

        {/* KPI 3: Estado de Disponibilidad Crítica */}
        <div className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md border border-slate-100 transition-all duration-300 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-amber-500/10 to-red-500/0 rounded-bl-full pointer-events-none transition-transform group-hover:scale-110"></div>
          <div className="flex items-center justify-between">
            <div className="p-3 bg-gradient-to-tr from-amber-500 to-rose-600 text-white rounded-xl shadow-md shadow-amber-500/20">
              <AlertTriangle className="h-6 w-6" />
            </div>
            <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${
              outOfStockCount > 0 
                ? 'bg-rose-50 text-rose-700 border-rose-200/50' 
                : 'bg-emerald-50 text-emerald-700 border-emerald-200/50'
            }`}>
              {outOfStockCount > 0 ? 'Atención Requerida' : 'Nivel Estable'}
            </span>
          </div>
          <div className="mt-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Agotados / Críticos</p>
            <h3 className="text-2xl font-black text-slate-800 tracking-tight mt-0.5">
              <span className={outOfStockCount > 0 ? 'text-rose-600' : 'text-slate-800'}>{outOfStockCount}</span>
              <span className="text-slate-400 text-lg font-normal"> / </span>
              <span className={lowStockCount > 0 ? 'text-amber-600' : 'text-slate-800'}>{lowStockCount}</span>
            </h3>
            <p className="text-[11px] text-slate-500 mt-1">
              <span>{outOfStockCount} agotados • {lowStockCount} con stock ≤ 5</span>
            </p>
          </div>
        </div>

        {/* KPI 4: Tasa de Disponibilidad Óptima */}
        <div className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md border border-slate-100 transition-all duration-300 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-teal-500/10 to-emerald-500/0 rounded-bl-full pointer-events-none transition-transform group-hover:scale-110"></div>
          <div className="flex items-center justify-between">
            <div className="p-3 bg-gradient-to-tr from-teal-500 to-emerald-600 text-white rounded-xl shadow-md shadow-teal-500/20">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-teal-50 text-teal-700 border border-teal-200/50">
              Salud Operativa
            </span>
          </div>
          <div className="mt-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Stock Óptimo</p>
            <h3 className="text-2xl font-black text-emerald-600 tracking-tight mt-0.5">
              {totalProducts > 0 ? Math.round((healthyStockCount / totalProducts) * 100) : 0}%
            </h3>
            <p className="text-[11px] text-slate-500 mt-1">
              <span><strong>{healthyStockCount}</strong> de {totalProducts} con existencias normales</span>
            </p>
          </div>
        </div>

      </div>

      {/* ========================================================= */}
      {/* SECCIÓN 2: Desglose y Distribución por Categorías         */}
      {/* ========================================================= */}
      {totalProducts > 0 && (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
            <div className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5 text-emerald-600" />
              <h4 className="font-bold text-slate-800 text-sm md:text-base">
                Distribución y Desglose por Categoría
              </h4>
            </div>
            <span className="text-xs text-slate-400 font-medium">
              {Object.keys(categoryStats).length} categorías activas
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.entries(categoryStats).map(([catName, stats]) => {
              const percentage = totalUnits > 0 ? Math.round((stats.units / totalUnits) * 100) : 0;
              return (
                <div key={catName} className="bg-slate-50/70 border border-slate-100 rounded-xl p-4 hover:bg-slate-50 transition-colors">
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="font-bold text-slate-700 text-xs truncate max-w-[150px]">{catName}</span>
                    <span className="text-xs font-bold text-indigo-700 font-mono">
                      ${stats.value.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                  
                  {/* Barra de progreso de volumen físico */}
                  <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden my-2">
                    <div 
                      className="bg-gradient-to-r from-emerald-500 to-sky-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${Math.max(percentage, 5)}%` }}
                    ></div>
                  </div>

                  <div className="flex justify-between items-center text-[11px] text-slate-500">
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
