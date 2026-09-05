// ============================================================================
// Asignatura: Desarrollo de Aplicaciones Web (Código: 0423807T)
// Facilitador: M.Sc. Ing. Gabriel Alexis Ramírez Sánchez
// email: gramirezs@unet.edu.ve
// Período Académico: Septiembre, 2026
// San Cristóbal, Estado Táchira, Venezuela
// ============================================================================

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

/*
 * 'main.jsx' constituye el punto de entrada (bootstrap) de la aplicación de página única (SPA). 
 * Se encarga de inicializar el motor de renderizado de React 18+ y montarlo en el elemento raíz del DOM. 
 * El contenedor '<React.StrictMode>' habilita verificaciones adicionales durante el desarrollo local, 
 * facilitando la detección temprana de efectos secundarios no controlados y fugas de memoria.
 */
