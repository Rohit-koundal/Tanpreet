import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.svg", "apple-touch-icon.svg", "pwa-192.svg", "pwa-512.svg"],
      manifest: {
        name: "For Tanpreet",
        short_name: "Tanpreet",
        description: "A heartfelt and respectful birthday tribute created with beautiful memories and sincere wishes for Tanpreet.",
        theme_color: "#f6efe3",
        background_color: "#f6efe3",
        display: "standalone",
        scope: "/",
        start_url: "/",
        icons: [
          { src: "/pwa-192.svg", sizes: "192x192", type: "image/svg+xml", purpose: "any maskable" },
          { src: "/pwa-512.svg", sizes: "512x512", type: "image/svg+xml", purpose: "any maskable" }
        ]
      }
    })
  ]
});
