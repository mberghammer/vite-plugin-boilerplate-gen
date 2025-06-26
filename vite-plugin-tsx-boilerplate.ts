import type { Plugin } from "vite";
import { promises as fs } from "node:fs";
import path from "node:path";

export function tsxBoilerplatePlugin(options?: {
	/**
	 * Directories to watch for new .tsx files.
	 * Defaults to ['src']
	 */
	watchDirs?: string[];
}): Plugin {
	const watchDirs = options?.watchDirs || ["src"];

	// Resolve absolute paths for watched directories
	const absoluteWatchDirs = watchDirs.map((dir) =>
		path.resolve(process.cwd(), dir),
	);

	return {
		name: "vite-plugin-tsx-boilerplate",

		async configureServer(server) {
			server.watcher.on("add", async (filePath) => {
				// Check if the added file is a .tsx file and is within one of the watched directories
				const isTsxFile = filePath.endsWith(".tsx");
				const isInWatchedDir = absoluteWatchDirs.some((dir) =>
					filePath.startsWith(dir),
				);

				if (isTsxFile && isInWatchedDir) {
					const fileContent = await fs.readFile(filePath, "utf-8");

					// Only proceed if the file is truly empty or contains only whitespace/newlines
					if (fileContent.trim() === "") {
						const fileName = path.basename(filePath, ".tsx");
						// Basic camelCase conversion for component name (e.g., my-component -> MyComponent)
						const componentName = fileName
							.split("-")
							.map((part) => part.charAt(0).toUpperCase() + part.slice(1))
							.join("");

						const contentToInject = boilerplateContent(componentName);

						await fs.writeFile(filePath, contentToInject);

						// Trigger a full page reload to ensure Vite picks up the new file content.
						// For a newly created file, a full reload is often the most reliable way.
						server.ws.send({ type: "full-reload", path: "*" });
					}
				}
			});
		},
	};
}

// Default boilerplate for a React functional component
function boilerplateContent(componentName: string): string {
	return `import type React from 'react';

interface ${componentName}Props {
  // Define your props here
}

const ${componentName}: React.FC<${componentName}Props> = () => {
  return (
    <div class="component">
      <h1>Hello from ${componentName}!</h1>
    </div>
  );
};

export default ${componentName};
`;
}
