import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: "/Card-Track/", // ⭐ MOST IMPORTANT FOR GITHUB PAGES

  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: false,

      pwaAssets: {
        disabled: false,
        config: true,
      },

      manifest: {
        name: "CardTrack",
        short_name: "CardTrack",
        description: "Manage Loans and Wallet",
        theme_color: "#ffffff",
        start_url: "/Card-Track/",
        scope: "/Card-Track/",
        display: "standalone",
      },

      workbox: {
        globPatterns: ["**/*.{js,css,html,svg,png,ico}"],
        cleanupOutdatedCaches: true,
        clientsClaim: true,
      },

      devOptions: {
        enabled: false,
        navigateFallback: "index.html",
        suppressWarnings: true,
        type: "module",
      },
    }),
  ],

  build: {
    outDir: "docs", // ⭐ REQUIRED because GitHub Pages uses /docs
  },
});
