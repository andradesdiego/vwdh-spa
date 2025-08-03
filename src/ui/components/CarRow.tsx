import type { CarModel } from "@/domain/models/CarModel";
import { useCarStore } from "@/state/useCarStore";
import { deleteCarUseCase } from "@/application/use-cases/deleteCarUseCase";
import toast from "react-hot-toast";

type Props = {
  car: CarModel;
};

export function CarRow({ car }: Props) {
  const selectCar = useCarStore((s) => s.selectCar);
  const deleteCar = useCarStore((s) => s.deleteCar);

  const handleDelete = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    const confirmDelete = confirm(`¿Eliminar ${car.name}?`);
    if (!confirmDelete) return;

    try {
      await deleteCarUseCase(car.id);
      deleteCar(car.id);
      toast.success("Coche eliminado");
    } catch (error) {
      console.error("Error al eliminar:", error);
      toast.error("Error al eliminar el coche");
    }
  };

  return (
    <tr
      className="hover:bg-gray-700 text-sm transition-colors cursor-pointer"
      onClick={() => selectCar(car)}
    >
      <td className="p-3 border">{car.name}</td>
      <td className="p-3 border">{car.brand}</td>
      <td className="p-3 border">{car.year}</td>
      <td className="p-3 border">{car.fuelType}</td>
      <td className="p-3 border flex items-center justify-between gap-2">
        <span>{car.horsepower.getValue()}</span>
        <button
          onClick={handleDelete}
          className="text-red-600 hover:text-red-800 text-sm"
          title="Eliminar"
        >
          🗑️
        </button>
      </td>
    </tr>
  );
}
