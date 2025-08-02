import { useEffect } from "react";
import { useCarStore } from "@/state/useCarStore";
import { DataTable } from "@/ui/components/DataTable";
import { CarForm } from "@/ui/components/CarForm";
import { Modal } from "@/ui/components/Modal";

export default function CarListPage() {
  const fetchCars = useCarStore((state) => state.fetchCars);
  const isFormOpen = useCarStore((s) => s.isFormOpen);
  const openForm = useCarStore((s) => s.openForm);
  const closeForm = useCarStore((s) => s.closeForm);

  useEffect(() => {
    fetchCars();
  }, []);

  return (
    <div className="p-6 space-y-6">
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
