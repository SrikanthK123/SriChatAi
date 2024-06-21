import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv'; // Import dotenv

// Load environment variables from the .env file (optional, but recommended for security)
dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Optionally add environment variable replacement during build (for development convenience)
  build: {
    rollupOptions: {
      replace: [
        // Replace process.env.MY_KEY with the actual key during build (optional)
        { 'process.env.MY_KEY': JSON.stringify(process.env.MY_KEY) },
      ],
    },
  },
});
