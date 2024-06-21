import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv'; // Import dotenv

// Load environment variables from the .env file (optional, but recommended for security)
dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'build',  // Change the output directory to 'build'
  },
  base: '/YogaLife/',
});
