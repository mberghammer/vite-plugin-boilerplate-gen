import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { tsxBoilerplatePlugin } from "./vite-plugin-tsx-boilerplate"; // Adjust path if needed

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		react(),
		tsxBoilerplatePlugin({
			// watchDirs: ['src/components'],
			// },
		}),
	],
});
