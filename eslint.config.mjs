import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      // Add rule overrides here
      // "@typescript-eslint/no-explicit-any": "error"
    },
  },
  {
    ignores: [".dev/**", "dist/**", "node_modules/**"],
  },
);
