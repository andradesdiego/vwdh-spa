import type { CarDTO } from "@/infrastructure/dto/carDTO";
import { useCarStore } from "@/state/useCarStore";
import { motion } from "framer-motion";
import { useEffect } from "react";
import Button from "./Button";

type Props = {
  car: CarDTO;
};

export function CarShowcase({ car }: Props) {
  const clearSelection = useCarStore((s) => s.clearSelection);
  const openForm = useCarStore((s) => s.openForm);
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") clearSelection();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [clearSelection]);

  return (
    <motion.div
      className="p-4 border rounded shadow-sm border-secondary"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 40 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-col bg-gray-900 rounded shadow space-y-4 ">
        <h2 className="text-xl font-semibold">Marca: {car.brand}</h2>
        <p>
          <strong>Modelo:</strong> {car.name}
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
        <div className="flex justify-center">
          <div className="flex gap-4">
            <Button onClick={openForm} variant="primary" text="Editar" />
            <Button
              onClick={clearSelection}
              variant="secondary"
              text="Cerrar"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
