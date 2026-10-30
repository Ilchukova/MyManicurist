import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import process from "node:process";

export default defineConfig({
  base: process.env.GITHUB_ACTIONS === "true" ? "/MyManicurist/" : "/",
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  server: {
    host: true,
    port: 5173,
    open: false,
    strictPort: true,
    watch: {
      usePolling: !!process.env.CHOKIDAR_USEPOLLING,
    },
    proxy: {
      "/api": {
        target: process.env.VITE_API_PROXY_TARGET ?? "http://127.0.0.1:3000",
        changeOrigin: true,
      },
    },
  },
});