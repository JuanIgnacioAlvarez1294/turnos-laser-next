module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // 🎀 Paleta Láser Divino
        rosa: {
          DEFAULT: '#F7CDE8',
          pastel: '#FAD7EA',
          fuerte: '#E7A4C8',
          hover: '#F3B7DD',
          fondo: '#FFF5FA',
          oscuro: '#C8799E',
        },

        gris: {
          suave: '#F5F5F5',
          texto: '#5A5A5A',
          oscuro: '#3A3A3A',
        },

        negro: '#1A1A1A',
      },
    },
  },
  plugins: [],
};
