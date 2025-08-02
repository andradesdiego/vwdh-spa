import type { CarModel } from "@/domain/models/CarModel";
import { useCarStore } from "@/state/useCarStore";

type Props = {
  car: CarModel;
};

export function CarRow({ car }: Props) {
  const selectCar = useCarStore((s) => s.selectCar);
  const deleteCar = useCarStore((s) => s.deleteCar);

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    const confirmDelete = confirm(`¿Eliminar ${car.name}?`);
    if (confirmDelete) deleteCar(car.id);
  };

  return (
    <tr
      className="hover:bg-gray-50 text-sm transition-colors cursor-pointer"
      onClick={() => selectCar(car)}
    >
      <td className="p-3 border">{car.name}</td>
      <td className="p-3 border">{car.brand}</td>
      <td className="p-3 border">{car.year}</td>
      <td className="p-3 border">{car.fuelType}</td>
      <td className="p-3 border flex items-center justify-between gap-2">
        <span>{car.horsepower}</span>
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
