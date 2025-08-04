import CarListPage from "@/ui/pages/CarListPage";
import { Toaster } from "react-hot-toast";
import Footer from "./ui/components/Footer";

function App() {
  return (
    <div className="flex flex-col h-screen justify-between bg-gray-900 min-h-screen text-white">
      <Toaster position="top-right" />
      <main className="">
        <CarListPage />
      </main>
      <Footer />
    </div>
  );
}

export default App;
