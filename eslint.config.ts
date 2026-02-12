import globals from "globals";
import tseslint from "typescript-eslint";
import pluginVue from "eslint-plugin-vue";
import { defineConfig } from "eslint/config";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
export default defineConfig([
  // 1. 忽略文件 (等价于以前的 .eslintignore)
  { ignores: ["node_modules", "dist", "public"] },
  tseslint.configs.recommended,
  ...pluginVue.configs["flat/essential"],
  eslintPluginPrettierRecommended,
  {
    files: ["**/*.{js,mjs,cjs,ts,vue}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021,
        jest: true, // 对应对方配置中的 jest: true
        node:true,
      },
      parserOptions: {
        parser: tseslint.parser, // 解析 <script> 里的 TS
        jsx: true,
      },
    },
  },
  {
    rules: {
      // ESLint 基础规则
      // eslint（https://eslint.bootcss.com/docs/rules/）
      "no-var": "error",
      "no-multiple-empty-lines": ["warn", { max: 1 }],
      "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
      "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
      "no-unexpected-multiline": "error",
      "no-useless-escape": "off",

      // TypeScript 相关规则
      // typeScript (https://typescript-eslint.io/rules)
      "@typescript-eslint/no-unused-vars": "error",
      "@typescript-eslint/prefer-ts-expect-error": "error",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-non-null-assertion": "off",
      "@typescript-eslint/no-namespace": "off",
      "@typescript-eslint/semi": "off",

      // Vue 相关规则
       // eslint-plugin-vue (https://eslint.vuejs.org/rules/)
      "vue/multi-word-component-names": "off",
      "vue/no-mutating-props": "off",
      "vue/attribute-hyphenation": "off",
    },
  }
]);
