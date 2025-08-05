import CarListPage from "@/ui/pages/CarListPage";
import { AppLayout, GlobalConfirmDialog } from "./Layout";

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
