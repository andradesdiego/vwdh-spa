# 🚗 VWDH SPA – React Frontend Challenge

This is a single-page application (SPA) built with **React**, **TypeScript**, **Vite**, **Zustand**, and **TailwindCSS**, developed as part of a technical challenge. The app manages a catalog of Volkswagen Group cars and demonstrates clean code, modern UI/UX, testing, and architectural clarity.

---

## 📦 Features

- View, search, sort, add, edit, and delete cars
- Showcase panel for selected car details
- Modal-based form with validation
- Zustand for global state management
- Fully responsive layout using TailwindCSS
- Unit-tested components and store
- Domain-Driven Design (DDD) folder structure

---

## 🚀 Getting Started

```bash
# Clone the repository
git clone https://github.com/your-username/vwdh-spa.git
cd vwdh-spa

# Install dependencies
npm install

# Run development server
npm run dev
```

---

## 🧪 Testing

```bash
# Run tests once
npm run test

# Run tests in watch mode
npm run test:watch
```

Tested with:

- Vitest
- @testing-library/react
- @testing-library/jest-dom

All components and state logic are covered.

---

## 🧠 Tech Stack & Decisions

| Category     | Tool                     | Reason                                             |
| ------------ | ------------------------ | -------------------------------------------------- |
| UI Framework | React                    | Declarative, component-based architecture          |
| Bundler      | Vite                     | Fast dev/build, native ESM support                 |
| Language     | TypeScript               | Type safety and maintainability                    |
| State        | Zustand                  | Minimal, scalable, easy to test                    |
| Styling      | TailwindCSS              | Utility-first, responsive by default               |
| Testing      | Vitest + Testing Library | Fast, modern, supports jsdom and hooks             |
| Architecture | DDD                      | Clear separation of concerns between domain and UI |

---

## 🗂️ Folder Structure

```
src/
├── domain/             # Business models (e.g., CarModel)
├── state/              # Zustand store and actions
├── ui/                 # Components and views
│   ├── components/     # Reusable UI elements
│   └── pages/          # Main screen/page
├── main.tsx            # App entry point
└── index.css           # TailwindCSS config
```

---

## 🌐 Accessibility & Responsiveness

- Mobile-first layout using Tailwind's responsive utilities
- Components are keyboard-accessible
- Semantics and ARIA roles considered where appropriate

---

## 🤖 AI Tool Usage

AI-assisted development was used to:

- Draft boilerplate and improve setup speed
- Generate test case scaffolding
- Explain complex TypeScript or React errors

However, **all logic and architecture were fully authored and reviewed by the developer** to ensure quality, maintainability, and relevance.

---

## 📑 Documentation

- [CONTRIBUTING.md](./CONTRIBUTING.md) – Git workflow, commit rules, testing
- [CHANGELOG.md](./CHANGELOG.md) – Version history
- [architecture.md](./docs/architecture.md) – Architecture & structure overview

---

## 👤 Author

**Full name:** _[Diego Andrades]_
[GitHub Profile](https://github.com/andradesdiego)

---

## 📜 License

This project is provided for educational and assessment purposes.
