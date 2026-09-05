// ============================================================================
// Asignatura: Desarrollo de Aplicaciones Web (Código: 0423807T)
// Facilitador: M.Sc. Ing. Gabriel Alexis Ramírez Sánchez
// email: gramirezs@unet.edu.ve
// Período Académico: Septiembre, 2026
// San Cristóbal, Estado Táchira, Venezuela
// ============================================================================

import React, { useState } from 'react';
import { 
  DollarSign, 
  Package, 
  TrendingUp, 
  AlertTriangle, 
  Layers, 
  Truck, 
  CheckCircle2, 
  BarChart3, 
  Filter,
  Activity,
  ArrowUpRight,
  ShieldAlert,
  Boxes
} from 'lucide-react';

/**
 * Módulo interactivo de visualización analítica (Business Intelligence) para la toma 
 * de decisiones gerenciales. Presenta métricas consolidadas de rotación de mercancía, 
 * valorización monetaria en dólares americanos ($ USD), salud operativa del almacén y 
 * alertas de reposición de stock en tiempo real con capacidad de filtrado dimensional por categorías.
 */
export const PowerBIDashboard = ({ products = [], categories = [] }) => {
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  // Filtrar productos según la categoría seleccionada
  const filteredProducts = selectedCategory === 'ALL'
    ? products
    : products.filter(p => (p.categoryName || 'Sin Categoría') === selectedCategory || p.categoryId === selectedCategory);

  // 1. Cálculos Financieros y de Existencias
  const totalCost = filteredProducts.reduce((acc, p) => acc + ((Number(p.costPrice) || Number(p.price) * 0.7) * (Number(p.stock) || 0)), 0);
  const totalValuation = filteredProducts.reduce((acc, p) => acc + ((Number(p.price) || 0) * (Number(p.stock) || 0)), 0);
  const totalUnits = filteredProducts.reduce((acc, p) => acc + (Number(p.stock) || 0), 0);
  const totalMinStock = filteredProducts.reduce((acc, p) => acc + (Number(p.minStock) || 5), 0);
  const totalMaxStock = filteredProducts.reduce((acc, p) => acc + (Number(p.maxStock) || 100), 0);

  // 2. Unidades por Reponer y Excedente de Seguridad
  const unitsToReorder = filteredProducts.reduce((acc, p) => {
    const stock = Number(p.stock) || 0;
    const min = Number(p.minStock) || 5;
    return stock < min ? acc + (min - stock) : acc;
  }, 0);

  const safetyStockSurplus = Math.max(0, totalUnits - totalMinStock);

  // 3. Indicadores de Salud Operativa
  const optimalProductsCount = filteredProducts.filter(p => (Number(p.stock) || 0) >= (Number(p.minStock) || 5)).length;
  const criticalProductsCount = filteredProducts.filter(p => (Number(p.stock) || 0) < (Number(p.minStock) || 5)).length;
  const healthPercentage = filteredProducts.length > 0 ? Math.round((optimalProductsCount / filteredProducts.length) * 100) : 0;

  // 4. Desglose Agrupado por Categorías
  const categoryData = filteredProducts.reduce((acc, p) => {
    const name = p.categoryName || 'Sin Categoría';
    if (!acc[name]) {
      acc[name] = { name, cost: 0, valuation: 0, stock: 0, minStock: 0, count: 0 };
    }
    const stock = Number(p.stock) || 0;
    const price = Number(p.price) || 0;
    const cost = Number(p.costPrice) || price * 0.7;
    acc[name].cost += cost * stock;
    acc[name].valuation += price * stock;
    acc[name].stock += stock;
    acc[name].minStock += Number(p.minStock) || 5;
    acc[name].count += 1;
    return acc;
  }, {});

  const categoryList = Object.values(categoryData);
  const maxCategoryCost = Math.max(...categoryList.map(c => c.cost), 1);
  const maxCategoryStock = Math.max(...categoryList.map(c => c.stock), 1);

  const formatCurrency = (val) => {
    return '$' + Number(val).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  // Helper para acortar nombres en etiquetas inferiores
  const getShortLabel = (str, maxChars = 11) => {
    if (!str) return '';
    return str.length > maxChars ? str.slice(0, maxChars) + '…' : str;
  };

  return (
    <div className="bg-slate-100 dark:bg-slate-900/90 p-3 sm:p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4 transition-colors duration-300 overflow-hidden animate-fade-in">
      
      {/* ========================================================= */}
      {/* 1. ENCABEZADO SUPERIOR: DASHBOARD DE INDICADORES KPI      */}
      {/* ========================================================= */}
      <div className="bg-gradient-to-r from-unet-900 via-unet-800 to-sky-700 text-white rounded-2xl p-4 sm:p-5 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-all duration-300">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-inner hover:scale-105 transition-transform duration-200">
            <Truck className="h-7 w-7 text-cyan-300" />
          </div>
          <div>
            <div className="flex items-center space-x-2 flex-wrap gap-1">
              <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white uppercase">
                INVENTARIO
              </h2>
              <span className="bg-cyan-400 text-unet-950 text-xs font-black px-2.5 py-0.5 rounded-md uppercase tracking-wider shadow-sm">
                Dashboard de Indicadores KPI
              </span>
            </div>
            <p className="text-xs text-cyan-100 font-medium mt-0.5">
              Sistema de Analítica & Control de Almacén UNET
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
          {/* Selector de Filtro de Categoría */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-3 py-1.5 flex items-center space-x-2 transition-colors hover:bg-white/15">
            <span className="text-xs text-cyan-200 font-semibold shrink-0">Categoría:</span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-transparent text-white text-xs font-bold focus:outline-none cursor-pointer [&>option]:text-slate-800"
            >
              <option value="ALL">Todas las Categorías ({products.length} productos)</option>
              {categories.map(c => (
                <option key={c.id || c.name} value={c.name}>{c.name}</option>
              ))}
            </select>
          </div>

          <div className="bg-unet-950/60 border border-white/10 px-3.5 py-1.5 rounded-xl text-right shrink-0">
            <p className="text-[10px] text-cyan-200 font-semibold uppercase tracking-wider">Facilitador</p>
            <p className="text-xs font-bold text-white">Prof. Gabriel Ramírez • UNET</p>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 2. TARJETAS DE KPIs Y GAUGES SEMI-CIRCULARES              */}
      {/* ========================================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
        
        {/* KPI 1: Costo Total / Inversión */}
        <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-700 shadow-sm flex items-center space-x-3 hover:shadow-md hover:-translate-y-1 transition-all duration-200">
          <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 rounded-2xl border border-emerald-100 dark:border-emerald-800 shrink-0">
            <DollarSign className="h-6 w-6" />
          </div>
          <div className="overflow-hidden">
            <p className="text-[11px] font-bold text-slate-400 dark:text-slate-400 uppercase tracking-wider truncate">
              Costo Total Inventario
            </p>
            <h3 className="text-xl font-black text-slate-800 dark:text-white truncate">
              {formatCurrency(totalCost)}
            </h3>
            <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">
              PVP: {formatCurrency(totalValuation)}
            </p>
          </div>
        </div>

        {/* KPI 2: Stock Disponible */}
        <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-700 shadow-sm flex items-center space-x-3 hover:shadow-md hover:-translate-y-1 transition-all duration-200">
          <div className="p-3 bg-cyan-50 dark:bg-cyan-950/40 text-cyan-600 dark:text-cyan-400 rounded-2xl border border-cyan-100 dark:border-cyan-800 shrink-0">
            <Package className="h-6 w-6" />
          </div>
          <div className="overflow-hidden">
            <p className="text-[11px] font-bold text-slate-400 dark:text-slate-400 uppercase tracking-wider truncate">
              Stock Disponible
            </p>
            <h3 className="text-xl font-black text-slate-800 dark:text-white">
              {totalUnits.toLocaleString()} <span className="text-xs font-normal text-slate-400">unid</span>
            </h3>
            <p className="text-[10px] text-cyan-600 dark:text-cyan-400 font-semibold">
              {filteredProducts.length} referencias activas
            </p>
          </div>
        </div>

        {/* KPI 3 (Gauge): Rotación de Inventario */}
        <div className="bg-white dark:bg-slate-800 p-3.5 rounded-2xl border border-slate-200/80 dark:border-slate-700 shadow-sm flex flex-col items-center justify-center text-center relative hover:shadow-md hover:-translate-y-1 transition-all duration-200">
          <p className="text-[10px] font-bold text-slate-400 dark:text-slate-400 uppercase tracking-wider">
            Rotación Inventario (Días)
          </p>
          <div className="relative w-24 h-12 mt-2 overflow-hidden flex items-end justify-center">
            <div className="absolute top-0 w-24 h-24 rounded-full border-[10px] border-slate-100 dark:border-slate-700"></div>
            <div 
              className="absolute top-0 w-24 h-24 rounded-full border-[10px] border-purple-500 border-b-transparent border-l-transparent transition-all duration-700"
              style={{ transform: 'rotate(45deg)' }}
            ></div>
            <span className="text-base font-black text-purple-700 dark:text-purple-400 relative z-10 -mb-1">
              9.66
            </span>
          </div>
          <span className="text-[9px] text-slate-400 mt-1 font-medium">Ciclo óptimo mensual</span>
        </div>

        {/* KPI 4 (Gauge): Tasa de Salud de Existencias */}
        <div className="bg-white dark:bg-slate-800 p-3.5 rounded-2xl border border-slate-200/80 dark:border-slate-700 shadow-sm flex flex-col items-center justify-center text-center relative">
          <p className="text-[10px] font-bold text-slate-400 dark:text-slate-400 uppercase tracking-wider">
            Salud de Existencias
          </p>
          <div className="relative w-24 h-12 mt-2 overflow-hidden flex items-end justify-center">
            <div className="absolute top-0 w-24 h-24 rounded-full border-[10px] border-slate-100 dark:border-slate-700"></div>
            <div 
              className="absolute top-0 w-24 h-24 rounded-full border-[10px] border-unet-600 border-b-transparent border-l-transparent transition-all duration-700"
              style={{ transform: `rotate(${Math.min(180, (healthPercentage / 100) * 180)}deg)` }}
            ></div>
            <span className="text-base font-black text-unet-700 dark:text-unet-400 relative z-10 -mb-1">
              {healthPercentage}%
            </span>
          </div>
          <span className="text-[9px] text-slate-400 mt-1 font-medium">{optimalProductsCount} refs normales</span>
        </div>

        {/* KPI 5 (Gauge): Ocupación de Almacén */}
        <div className="bg-white dark:bg-slate-800 p-3.5 rounded-2xl border border-slate-200/80 dark:border-slate-700 shadow-sm flex flex-col items-center justify-center text-center relative">
          <p className="text-[10px] font-bold text-slate-400 dark:text-slate-400 uppercase tracking-wider">
            Ocupación de Almacén
          </p>
          <div className="relative w-24 h-12 mt-2 overflow-hidden flex items-end justify-center">
            <div className="absolute top-0 w-24 h-24 rounded-full border-[10px] border-slate-100 dark:border-slate-700"></div>
            <div 
              className="absolute top-0 w-24 h-24 rounded-full border-[10px] border-amber-500 border-b-transparent border-l-transparent transition-all duration-700"
              style={{ transform: `rotate(${Math.min(180, totalMaxStock > 0 ? (totalUnits / totalMaxStock) * 180 : 90)}deg)` }}
            ></div>
            <span className="text-base font-black text-amber-600 dark:text-amber-400 relative z-10 -mb-1">
              {totalMaxStock > 0 ? Math.round((totalUnits / totalMaxStock) * 100) : 0}%
            </span>
          </div>
          <span className="text-[9px] text-slate-400 mt-1 font-medium">{totalUnits} de {totalMaxStock} max</span>
        </div>

      </div>

      {/* ========================================================= */}
      {/* 3. SECCIÓN CENTRAL: GRÁFICOS VISUALES                     */}
      {/* ========================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        
        {/* GRÁFICO 1: Costo Total por Categorías (Columnas Verticales) */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-800 p-4 sm:p-5 rounded-2xl border border-slate-200/80 dark:border-slate-700 shadow-sm flex flex-col justify-between overflow-hidden">
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-2 mb-3">
              <h4 className="text-xs font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider">
                Costo Total por Categorías
              </h4>
              <span className="text-[10px] text-cyan-600 dark:text-cyan-400 font-bold bg-cyan-50 dark:bg-cyan-950/60 px-2 py-0.5 rounded">
                Valores en $
              </span>
            </div>

            {/* Contenedor con scroll horizontal seguro si hay muchas categorías */}
            <div className="overflow-x-auto pb-2">
              <div className="h-44 flex items-end justify-between gap-2 pt-6 min-w-[320px]">
                {categoryList.map((cat) => {
                  const heightPercent = maxCategoryCost > 0 ? Math.max((cat.cost / maxCategoryCost) * 100, 10) : 10;
                  return (
                    <div key={cat.name} className="flex-1 min-w-[38px] flex flex-col items-center h-full justify-end group">
                      <span className="text-[9px] font-bold text-slate-600 dark:text-slate-300 mb-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        ${(cat.cost / 1000).toFixed(1)}k
                      </span>
                      <div 
                        className="w-full max-w-[28px] bg-gradient-to-t from-unet-800 to-cyan-500 rounded-t-md transition-all duration-500 shadow-sm group-hover:brightness-110 cursor-pointer"
                        style={{ height: `${heightPercent}%` }}
                        title={`${cat.name}: ${formatCurrency(cat.cost)} (${cat.stock} unidades)`}
                      ></div>
                      <span className="text-[9px] font-semibold text-slate-500 dark:text-slate-400 truncate w-full text-center mt-2 px-0.5" title={cat.name}>
                        {getShortLabel(cat.name, 7)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <p className="text-[10px] text-slate-400 text-center mt-1 border-t border-slate-100 dark:border-slate-700 pt-2">
            Inversión ponderada en adquisición por rubro
          </p>
        </div>

        {/* GRÁFICO 2: Inventario Óptimo vs Stock Mínimo (Barras + Línea Umbral) */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-800 p-4 sm:p-5 rounded-2xl border border-slate-200/80 dark:border-slate-700 shadow-sm overflow-hidden flex flex-col justify-between">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-2 mb-3 gap-2">
              <div>
                <h4 className="text-xs font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider">
                  Inventario Óptimo por Categoría (Stock vs. Mínimo)
                </h4>
                <p className="text-[10px] text-slate-400">Verificación de umbral de reorden y existencias críticas</p>
              </div>
              <div className="flex items-center space-x-2.5 text-[9px] font-semibold flex-wrap">
                <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
                  Óptimo
                </span>
                <span className="flex items-center gap-1 text-rose-600 dark:text-rose-400">
                  <span className="w-2 h-2 rounded-full bg-rose-500 inline-block"></span>
                  Crítico
                </span>
                <span className="flex items-center gap-1 text-slate-500 dark:text-slate-300">
                  <span className="w-2.5 h-0.5 bg-slate-800 dark:bg-white inline-block"></span>
                  Mínimo
                </span>
              </div>
            </div>

            {/* Contenedor con scroll horizontal para contener 8+ categorías sin desbordar */}
            <div className="overflow-x-auto pb-2">
              <div className="h-44 flex items-end justify-between gap-2.5 pt-4 min-w-[480px]">
                {categoryList.map((cat) => {
                  const isHealthy = cat.stock >= cat.minStock;
                  const barHeight = maxCategoryStock > 0 ? Math.max((cat.stock / maxCategoryStock) * 100, 12) : 12;
                  const thresholdHeight = maxCategoryStock > 0 ? Math.min((cat.minStock / maxCategoryStock) * 100, 92) : 30;

                  return (
                    <div key={cat.name} className="flex-1 min-w-[50px] flex flex-col items-center h-full justify-end relative group">
                      <span className="text-[10px] font-black text-slate-700 dark:text-slate-200 mb-1">
                        {cat.stock}
                      </span>

                      <div 
                        className={`w-full max-w-[34px] rounded-t-lg transition-all duration-500 shadow-sm ${
                          isHealthy 
                            ? 'bg-gradient-to-t from-emerald-600 to-teal-400 group-hover:brightness-110' 
                            : 'bg-gradient-to-t from-rose-600 to-amber-500 group-hover:brightness-110'
                        }`}
                        style={{ height: `${barHeight}%` }}
                        title={`${cat.name}: Stock ${cat.stock} / Mínimo requerido: ${cat.minStock}`}
                      ></div>

                      {/* Indicador de Línea Umbral Mínimo */}
                      <div 
                        className="absolute w-full max-w-[42px] border-t-2 border-dashed border-slate-800 dark:border-white pointer-events-none"
                        style={{ bottom: `${thresholdHeight}%` }}
                        title={`Mínimo requerido: ${cat.minStock}`}
                      >
                        <div className="w-1.5 h-1.5 bg-slate-900 dark:bg-white rounded-full mx-auto -mt-1"></div>
                      </div>

                      <span className="text-[9px] font-bold text-slate-600 dark:text-slate-300 truncate w-full text-center mt-2 px-0.5" title={cat.name}>
                        {getShortLabel(cat.name, 10)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <p className="text-[10px] text-slate-400 text-center mt-1 border-t border-slate-100 dark:border-slate-700 pt-2">
            Línea punteada indica el umbral mínimo de seguridad
          </p>
        </div>

      </div>

      {/* ========================================================= */}
      {/* 4. SECCIÓN INFERIOR: BARRAS HORIZONTALES Y ESTADO         */}
      {/* ========================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        
        {/* Barras Horizontales: Inventario Disponible por Categoría */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-800 p-4 sm:p-5 rounded-2xl border border-slate-200/80 dark:border-slate-700 shadow-sm space-y-3 overflow-hidden">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-2">
            <h4 className="text-xs font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider">
              Inventario Disponible por Categoría
            </h4>
            <span className="text-[10px] text-slate-400">{categoryList.length} categorías</span>
          </div>

          <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
            {categoryList.map((cat) => {
              const widthPercent = totalUnits > 0 ? Math.round((cat.stock / totalUnits) * 100) : 0;
              return (
                <div key={cat.name} className="space-y-1">
                  <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                    <span className="truncate max-w-[220px]" title={cat.name}>{cat.name}</span>
                    <span className="text-cyan-700 dark:text-cyan-400 font-mono text-[11px] shrink-0">
                      {cat.stock} unid. ({widthPercent}%)
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-2.5 overflow-hidden p-0.5">
                    <div 
                      className="bg-gradient-to-r from-cyan-500 to-unet-700 h-1.5 rounded-full transition-all duration-700"
                      style={{ width: `${Math.max(widthPercent, 3)}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bloque de Estado de Seguridad (4 Mini-Tarjetas de Indicadores) */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-800 p-4 sm:p-5 rounded-2xl border border-slate-200/80 dark:border-slate-700 shadow-sm flex flex-col justify-between overflow-hidden">
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-2 mb-3">
              <div className="flex items-center space-x-2">
                <span className={`w-3 h-3 rounded-full ${criticalProductsCount > 0 ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500'}`}></span>
                <h4 className="text-xs font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider">
                  Control de Stock y Seguridad
                </h4>
              </div>
              <span className="text-[10px] text-slate-400">Parámetros ERP</span>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              
              {/* Card 1: Inv. Disponible */}
              <div className="bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 p-3 rounded-xl text-center">
                <p className="text-[10px] font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider">
                  Inv. Disponible
                </p>
                <h5 className="text-xl font-black text-emerald-700 dark:text-emerald-400 mt-0.5">
                  {totalUnits}
                </h5>
                <p className="text-[9px] text-emerald-600 dark:text-emerald-500 font-medium">Unidades en mano</p>
              </div>

              {/* Card 2: Inv. Mínimo */}
              <div className="bg-cyan-50/80 dark:bg-cyan-950/40 border border-cyan-200 dark:border-cyan-800/60 p-3 rounded-xl text-center">
                <p className="text-[10px] font-bold text-cyan-800 dark:text-cyan-300 uppercase tracking-wider">
                  Inv. Mínimo
                </p>
                <h5 className="text-xl font-black text-cyan-700 dark:text-cyan-400 mt-0.5">
                  {totalMinStock}
                </h5>
                <p className="text-[9px] text-cyan-600 dark:text-cyan-500 font-medium">Límite de seguridad</p>
              </div>

              {/* Card 3: Inv. Seguridad (Excedente) */}
              <div className="bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 p-3 rounded-xl text-center">
                <p className="text-[10px] font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider">
                  Inv. Seguridad
                </p>
                <h5 className="text-xl font-black text-slate-800 dark:text-slate-100 mt-0.5">
                  {safetyStockSurplus}
                </h5>
                <p className="text-[9px] text-slate-500 dark:text-slate-400 font-medium">Excedente operativo</p>
              </div>

              {/* Card 4: Por Reponer */}
              <div className="bg-rose-50/80 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/60 p-3 rounded-xl text-center">
                <p className="text-[10px] font-bold text-rose-800 dark:text-rose-300 uppercase tracking-wider">
                  Por Reponer
                </p>
                <h5 className="text-xl font-black text-rose-600 dark:text-rose-400 mt-0.5">
                  {unitsToReorder}
                </h5>
                <p className="text-[9px] text-rose-600 dark:text-rose-500 font-medium">Unidades requeridas</p>
              </div>

            </div>
          </div>

          <div className="mt-3 text-[10px] text-slate-400 dark:text-slate-400 text-center border-t border-slate-100 dark:border-slate-700 pt-2">
            Indicadores sincronizados en tiempo real con PostgreSQL
          </div>
        </div>

      </div>

    </div>
  );
};
