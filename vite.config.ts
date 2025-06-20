import { defineConfig } from "vite";

export default defineConfig({
  build: {
    target: "esnext",
    rollupOptions: {
      external: /\.skel$/,
    },
  },
  server: {
    port: 3000,
    host: true,
    watch: {
      usePolling: true
    }
  },
  preview: {
    host: true,
    port: 8080,
  },
});
