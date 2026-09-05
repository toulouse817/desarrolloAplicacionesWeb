// ============================================================================
// Asignatura: Desarrollo de Aplicaciones Web (Código: 0423807T)
// Facilitador: M.Sc. Ing. Gabriel Alexis Ramírez Sánchez
// email: gramirezs@unet.edu.ve
// Período Académico: Septiembre, 2026
// San Cristóbal, Estado Táchira, Venezuela
// ============================================================================

/**
 * Configuración de Tailwind CSS adaptada para el Sistema de Inventario ERP.
 * Define la paleta cromática institucional de la Universidad Nacional Experimental del Táchira (UNET),
 * tipografías del sistema y un conjunto completo de keyframes para animaciones fluidas de interfaz de usuario.
 *
 * @type {import('tailwindcss').Config} 
 */
export default {
  // Rutas de archivos fuente donde Tailwind escaneará clases utilitarias para compilar el CSS final
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  // Estrategia de modo oscuro basada en la clase 'dark' aplicada en el elemento raíz <html>
  darkMode: 'class',
  theme: {
    extend: {
      // Definición de la escala cromática oficial y variaciones para el diseño institucional UNET
      colors: {
        unet: {
          50: '#f0f5fc',  // Tono claro para fondos sutiles y estados hover
          100: '#e1ecf8', // Fondo secundario para insignias y contenedores suaves
          200: '#c2daf2', // Bordes sutiles y divisores claros
          300: '#94c0ea', // Azul intermedio para contrastes ligeros y textos destacados en modo oscuro
          400: '#5fa1df', // Azul brillante para estados de interacción y focos
          500: '#3b82d4', // Azul principal para gráficos y elementos de atención
          600: '#2567c2', // Azul corporativo para botones y llamadas a la acción
          700: '#1d52a2', // Azul oscuro para estados hover en botones
          800: '#1a4382', // Azul profundo para encabezados y énfasis
          900: '#003366', // Azul Oficial Institucional de la UNET
          950: '#0a1931', // Azul Noche Profundo para fondos en modo oscuro
        }
      },
      // Familia tipográfica principal del sistema
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      // Definición de fotogramas clave (Keyframes) para efectos visuales y micro-interacciones
      keyframes: {
        // Desplazamiento flotante suave en bucle con rotación y escala sutil para orbes de fondo
        'float-slow': {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.95)' },
        },
        // Desplazamiento flotante inverso para generar asimetría en el fondo ambiental
        'float-reverse': {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(-35px, 45px) scale(1.08)' },
          '66%': { transform: 'translate(25px, -30px) scale(0.92)' },
        },
        // Desplazamiento flotante con retardo de fase para balancear la animación
        'float-delayed': {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '50%': { transform: 'translate(40px, 30px) scale(1.15)' },
        },
        // Entrada suave ascendente con opacidad gradual y escalado natural para tarjetas y vistas
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(24px) scale(0.97)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        // Efecto de barrido de luz diagonal para botones interactivos
        'shimmer': {
          '100%': { transform: 'translateX(100%)' },
        },
        // Pulsación suave de resplandor para elementos críticos y puntos de atención
        'pulse-glow': {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
        // Efecto pop-in para apertura elástica y elegante de ventanas modales
        'pop-in': {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        // Entrada deslizante descendente para notificaciones, banners y menús desplegables
        'slide-down': {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        // Transición de desvanecimiento suave para cambio de pestañas y carga de vistas
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        }
      },
      // Utilidades de animación asociadas a sus respectivos keyframes, duraciones y curvas de aceleración
      animation: {
        'float-slow': 'float-slow 16s ease-in-out infinite',
        'float-reverse': 'float-reverse 20s ease-in-out infinite',
        'float-delayed': 'float-delayed 18s ease-in-out infinite 3s',
        'fade-in-up': 'fade-in-up 0.65s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'shimmer': 'shimmer 2.5s infinite',
        'pulse-glow': 'pulse-glow 4s ease-in-out infinite',
        'pop-in': 'pop-in 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-down': 'slide-down 0.3s ease-out forwards',
        'fade-in': 'fade-in 0.35s ease-out forwards',
      }
    },
  },
  // Plugins adicionales de Tailwind CSS
  plugins: [],
}
