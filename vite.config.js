import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [react()],

    server: {
        proxy: {
            "/api": {
                target: "https://hostingcsebackend-50044872368.development.catalystappsail.in",
                changeOrigin: true,
                secure: true
            }
        }
    }
});