// eslint.config.js (Flat Config)
import js from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import tsParser from "@typescript-eslint/parser";
import prettier from "eslint-config-prettier";

/**
 * If you need built-in globals from standard environments
 * (e.g. Node, browser), you can import them from @eslint/js:
 */
// import { envs as builtInEnvs } from '@eslint/js';
// const nodeGlobals = builtInEnvs.node.globals;

export default [
	/**
	 * 1) Base JS config
	 */
	{
		files: ["src/**/*.{js,cjs,mjs}"],
		// Pull in ESLint’s built-in recommended config for JS
		...js.configs.recommended,

		languageOptions: {
			// Instead of "env: { es2021: true }", just set ecmaVersion
			ecmaVersion: "latest",
			sourceType: "module",

			/**
			 * Instead of `env: { node: true, browser: true, etc. }`,
			 * define relevant globals here. For example, for Node:
			 */
			// globals: {
			//   ...nodeGlobals,  // if you imported them above
			// },

			/**
			 * Or simply add custom globals like "fetch", "process", etc.:
			 */
			globals: {
				// e.g. fetch is read-only
				fetch: "readonly",
			},
		},
	},

	/**
	 * 2) TypeScript config
	 */
	{
		files: ["src/**/*.{d.ts,ts,cts,mts}"],
		languageOptions: {
			parser: tsParser,
			parserOptions: {
				ecmaVersion: "latest",
				sourceType: "module",
				project: "./tsconfig.json", // If needed for project-aware rules
			},
			/**
			 * Define your TS + Node globals here if needed:
			 */
			globals: {
				fetch: "readonly",
				// ...nodeGlobals
			},
		},
		plugins: {
			"@typescript-eslint": tseslint,
			"simple-import-sort": simpleImportSort,
		},
		rules: {
			// Start with TypeScript’s recommended:
			...tseslint.configs.recommended.rules,

			// Override or add rules here:
			"@typescript-eslint/no-unused-vars": "error",
			"@typescript-eslint/no-empty-interface": "error",
			"@typescript-eslint/no-shadow": "error",
			"@typescript-eslint/no-use-before-define": "off",
			"@typescript-eslint/no-explicit-any": "warn",

			// Plain ESLint or other plugin rules:
			"no-use-before-define": "off",
			"no-shadow": "off",
			"simple-import-sort/imports": "error",
			"simple-import-sort/exports": "error",
			"comma-dangle": ["error", "never"],
			"padded-blocks": "off",
			"arrow-body-style": "off",
			semi: ["error", "never"], // Disallow semicolons

			// Enforce tabs instead of spaces
			indent: ["error", "tab"],
			"no-mixed-spaces-and-tabs": "error",
			"no-tabs": "off",
		},
	},

	// Spread prettier LAST — it disables conflicting rules
	prettier,
];
