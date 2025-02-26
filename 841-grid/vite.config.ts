import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  json: {
    stringify: true,
  },
  assetsInclude: ["**/*.json"],
  publicDir: "src/data",
});
