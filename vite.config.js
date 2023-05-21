const { createServer } = require('vite');

module.exports = {
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080/geoserver',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  // ...other Vite configuration options...
};