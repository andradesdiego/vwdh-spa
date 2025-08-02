import { useEffect, useState } from "react";
import { useCarStore } from "@/state/useCarStore";
import type { CarModel } from "@/domain/models/CarModel";

interface CarFormProps {
  onSubmit?: (data: Partial<CarModel>) => void;
}

export function CarForm({ onSubmit }: CarFormProps) {
  const addCar = useCarStore((s) => s.addCar);
  const updateCar = useCarStore((s) => s.updateCar);
  const selectedCar = useCarStore((s) => s.selectedCar);
  const clearSelection = useCarStore((s) => s.clearSelection);

  const [form, setForm] = useState({
    name: "",
    brand: "",
    year: "",
    fuelType: "Gasoline",
    horsepower: "",
  });

  useEffect(() => {
    if (selectedCar) {
      setForm({
        name: selectedCar.name,
        brand: selectedCar.brand,
        year: String(selectedCar.year),
        fuelType: selectedCar.fuelType,
        horsepower: String(selectedCar.horsepower),
      });
    }
  }, [selectedCar]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name || !form.brand || !form.year || !form.horsepower) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    const data = {
      name: form.name,
      brand: form.brand,
      year: Number(form.year),
      fuelType: form.fuelType as CarModel["fuelType"],
      horsepower: Number(form.horsepower),
    };

    if (selectedCar) {
      updateCar({ ...selectedCar, ...data });
    } else {
      addCar(data);
    }

    onSubmit?.(data);

    setForm({
      name: "",
      brand: "",
      year: "",
      fuelType: "Gasoline",
      horsepower: "",
    });

    clearSelection();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-3 mb-6 p-4 border rounded bg-white shadow-sm"
    >
      <h2 className="text-lg font-semibold">
        {selectedCar
          ? `Editar coche: ${selectedCar.name}`
          : "Añadir nuevo coche"}
      </h2>

      <div className="grid grid-cols-2 gap-4">
        <label htmlFor="name">Nombre</label>
        <input
          id="name"
          name="name"
          placeholder="Nombre"
          value={form.name}
          onChange={handleChange}
          className="p-2 border rounded"
        />

        <label htmlFor="brand">Marca</label>
        <input
          id="brand"
          name="brand"
          placeholder="Marca"
          value={form.brand}
          onChange={handleChange}
          className="p-2 border rounded"
        />

        <label htmlFor="year">Año</label>
        <input
          id="year"
          name="year"
          placeholder="Año"
          type="number"
          value={form.year}
          onChange={handleChange}
          className="p-2 border rounded"
        />

        <label htmlFor="horsepower">Potencia</label>
        <input
          id="horsepower"
          name="horsepower"
          placeholder="Potencia"
          type="number"
          value={form.horsepower}
          onChange={handleChange}
          className="p-2 border rounded"
        />

        <label htmlFor="fuelType" className="col-span-2">
          Combustible
        </label>
        <select
          id="fuelType"
          name="fuelType"
          value={form.fuelType}
          onChange={handleChange}
          className="p-2 border rounded col-span-2"
        >
          <option value="Gasoline">Gasolina</option>
          <option value="Diesel">Diésel</option>
          <option value="Electric">Eléctrico</option>
          <option value="Hybrid">Híbrido</option>
        </select>
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {selectedCar ? "Actualizar" : "Guardar"}
        </button>

        {selectedCar && (
          <button
            type="button"
            onClick={clearSelection}
            className="px-4 py-2 text-sm text-gray-600 underline"
          >
            Cancelar edición
          </button>
        )}
      </div>
    </form>
  );
}
