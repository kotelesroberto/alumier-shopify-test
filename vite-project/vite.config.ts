import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        "onsale-badge": "src/onsale-badge/main.tsx",
      },
      output: {
        dir: "../assets",
        entryFileNames: "vite-[name].js",
        chunkFileNames: "vite-[name].js",
        assetFileNames: "vite-[name].[ext]",
      },
    },
    watch: {},
    emptyOutDir: false,
  },
});
