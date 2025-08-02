import CarListPage from "@/ui/pages/CarListPage";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Toaster position="top-right" />
      <CarListPage />
    </>
  );
}

export default App;
