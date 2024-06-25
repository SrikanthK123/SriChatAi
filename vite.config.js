import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'build',  // Change the output directory to 'build'
  },
  base: '/SriChatAi/',  // Correct base path to match your repository name
});
