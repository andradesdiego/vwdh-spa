import { useEffect } from "react";
import { fetchCarsUseCase } from "@/application/use-cases/fetchCarsUseCase";
import { useCarStore } from "@/state/useCarStore";
import { DataTable } from "@/ui/components/DataTable";
import { CarForm } from "@/ui/components/CarForm";
import { Modal } from "@/ui/components/Modal";

export default function CarListPage() {
  const setCars = useCarStore((state) => state.setCars);
  const cars = useCarStore((state) => state.cars);

  const isFormOpen = useCarStore((s) => s.isFormOpen);
  const openForm = useCarStore((s) => s.openForm);
  const closeForm = useCarStore((s) => s.closeForm);

  useEffect(() => {
    fetchCarsUseCase()
      .then(setCars)
      .catch((err) => {
        console.error("Failed to load cars:", err);
        // aquí podrías setear un estado de error en el store si lo necesitas
      });
  }, [setCars]);

  return (
    <div className="bg-gray-900 p-6 space-y-6 min-h-screen">
      <h1 className="text-2xl font-bold">Catálogo Grupo Volkswagen</h1>
      <button
        onClick={openForm}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Añadir coche
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
