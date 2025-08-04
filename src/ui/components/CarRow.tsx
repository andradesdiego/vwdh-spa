import { motion } from "framer-motion";
import type { CarDTO } from "@/infrastructure/dto/carDTO";
import { useCarStore } from "@/state/useCarStore";

type Props = {
  car: CarDTO;
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
    <motion.tr
      layout
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -5 }}
      transition={{ duration: 0.5 }}
      onClick={() => selectCar(car)}
      className="bg-gray-900 hover:bg-gray-700 cursor-pointer transition-colors duration-200 text-sm group border-b border-gray-800 hover:border-gray-600 "
    >
      <td className="p-3">{car.name}</td>
      <td className="p-3">{car.brand}</td>
      <td className="p-3">{car.year}</td>
      <td className="p-3">{car.fuelType}</td>
      <td className="p-3">{car.horsepower}</td>
      <td className="p-3">
        <button
          onClick={handleDelete}
          className="text-red-600 hover:text-red-800 text-sm transition-colors"
          title="Eliminar"
        >
          🗑️
        </button>
      </td>
    </motion.tr>
  );
}
