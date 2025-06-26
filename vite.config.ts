import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { tsxBoilerplatePlugin } from "./vite-plugin-tsx-boilerplate"; // Adjust path if needed

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		react(),
		tsxBoilerplatePlugin({
			// Optional: Specify directories to watch (defaults to ['src'])
			// watchDirs: ['src/components', 'src/pages'],
			// Optional: Provide a custom boilerplate function
			// getBoilerplateContent: (filePath, componentName) => {
			//   return `// Custom boilerplate for ${componentName}
			//   import React from 'react';
			//   export const ${componentName} = () => <div>${componentName}</div>;
			//   `;
			// },
		}),
	],
});
