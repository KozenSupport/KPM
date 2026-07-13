import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const proxyTarget = process.env.KPM_DEV_PROXY_TARGET?.trim() || 'http://127.0.0.1:19080';
const apiProxy = {
  '/api': {
    target: proxyTarget,
    changeOrigin: true,
  },
};

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: apiProxy,
  },
  preview: {
    proxy: apiProxy,
  },
  build: {
    chunkSizeWarningLimit: 1300,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom') || id.includes('node_modules/react-router-dom')) return 'react';
          if (id.includes('node_modules/antd') || id.includes('node_modules/@ant-design')) return 'antd';
          if (id.includes('node_modules/@tanstack')) return 'query';
          if (id.includes('node_modules')) return 'vendor';
          return undefined;
        },
      },
    },
  },
});
