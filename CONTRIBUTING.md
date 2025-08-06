# 🤝 Contributing to the VWDH-SPA Project

Thank you for your interest in contributing! This is a React-based Single Page Application structured with modern tools and clean architecture.

This guide explains how to set up the project, contribute effectively, and follow coding standards.

---

## 🛠️ Prerequisites

Before getting started, ensure you have:

- **Node.js** v18 or higher
- **npm** v9 or higher
- Git
- Basic familiarity with:
  - React + TypeScript
  - Zustand for state management
  - TailwindCSS
  - Vitest and Testing Library

---

## 🚀 Project Setup

Clone the repository and install dependencies:

```bash
git clone https://github.com/andradesdiego/vwdh-spa.git
cd vwdh-spa
npm install
```

To start the development server:

```bash
npm run dev
```

To start the development api:

```bash
npm run api
```

---

## 🔀 Git Workflow

1. Create a new branch from `master`:

```bash
git checkout -b feature/your-feature-name
```

2. Make your changes and ensure everything works:

```bash
npm run lint
npm run test
```

3. Commit changes using clear messages (see below)
4. Open a Pull Request with a concise summary of your changes

---

## ✅ Commit Guidelines

This project follows the [Conventional Commits](https://www.conventionalcommits.org/) specification:

| Type       | Use for                    |
| ---------- | -------------------------- |
| `feat`     | New feature                |
| `fix`      | Bug fix                    |
| `refactor` | Internal code improvement  |
| `test`     | Adding or updating tests   |
| `docs`     | Documentation changes only |

Example:

```bash
git commit -m "feat(form): allow editing car year"
```

---

## 🧪 Testing

All new features and components should include unit tests.

- Run all tests once:

  ```bash
  npm run test
  ```

- Run in watch mode:
  ```bash
  npm run test:watch
  ```

We use **Vitest** with **@testing-library/react** for component testing.

---

## 📦 Build & Preview

To create a production build:

```bash
npm run build
```

To preview the built app:

```bash
npm run preview
```

---

## 🧼 Linting

To check for lint issues:

```bash
npm run lint
```

The project uses ESLint configured for TypeScript + React.

---

## 🤖 Use of AI

This project was partially assisted by AI tools (e.g., ChatGPT) for productivity, but all code was reviewed, refactored, and validated manually to ensure quality and clarity.

---

Feel free to open an issue or a PR if you have any questions or suggestions.

Thanks for contributing! 🙌
