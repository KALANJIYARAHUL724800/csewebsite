import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "fs";
import path from "path";

export default defineConfig({
    plugins: [
        react(),
        {
            name: "local-image-mover",
            configureServer(server) {
                server.middlewares.use("/api/move-image", async (req, res) => {
                    if (req.method === "POST") {
                        let body = "";
                        req.on("data", (chunk) => (body += chunk));
                        req.on("end", () => {
                            try {
                                const { fileName, base64Data } = JSON.parse(body);

                                // Direct Public Path
                                const targetPath = path.join(
                                    process.cwd(),
                                    "public/uploads/testimonials",
                                    fileName
                                );

                                // Folder illana auto create pannum
                                fs.mkdirSync(path.dirname(targetPath), { recursive: true });

                                // File write panron
                                const buffer = Buffer.from(base64Data.split(",")[1], "base64");
                                fs.writeFileSync(targetPath, buffer);

                                res.statusCode = 200;
                                res.setHeader("Content-Type", "application/json");
                                res.end(
                                    JSON.stringify({
                                        success: true,
                                        url: `/uploads/testimonials/${fileName}`,
                                    })
                                );
                            } catch (err) {
                                res.statusCode = 500;
                                res.end(JSON.stringify({ error: err.message }));
                            }
                        });
                    }
                });
            },
        },
    ],

    server: {
        proxy: {
            "/api": {
                target: "https://hostingcsebackend-50044872368.development.catalystappsail.in ",
                changeOrigin: true,
                secure: true,
            },
        },
    },
});