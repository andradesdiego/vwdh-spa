import { useEffect, useState } from "react";
import { useCarStore } from "@/state/useCarStore";
import type { CarModel } from "@/domain/models/CarModel";
import { createCarUseCase } from "@/application/use-cases/createCarUseCase";
import toast from "react-hot-toast";
import { updateCarUseCase } from "@/application/use-cases/updateCarUseCase";
import { Power } from "@/domain/value-objects/Power";
import { toCarDTO } from "@/infrastructure/dto/carDTO";

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
    horsepower: "", // mantener como string para facilitar el binding
  });

  const resetForm = () => {
    setForm({
      name: "",
      brand: "",
      year: "",
      fuelType: "Gasoline",
      horsepower: "",
    });
  };

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !form.name ||
      !form.brand ||
      !form.year ||
      !form.horsepower ||
      isNaN(Number(form.horsepower))
    ) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    const data: Omit<CarModel, "id"> = {
      name: form.name,
      brand: form.brand,
      year: Number(form.year),
      fuelType: form.fuelType as CarModel["fuelType"],
      horsepower: Power.create(Number(form.horsepower)),
    };

    try {
      if (selectedCar) {
        const updatedCar = await updateCarUseCase({ ...selectedCar, ...data });
        updateCar(toCarDTO(updatedCar));
        toast.success("Coche actualizado con éxito");
      } else {
        const createdCar = await createCarUseCase(data);
        addCar(toCarDTO(createdCar));
        toast.success("Coche añadido con éxito");
      }

      onSubmit?.(data);
      clearSelection();
      resetForm();
    } catch (error) {
      toast.error("Error al guardar el coche");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-3 mb-6 p-4 border rounded bg-gray-600 shadow-sm"
    >
      <h2 className="text-lg font-semibold">
        {selectedCar
          ? `Editar coche: ${selectedCar.name}`
          : "Añadir nuevo coche"}
      </h2>

      <div className="grid grid-cols-2 gap-4 bg-gray-600 p-4 rounded  ">
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

        <label htmlFor="fuelType">Combustible</label>
        <select
          id="fuelType"
          name="fuelType"
          value={form.fuelType}
          onChange={handleChange}
          className="p-2 border rounded"
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
          className="px-4 py-2 bg-gray-800 text-white shadow-md rounded hover:bg-gray-700"
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
        {/* <button
          type="button"
          onClick={closeForm}
          className="px-4 py-2 text-sm text-gray-600 underline"
        >
          Cerrar
        </button> */}
      </div>
    </form>
  );
}
