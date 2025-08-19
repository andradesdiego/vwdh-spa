import { motion } from "framer-motion";
import type { CarModel } from "@/domain/models/CarModel"; // ⬅️ usa CarModel
import { useCarStore } from "@/state/useCarStore";
import { deleteCarUseCase } from "@/application/use-cases/deleteCarUseCase";
import toast from "react-hot-toast";
import Trash from "@/ui/icons/Trash";

type Props = { car: CarModel }; // ⬅️ aquí

export function CarRow({ car }: Props) {
  const selectCar = useCarStore((s) => s.selectCar);
  const deleteCar = useCarStore((s) => s.deleteCar);
  const selectedCar = useCarStore((s) => s.selectedCar);
  const showConfirmDialog = useCarStore((s) => s.showConfirmDialog);

  const handleDelete = () => {
    showConfirmDialog(`¿Eliminar ${car.brand} ${car.name}?`, async () => {
      try {
        await deleteCarUseCase(car.id);
        deleteCar(car.id);
        toast.success(`Coche ${car.name} eliminado correctamente`);
      } catch (error) {
        console.error("Error al eliminar:", error);
        toast.error("Error al eliminar el coche");
      }
    });
  };

  return (
    <motion.tr
      layout
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -5 }}
      transition={{ duration: 0.4 }}
      onClick={() => selectCar(car)}
      className={`${
        selectedCar?.id === car.id ? "bg-gray-800" : "bg-gray-900"
      } hover:bg-gray-800 hover:bg-opacity-50 cursor-pointer transition-colors duration-200 text-sm border-b border-gray-800`}
    >
      <td className="p-3">{car.brand}</td>
      <td className="p-3">{car.name}</td>
      <td className="p-3 md:table-cell hidden">{car.year}</td>
      <td className="p-3 md:table-cell hidden">{car.fuelType}</td>
      <td className="p-3">{car.horsepower.toString()}</td>
      <td className="p-3 flex justify-center">
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleDelete();
          }}
          className="text-secondary hover:text-sec_hover text-sm"
          title="Eliminar"
        >
          <Trash color="currentColor" />
        </button>
      </td>
    </motion.tr>
  );
}
