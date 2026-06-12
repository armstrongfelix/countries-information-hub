import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react()],
  server: {
    proxy: {
      "/api/countries": {
        target: "https://api.restcountries.com",
        changeOrigin: true,
        rewrite: (path) => {
          const qs = path.includes("?") ? path.split("?")[1] : "";
          const params = new URLSearchParams(qs);
          const offset = params.get("offset") || "0";
          return `/countries/v5?limit=100&api-key=rc_live_5fd9d335af0e42b29c0fb305b121579e&offset=${offset}`;
        },
      },
    },
  },
});
