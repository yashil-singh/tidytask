import tailwindcss from "@tailwindcss/vite";
import { resolve } from "path";
import { defineConfig } from "vite";
import { sync } from "glob";

export default defineConfig({
  root: "./src",
  base: "/tidytask/",
  resolve: {
    alias: {
      "@js": resolve(__dirname, "src/assets/js"),
      "@controllers": resolve(__dirname, "server/controllers"),
    },
  },
  build: {
    outDir: "../dist",
    emptyDir: true,
    rollupOptions: {
      input: sync("./src/**/*.html".replace(/\\/g, "/")),
    },
  },
  plugins: [tailwindcss()],
  optimizeDeps: {
    include: ["jose"],
  },
  server: {
    hmr: false,
  },
});
