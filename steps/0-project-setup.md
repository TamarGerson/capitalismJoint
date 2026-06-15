# Step 0: Project Setup

In this step, we initialize our React + TypeScript frontend application using Vite. We will set up the project structure, review the files created, and ensure the development server runs correctly.

---

## 💡 Concepts for a C++ Developer

If you come from a C++ background, here is how the React + TypeScript ecosystem maps to concepts you know:

| Web / React / TS Concept | C++ Equivalent / Analogy | Explanation |
| :--- | :--- | :--- |
| **`package.json`** | `CMakeLists.txt` or `.vcxproj` | Defines project metadata, build scripts, and external package dependencies. |
| **`vite.config.ts`** | Compiler Flags / Makefile config | Configures the build tool, plugins, and development server. |
| **TypeScript (`.ts` / `.tsx`)** | Statically-Typed C++ | Compiles down to dynamic JavaScript, but adds static typing (like C++) for compile-time safety. |
| **React Component (`.tsx`)** | Class or Struct representing a UI widget | A self-contained, reusable block of UI. The JSX/TSX syntax allows writing HTML-like code directly in TypeScript. |
| **Vite Dev Server** | Hot-Reloading Debug Target | Runs a local web server that instantly compiles and refreshes your browser when files change, so you don't need a slow compile-link-run loop. |

---

## 📋 TODO Checklist

- [x] Run Vite initialization command (`npx create-vite@latest ./ --template react-ts`)
- [x] Install package dependencies (`npm install`)
- [x] Install standard icon and utility libraries (e.g. `lucide-react`)
- [x] Inspect the generated directory structure and clean up default boilerplate code
- [x] Run the local development server (`npm run dev`) and verify it opens in the browser

---

## 🔍 How to complete this step
This step was successfully executed. The codebase is fully configured, tested, and ready. In the next step, we will start building our interactive canvas and components!
