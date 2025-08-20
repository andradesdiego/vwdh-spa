# VW Digital:Hub | DDD React SPA

## 📦 Project Overview

This project is a front-end web application (SPA) simulating a car catalogue for the Volkswagen Group. It follows Domain-Driven Design (DDD) principles and is built using React, TypeScript, Vite, TailwindCSS, and Zustand for state management. The app includes full CRUD operations powered by a mock API via JSON Server.

## 🚀 Features

- Display a list of cars
- Sort and search cars
- Add, update, and delete cars
- Modal form with validation
- Showcase selected car
- Full CRUD integration
- Fully typed with TypeScript
- State management with Zustand
- Architecture based on DDD: Domain / Application / Infrastructure / UI
- Unit & Integration Testing with Vitest and Testing Library
- Mocked API using JSON Server
- Github Actions - CI
- Vercel - CD

## 🧱 Tech Stack

- **React 18 + Vite** for fast dev experience
- **TypeScript** for static typing
- **TailwindCSS** for UI styling
- **Zustand** for global state
- **Vitest + React Testing Library** for testing
- **JSON Server** as mocked backend
- **DDD (Domain-Driven Design)** layered architecture

---

## 📦 Installation

```bash
git clone https://github.com/andradesdiego/vwdh-spa.git
cd vwdh-spa
npm install
```

## 📋 Running the Project

```bash
npm run dev
```

Visit `http://localhost:5173`.

## 🔌 Mock API with JSON Server

```bash
npm run api
```

Running in port 4000

## ✅ Testing

Run all tests:

```bash
npm run test
```

Watch mode:

```bash
npm run test:watch
```

---

## 🗂️ Architecture

- `domain/`: Entities, Value Objects
- `application/`: Use cases (business logic)
- `infrastructure/`: API and DTOs
- `ui/`: Components, pages, and styling
- `state/`: Global Zustand store

Please also visit dedicated file [arquitecture.md](/docs/arquitecture.md)

### 1. Repository Pattern

To decouple the application logic from data access and improve maintainability, we applied the **Repository Pattern**. All use cases (e.g., `fetchCarsUseCase`, `createCarUseCase`, etc.) depend on the domain-defined interface `CarRepository`. The actual implementation `CarApiRepository` is injected from infrastructure.

**Benefits:**

- 💡 **Separation of concerns**: Use cases know nothing about HTTP or persistence.
- 🔁 **Swap implementations easily**: The repository can switch from REST API to local storage or IndexedDB.
- 🧪 **Better testability**: Tests mock the repository instead of network calls.

### 2. HTTP Adapter

The actual HTTP logic (with `fetch`, `try/catch`, headers, etc.) is encapsulated in a dedicated file:
`src/infrastructure/http/http.car.ts`.

This adapter is used internally by `CarApiRepository` and contains all the side-effect logic.

```txt
use-cases/              ← Application layer
  fetchCarsUseCase.ts
  ...

domain/
  models/
  repositories/         ← CarRepository interface

infrastructure/
  http/http.car.ts      ← HTTP adapter with try/catch
  repositories/
    CarApiRepository.ts ← Implements CarRepository using http.car.ts
```

### 3. Test Strategy

All use cases are unit tested using mocked repositories (`CarApiRepository`).
We no longer mock `fetch` in those tests, ensuring:

- Less coupling to implementation
- Consistent behavior
- Better alignment with Clean Architecture principles

#### 🧪 Coverage

- Unit + integration tests for:

  - UI components
  - Store logic
  - Use cases
  - API adapters

- **Unit tests** for all use cases and business logic
- **Integration tests** for CarForm, DataTable, and UI interactions
- **Mocks** replace API calls in tests

Run tests:

```bash
npm run test
npm run test:watch
```

---

## 📑 DDD Refactors

### 🔹 Value Object: `Power`

Introduced a `Power` Value Object to encapsulate the `horsepower` field.

#### Why:

- Enforces that horsepower is a positive number.
- Can expose extra functionality like unit conversion or formatting (e.g. `"150 CV"`).
- Immutable and ensures better domain integrity.

```ts
const power = Power.create(150);
power.getValue(); // 150
power.toString(); // "150 CV"
```

#### Validation:

```ts
Power.create(-10); // Throws error
```

### 🔹 DTO: `CarDTO`

A `CarDTO` object has been created to separate domain (`CarModel`) from infrastructure.

#### Why:

- Prevents leaking domain logic to the API.
- Avoids serialization issues with complex types like `Power`.
- Makes testing easier by using plain objects.

#### Conversion helpers:

```ts
// Convert to domain
const model = toCarModel(dto);

// Convert to DTO
const dto = toCarDTO(model);
```

