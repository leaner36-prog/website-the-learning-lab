import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // NEXT_PUBLIC_ is accepted so the Supabase variables provided by the Vercel integration work without renaming.
  envPrefix: ['VITE_', 'NEXT_PUBLIC_'],
  server: {
    host: true,
    port: 3000,
    allowedHosts: true,
  },
});
