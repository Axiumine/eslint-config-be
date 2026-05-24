// eslint.config.js
import tseslint from "typescript-eslint";
import js from "@eslint/js";
import prettier from "eslint-config-prettier";

// ...

export default tseslint.config(
	{ ignores: ["node_modules/**", "dist/**", "coverage/**"] },
	{
		extends: [
			js.configs.recommended,
			...tseslint.configs.recommended,
			prettier,
		],
	},
	{
		files: ["src/**/*.mts"],
		// ...
	},
);