These are located in `infrastructure/dto/carDTO.ts`.

## 📐 Design Decisions

- Value objects introduced only where semantic domain value applies (e.g. `Power` for `horsepower`).
- DTOs help decouple external interfaces from internal domain.
- Zustand preferred over Redux for simplicity and flexibility.

## 🤖 AI Tool Usage

This project was developed using [ChatGPT](https://chat.openai.com/) and [GitHub Copilot] for productivity support.

- **ChatGPT** was used to:
  - Define initial architecture
  - Draft README and documentation
  - ChatGPT was used to scaffold architectural decisions, refine TypeScript types, and generate boilerplate logic for UI and tests.
  - Developer input focused on domain modeling (Volkswagen cars), DDD structure, and test refinement.
  - Generate test templates and DTO logic
  - Review and debug Value Object design
  - Developer made manual decisions on folder structure, implementation details, testing strategy, and DDD adherence.

All AI-generated code was reviewed and adjusted manually to meet best practices and project requirements.

---

## ♿ Accessibility & UX/UI Improvements

Throughout the development of the Volkswagen DDD React App, we incorporated several accessibility (a11y) and user experience (UX/UI) enhancements to ensure better usability across devices and user needs.

### ✅ Form Accessibility

- **Proper use of `<label>`**:
  - All form fields are now associated with visible or screen-reader-friendly `<label>` elements (`htmlFor` + `id`).
- **Improved keyboard navigation**:
  - Inputs are logically ordered and focusable.
- **Use of `required` and `aria-required`**:
  - Both HTML5 validation and ARIA attributes used for assistive technologies.
- **Semantic grouping with `<fieldset>` and `<legend>`**:
  - Helps screen readers contextualize related form fields.
- **Autocomplete hints**:
  - Added `autoComplete` attributes for better form completion.

### ✅ Table Improvements

- **Sortable table headers are now buttons**:
  - Replaced `<div>`s with `<button>` in `<th>` for full keyboard and screen reader support.
- **Added `scope="col"` to `<th>` elements**:
  - Improves semantics and accessibility.
- **Accessible search input**:
  - Paired with a visually hidden `<label>` and uses `aria-label` for clarity.
- **Responsive table layout**:
  - Table layout adapts to screen size with column visibility adjustments (`hidden md:table-cell`).

### ✅ Car Detail Responsiveness (`CarShowcase`)

- **Dual layout based on screen size**:
  - On **desktop**: `CarShowcase` appears to the right of the table in a sidebar layout.
  - On **mobile**: It slides in as a full-width overlay modal for focused interaction.
- **Accessible modal behavior on mobile**:
  - Includes `role="dialog"` and `aria-modal="true"` (ready for further enhancement).
- **"Editar" button on mobile**:
  - Allows seamless transition from viewing to editing a car, auto-loading the selected car into the form.

### 🔁 State-driven UI

- Interaction between `CarShowcase`, the form modal, and the table is managed via the Zustand store for consistent global state.

These improvements ensure that the app is more inclusive, user-friendly, and responsive across devices, aligning with modern web standards and accessibility guidelines.

---

## 🚀 CI/CD

Tests are integrated and designed for GitHub Actions CI pipeline. Automated Vercel deploy

### 🔁 CI/CD Pipeline with GitHub Actions + Vercel

#### ⚙️ GitHub Actions

A GitHub Actions workflow runs on every push or pull request to `master` or `development`:

- ✅ Lint (`npm run lint`)
- ✅ Tests (`npm run test`)
- ✅ Build (`npm run build`)

This ensures broken code never gets deployed.

#### 📄 Workflow: `.github/workflows/ci.yml`

```yaml
name: CI

on:
  push:
    branches: [master, development]
  pull_request:
    branches: [master, development]

jobs:
  build-and-test:
    runs-on: ubuntu-latest
    steps:
      - name: ⬇️ Checkout code
        uses: actions/checkout@v3

      - name: 🔧 Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: 22
          cache: "npm"

      - name: 📦 Install dependencies
        run: npm install

      - name: 🧹 Lint
        run: npm run lint

      - name: ✅ Test
        run: npm run test

      - name: 🏗️ Build
        run: npm run build
```

#### 📦 Added branch protection to master and development:

✅ Require passing status checks

✅ Block direct pushes

#### 🚀 Vercel Deployment

- Automatically deploys from `development` for PREVIEW environment via GitHub → Vercel integration

- Automatically deploys from `master` for PRODUCTION environment via GitHub → Vercel integration

---

### ✍️ Author

Diego Andrades | VW Digital:Hub – Senior Frontend Engineer Challenge
[andradesdiego@gmail.com]

### 📄 License

This project is for technical evaluation purposes only.
