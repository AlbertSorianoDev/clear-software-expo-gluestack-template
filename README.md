# 🚀 Expo App Template – Enterprise Ready

This is a modern, production-ready **Expo (React Native)** boilerplate used in enterprise development, including:

- **expo-router** for navigation
- **Tailwind CSS** styling via NativeWind
- **Gluestack UI v2** for component-based UI
- **Zustand** for state management
- **Zod** for type-safe validations
- ESLint + Prettier + TailwindCSS + Example components

---

## 📁 Project Structure

```bash
src/
├── app/               # Routes using expo-router
├── components/        # Shared reusable UI components
├── features/          # Feature-specific logic and views
├── hooks/             # Custom React hooks
├── schemas/           # Zod validation schemas
├── store/             # Zustand state management
├── types/             # Global TypeScript types
```

---

# 🛠 VSCode Recommended Settings

Create the following file: `.vscode/settings.json`

```json
{
  // Use the new ESLint Flat config
  "eslint.useFlatConfig": true,

  // Auto formatting and import organization
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll": "always",
    "source.organizeImports": "always"
  },

  // Language validation
  "eslint.validate": ["javascript", "typescript", "typescriptreact"],

  // Import/closing tag suggestions
  "typescript.suggest.autoImports": true,
  "auto-close-tag.SublimeText3Mode": true,
  "auto-close-tag.insertSpaceBeforeSelfClosingTag": true,
  "editor.linkedEditing": true
}
```

---

# 💡 VSCode Extensions

The following extensions are highly recommended:

- ✅ React Native Tools

- ✅ Prettier – Code Formatter

- ✅ Tailwind CSS IntelliSense

- ✅ PostCSS Language Support

- ✅ ESLint

- ✅ Gluestack

- 🎯 Code Spell Checker (Optional)

- 🎨 Material Icon Theme (Optional)

- 🎨 Monokai Vibrant (Optional)

---

# 🎯 Prettier Configuration

Create a file named `.prettierrc` at the root of your project:

```json
{
  "printWidth": 100,
  "tabWidth": 2,
  "singleQuote": false,
  "bracketSameLine": false,
  "semi": true,
  "arrowParens": "always",
  "trailingComma": "all",
  "plugins": ["prettier-plugin-tailwindcss"],
  "tailwindAttributes": ["className"],
  "tailwindStylesheet": "./tailwind.config.ts",
  "tailwindFunctions": ["clsx", "tva"]
}
```

And add this `.prettierignore` to exclude unnecessary folders:

```bash
gitignore
Copy
Edit
node_modules
build
dist
.expo
.expo-shared
.vscode
public
assets
```
