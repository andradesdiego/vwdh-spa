# Volkswagen Group Car Catalog SPA

This is a Single Page Application (SPA) built with React, TypeScript, TailwindCSS and Zustand to manage a catalog of Volkswagen Group cars. It supports CRUD operations via a mocked REST API using JSON Server. The architecture follows DDD principles with a layered approach and a focus on Clean Code and maintainability.

---

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

---

## 🧠 Stack

- **Framework**: React 18 + Vite + TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Testing**: Vitest + Testing Library
- **Mock API**: JSON Server

---

## 📦 Installation

```bash
git clone https://github.com/andradesdiego/vwdh-spa.git
cd vwdh-spa
npm install
```

### Run dev server

```bash
npm run dev
```

### Run tests in watch mode

```bash
npm run test -- --watch
```

### Start JSON Server (mocked API)

```bash
npx json-server --watch db.json --port 4000
```

---

## 📐 Architectural Decisions

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

---

## 🤖 AI Tool Usage

This project was developed using [ChatGPT](https://chat.openai.com/) and [GitHub Copilot] for productivity support.

- ChatGPT was used to scaffold architectural decisions, refine TypeScript types, and generate boilerplate logic for UI and tests.
- Developer input focused on domain modeling (Volkswagen cars), DDD structure, and test refinement.

All AI-generated code was reviewed and adjusted manually to meet best practices and project requirements.

---

## 🧪 Testing

- **Unit tests** for all use cases and business logic
- **Integration tests** for CarForm, DataTable, and UI interactions
- **Mocks** replace API calls in tests

Run tests:

```bash
npm run test
```

---

## ✍️ Author

Diego Andrades [@andradesdiego]
Volkswagen Digital Hub – Frontend Challenge

---

## 📄 License

This project is for technical evaluation and not licensed for commercial use.

---

### @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

---

### @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

---

# Volkswagen DDD React App

## 📦 Project Overview

This project is a front-end web application simulating a car catalogue for the Volkswagen Group. It follows Domain-Driven Design (DDD) principles and is built using React, TypeScript, Vite, TailwindCSS, and Zustand for state management. The app includes full CRUD operations powered by a mock API via JSON Server.

## 🧱 Tech Stack

- **React 18 + Vite** for fast dev experience
- **TypeScript** for static typing
- **TailwindCSS** for UI styling
- **Zustand** for global state
- **Vitest + React Testing Library** for testing
- **JSON Server** as mocked backend
- **DDD (Domain-Driven Design)** layered architecture

## 🗂️ Architecture

- `domain/`: Entities, Value Objects
- `application/`: Use cases (business logic)
- `infrastructure/`: API and DTOs
- `ui/`: Components, pages, and styling
- `state/`: Global Zustand store

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

## 🤖 AI Tool Usage

- **ChatGPT** was used to:
  - Define initial architecture
  - Draft README and documentation
  - Generate test templates and DTO logic
  - Review and debug Value Object design
- Developer made manual decisions on folder structure, implementation details, testing strategy, and DDD adherence.

## 📐 Design Decisions

- Value objects introduced only where semantic domain value applies (e.g. `Power` for `horsepower`).
- DTOs help decouple external interfaces from internal domain.
- Zustand preferred over Redux for simplicity and flexibility.

## 📋 Running the Project

```bash
npm install
npm run dev
```

Visit `http://localhost:5173`.

## 🔌 Mock API with JSON Server

```bash
npx json-server --watch db.json --port 4000
```

## ✅ Testing

Run all tests:

```bash
npm run test
```

Watch mode:

```bash
npm run test:watch
```

## 🧪 Coverage

- Unit + integration tests for:
  - UI components
  - Store logic
  - Use cases
  - API adapters

## 🚀 CI/CD

- Tests are integrated and designed for future GitHub Actions CI pipeline.

## 👤 Author

Diego Andrades
