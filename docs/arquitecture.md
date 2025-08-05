# 🧱 Project Architecture – VWDH SPA

This document outlines the internal structure and architectural decisions of the VWDH-SPA project.

---

## 📁 Folder Structure

```
src/
├── domain/             # Business models and domain logic
│   └── models/         # e.g., CarModel.ts
├── state/              # Zustand store and state selectors
├── ui/                 # User interface components and pages
│   ├── components/     # Reusable UI elements (Form, Modal, Row)
│   └── pages/          # Page-level views (CarListPage)
├── main.tsx            # App entry point
└── index.css           # Tailwind base styles
```

---

## 🧠 Key Principles

- **Domain-Driven Design (DDD)**:
  Separation of concerns with domain logic isolated from presentation.

- **Modular State Management**:
  Zustand provides a simple and scalable way to manage state across components.

- **Reusable Components**:
  Forms, modals, tables, and detail views are reusable and composable.

- **TailwindCSS**:
  Rapid UI development with mobile-first responsive design.

- **Testing First**:
  Every key feature and component includes test coverage using Vitest and Testing Library.

---

## 🧩 State Management

- Store lives in `state/useCarStore.ts`
- Contains actions like `addCar`, `updateCar`, `deleteCar`, `selectCar`
- Selectors used to isolate store logic from UI

---

## ⚙️ Performance

- Code-splitting by Vite (default)
- Components use `React.memo` where relevant
- Zustand selectors prevent unnecessary re-renders

---

## 🌐 Scalability

This architecture supports:

- Adding more domains (e.g. Users, Maintenance, Rentals)
- Replacing Zustand with Redux Toolkit or other libraries
- Adding i18n or theme switcher with minimal changes

---

## 📌 Improvements

- Server-side persistence (e.g., JSON Server or API backend)
- CI/CD setup with GitHub Actions
- Accessibility audits and ARIA roles
- Improved form validation and error handling
