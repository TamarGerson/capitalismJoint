# Capitalism Notebook - Website Project

Welcome to the **Capitalism Notebook** frontend website project! 

This is a collaboration between a C++ developer (learning design/web development) and Antigravity (AI assistant). The goal is to build a high-quality, responsive, and visually stunning frontend website based on Figma designs, while learning React, TypeScript, and modern frontend practices step by step.

---

## 🛠️ Technology Stack
- **Framework:** React (using functional components and Hooks)
- **Language:** TypeScript (for type safety and compile-time checks)
- **Styling:** Vanilla CSS (written in a clean, organized, and reusable manner) or libraries as needed
- **Build Tool:** Vite (for fast development and hot-module replacement)
- **Component & Icon Libraries:** E.g., Lucide React (icons), Radix UI or similar headless libraries if needed to speed up building complex elements.

---

## 🎓 Learning & Development Workflow

To ensure you can follow along, understand the code, and learn web development concepts (mapping them from your C++ background), we will follow a strict, stepped workflow:

1. **Step-by-Step Layout:** We will divide the project into logical steps.
2. **Step Documentation (`/steps/X-[step-name].md`):** Before writing any code for a step, we will create a dedicated markdown file listing:
   - What the step achieves.
   - The key web/React concepts introduced (e.g., State, Props, CSS Layouts).
   - A detailed TODO checklist for that step.
3. **Figma Input:** You share the Figma design or object.
4. **Code Execution:** We implement the task, testing the results locally.
5. **Code Review & Explanation:** We discuss the code structure, comparing React/JS concepts to C++ paradigms where helpful (e.g., React components vs C++ classes, React state vs member variables, etc.).

---

## 📂 Project Structure

Once initiated, our workspace will be organized as follows:
```text
website/
├── README.md (This file)
├── package.json
├── tsconfig.json
├── vite.config.ts
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── index.css
│   ├── components/  # Reusable UI elements (Buttons, Cards, Inputs)
│   └── views/       # Page-level components
├── steps/
│   ├── 0-project-setup.md       # Setup instructions, dependency explanations
│   └── 1-interactive-canvas-and-videos.md   # Todo checklist & explanation for our first Figma object
```

---

## 🤝 Collaboration Agreement
- **No Backend:** This is a pure frontend, client-side application.
- **Local Execution:** The website is designed to run locally on your PC. All fonts, images, and videos are stored in the local file system.
- **Target Resolution:** The design is optimized for a **1920px × 1200px** screen size (standard landscape PC viewport).
- **No Ad-hoc Styles:** We will design a clean styling system (in `index.css`) rather than writing messy inline styles.
- **Learn as We Build:** We will halt after completing a step to review the code and concepts before moving on.
