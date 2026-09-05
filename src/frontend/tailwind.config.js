// ============================================================================
// Asignatura: Desarrollo de Aplicaciones Web (Código: 0423807T)
// Facilitador: M.Sc. Ing. Gabriel Alexis Ramírez Sánchez
// email: gramirezs@unet.edu.ve
// Período Académico: Septiembre, 2026
// San Cristóbal, Estado Táchira, Venezuela
// ============================================================================

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        unet: {
          50: '#f0f5fc',
          100: '#e1ecf8',
          200: '#c2daf2',
          300: '#94c0ea',
          400: '#5fa1df',
          500: '#3b82d4',
          600: '#2567c2',
          700: '#1d52a2',
          800: '#1a4382',
          900: '#003366', // Azul Oficial UNET
          950: '#0a1931', // Azul Profundo UNET Dark
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
