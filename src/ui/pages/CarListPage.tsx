import { useEffect } from "react";
import { fetchCarsUseCase } from "@/application/use-cases/fetchCarsUseCase";
import { useCarStore } from "@/state/useCarStore";
import { DataTable } from "@/ui/components/DataTable";
import { CarForm } from "@/ui/components/CarForm";
import { Modal } from "@/ui/components/Modal";
import toast from "react-hot-toast";
import Button from "../components/Button";

const USE_V2 = import.meta.env.VITE_USE_ENTITY === "true";

export default function CarListPage() {
  const setCars = useCarStore((s) => s.setCars);
  const load = useCarStore((s) => s.load); // acción async V2
  const isFormOpen = useCarStore((s) => s.isFormOpen);
  const openForm = useCarStore((s) => s.openForm);
  const closeForm = useCarStore((s) => s.closeForm);
  const selectedCar = useCarStore((s) => s.selectedCar);

  useEffect(() => {
    let cancelled = false;

    const bootstrap = async () => {
      try {
        if (USE_V2) {
          // Ruta nueva (Entidad + Repo V2)
          await load();
          return;
        }
        // Ruta legacy (V1)
        const cars = await fetchCarsUseCase();
        if (!cancelled) setCars(cars);
      } catch (err) {
        // Fallback: si V2 falla, intenta V1
        if (USE_V2) {
          try {
            const cars = await fetchCarsUseCase();
            if (!cancelled) setCars(cars);
            return;
          } catch (e2) {
            console.error("Failed to load cars (V2 & V1):", e2);
          }
        } else {
          console.error("Failed to load cars (V1):", err);
        }
        if (!cancelled) {
          toast.error("Error al cargar los coches");
          setCars([]);
        }
      }
    };

    bootstrap();
    return () => {
      cancelled = true;
    };
  }, [load, setCars]);

  return (
    <div className="bg-gray-900 lg:mx-12 pb-4">
      <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 justify-between items-center sticky top-0 z-10 bg-gray-900 py-6 border-b border-gray-500">
        <div className="flex flex-col lg:flex-row items-center justify-center lg:space-x-12 space-y-2 lg:space-y-0">
          <img
            className="w-48 lg:w-72"
            src="https://assets.vw-mms.de/assets/images/cws/volkswagen_group_logo-YD6OYBJM.svg"
            alt="vw group logo"
          />
          <h1 className="hidden lg:inline-flex text-xl text-gray-100 font-bold">
            Catálogo Grupo Volkswagen
          </h1>
        </div>
        {!selectedCar && (
          <Button onClick={openForm} variant="primary" text="Añadir coche" />
        )}
      </div>

      <DataTable />

      {isFormOpen && (
        <Modal onClose={closeForm}>
          <CarForm />
        </Modal>
      )}
    </div>
  );
}
