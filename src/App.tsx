// src/App.tsx
import { lazy } from "react";
import { AppLayout } from "./Layout";

const CarListPage = lazy(() => import("@/ui/pages/CarListPage"));
const GlobalConfirmDialog = lazy(() =>
  import("./Layout").then((m) => ({ default: m.GlobalConfirmDialog }))
);

function App() {
  return (
    <div className="flex flex-col h-screen justify-between bg-gray-900 min-h-screen text-white">
      <AppLayout>
        <CarListPage />
        <GlobalConfirmDialog />
      </AppLayout>
    </div>
  );
}
export default App;
