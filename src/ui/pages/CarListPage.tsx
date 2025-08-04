import { useEffect } from "react";
import { fetchCarsUseCase } from "@/application/use-cases/fetchCarsUseCase";
import { useCarStore } from "@/state/useCarStore";
import { DataTable } from "@/ui/components/DataTable";
import { CarForm } from "@/ui/components/CarForm";
import { Modal } from "@/ui/components/Modal";
import toast from "react-hot-toast";
import { toCarDTO } from "@/infrastructure/dto/carDTO";

export default function CarListPage() {
  const setCars = useCarStore((state) => state.setCars);
  const isFormOpen = useCarStore((s) => s.isFormOpen);
  const openForm = useCarStore((s) => s.openForm);
  const closeForm = useCarStore((s) => s.closeForm);
  const selectedCar = useCarStore((s) => s.selectedCar);
  useEffect(() => {
    fetchCarsUseCase()
      .then((cars) => setCars(cars.map(toCarDTO))) // ✅ conversión aquí
      .catch((err) => {
        console.error("Failed to load cars:", err);
        toast.error("Error al cargar los coches");
        setCars([]); // Limpia la lista en caso de error
      });
  }, [setCars]);

  return (
    <div className="bg-gray-900 lg:my-6 lg:mx-12 p-6 space-y-6 min-h-screen">
      <h1 className="text-2xl font-bold">Catálogo Grupo Volkswagen</h1>
      <button
        onClick={openForm}
        className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
      >
        {selectedCar ? "Editar coche" : "Añadir coche"}
      </button>
      <DataTable />
      {isFormOpen && (
        <Modal onClose={closeForm}>
          <CarForm />
        </Modal>
      )}
    </div>
  );
}
