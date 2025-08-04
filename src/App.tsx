import CarListPage from "@/ui/pages/CarListPage";
import { Toaster } from "react-hot-toast";
import Footer from "./ui/components/Footer";
import Header from "./ui/components/Header";

function App() {
  return (
    <main className="bg-gray-900 min-h-screen text-white">
      <Toaster position="top-right" />
      <Header />
      <CarListPage />
      <Footer />
    </main>
  );
}

export default App;
