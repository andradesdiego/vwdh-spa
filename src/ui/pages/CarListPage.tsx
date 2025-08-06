import { useEffect } from "react";
import { fetchCarsUseCase } from "@/application/use-cases/fetchCarsUseCase";
import { useCarStore } from "@/state/useCarStore";
import { DataTable } from "@/ui/components/DataTable";
import { CarForm } from "@/ui/components/CarForm";
import { Modal } from "@/ui/components/Modal";
import toast from "react-hot-toast";
import { toCarDTO } from "@/infrastructure/dto/carDTO";
import Button from "../components/Button";

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
    <div className="bg-gray-900 lg:mx-12 pb-4">
      <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 justify-between items-center sticky top-0 z-10 bg-gray-900 py-6 border-b border-gray-500">
        <div className="flex flex-col lg:flex-row items-center justify-center lg:space-x-12 space-y-2 lg:space-y-0">
          <img
            className="w-48 lg:w-72"
            src="https://assets.vw-mms.de/assets/images/cws/volkswagen_group_logo-YD6OYBJM.svg"
            alt="vw group logo"
          ></img>
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
