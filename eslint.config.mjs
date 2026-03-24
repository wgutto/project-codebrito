import globals from "globals";
import pluginJs from "@eslint/js";
import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import prettierConfig from "eslint-config-prettier";


export default [
  pluginJs.configs.recommended, // Configurações recomendadas do ESLint
  {
    files: ["**/*.ts", "**/*.tsx"], // Aplica apenas a arquivos TypeScript
    languageOptions: {
      globals: globals.node, // Define variáveis globais do Node.js
      ecmaVersion: 2021, // Usa ECMAScript 2021
      sourceType: "module", // Permite o uso de módulos ES
      parser: tsParser, // Usa o parser do TypeScript
    },
    plugins: {
      "@typescript-eslint": tsPlugin, // Usa o plugin do TypeScript
    },
    rules: {
      // Regras de estilo e boas práticas
      "@typescript-eslint/naming-convention": [
        "error",
        {
          selector: "variable", // Aplica a regra a variáveis
          format: ["camelCase", "PascalCase", "UPPER_CASE"], // Permite camelCase, PascalCase e UPPER_CASE
          leadingUnderscore: "allow", // Permite underscores no início (ex: _privateVar)
        },
      ],
      "max-len": ["warn", { code: 120, ignoreStrings: true, ignoreTemplateLiterals: true, ignoreComments: true }], // Limite de 120 caracteres
      "prefer-const": "error", // Exige o uso de 'const' para variáveis não reatribuídas
      "no-param-reassign": "error", // Proíbe a reatribuição de parâmetros de funções
      "no-console": "warn", // Avisa sobre o uso de console.log
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }], // Erro se uma variável não for usada (ignora _ no início)
      "no-var": "error", // Proíbe o uso de 'var'
      "no-multiple-empty-lines": ["error", { max: 1 }], // Limita linhas vazias consecutivas
    },
  },
  prettierConfig, // Desabilita regras do ESLint que conflitam com Prettier
  {
    ignores: [
      "node_modules/**",
      "dist/**",
      "build/**",
      "src/lib/generated/**",
    ],
  },
]; 