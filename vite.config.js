import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';

const CLIENT_ID = 'c38ddf9d490f0d12e478252ff673ecdc';
export default defineConfig({
  plugins: [react(), eslint()],
  server:{
    proxy:{
      '/mal': {
        target: 'https://api.myanimelist.net/v2',
        secure: false,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/mal/, ''),
        headers:{
          'X-MAL-CLIENT-ID': CLIENT_ID
        }
      },
      '/kitsu': {
        target: 'https://kitsu.io/api/edge',
        secure: false,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/kitsu/, ''),
        headers:{
          Accept: 'application/vnd.api+json',
          'Content-Type': 'application/vnd.api+json'
        }
      }
    }
  }
});
