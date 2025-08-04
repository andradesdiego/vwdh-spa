import type { CarDTO } from "@/infrastructure/dto/carDTO";
import { useCarStore } from "@/state/useCarStore";
import { motion } from "framer-motion";

type Props = {
  car: CarDTO;
};

export function CarShowcase({ car }: Props) {
  const clearSelection = useCarStore((s) => s.clearSelection);
  return (
    <motion.div
      className="p-4 border rounded bg-gray-900 shadow-md"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 40 }}
      transition={{ duration: 0.3 }}
    >
      <div className="bg-gray-900 rounded shadow">
        <h2 className="text-xl font-semibold">{car.name}</h2>
        <p>
          <strong>Marca:</strong> {car.brand}
        </p>
        <p>
          <strong>Año:</strong> {car.year}
        </p>
        <p>
          <strong>Potencia:</strong> {car.horsepower} CV
        </p>
        <p>
          <strong>Combustible:</strong> {car.fuelType}
        </p>
        <button
          onClick={clearSelection}
          className="mt-4 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
        >
          Cerrar
        </button>
      </div>
    </motion.div>
  );
}
