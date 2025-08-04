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
  const closeForm = useCarStore((s) => s.closeForm);
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
      closeForm();
    } catch (error) {
      toast.error("Error al guardar el coche");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 p-4 rounded bg-gray-900">
      <h2 className="px-4 text-lg font-semibold">
        {selectedCar
          ? `Editar coche: ${selectedCar.name}`
          : "Añadir nuevo coche"}
      </h2>

      <div className="space-y-4 gap-4 p-4 rounded">
        <label className="sr-only" htmlFor="brand">
          Marca
        </label>

        <input
          autoFocus
          id="brand"
          name="brand"
          placeholder="Marca"
          value={form.brand}
          onChange={handleChange}
          className="p-2 rounded placeholder-white bg-gray-800 text-white w-full shadow-md"
        />

        <label className="sr-only" htmlFor="name">
          Modelo
        </label>
        <input
          id="name"
          name="name"
          placeholder="Modelo"
          value={form.name}
          onChange={handleChange}
          className="p-2 rounded placeholder-white bg-gray-800 text-white w-full shadow-md"
        />

        <label className="sr-only" htmlFor="year">
          Año
        </label>
        <input
          id="year"
          name="year"
          placeholder="Año"
          type="number"
          value={form.year}
          onChange={handleChange}
          className="mb-4 p-2 rounded placeholder-white bg-gray-800 text-white w-full shadow-md"
        />

        <label className="sr-only mt-4" htmlFor="horsepower">
          Potencia
        </label>
        <input
          id="horsepower"
          name="horsepower"
          placeholder="Potencia"
          type="number"
          value={form.horsepower}
          onChange={handleChange}
          className="mt-2 p-2 rounded placeholder-white bg-gray-800 text-white w-full shadow-md"
        />
        <div className="flex flex-row items-center gap-2">
          <label className="mr-4" htmlFor="fuelType">
            Combustible
          </label>
          <select
            id="fuelType"
            name="fuelType"
            value={form.fuelType}
            onChange={handleChange}
            className="p-2 rounded placeholder-white bg-gray-800 text-white w-full shadow-md"
          >
            <option value="Gasoline" className="pr-4">
              Gasolina
            </option>
            <option value="Diesel">Diésel</option>
            <option value="Electric">Eléctrico</option>
            <option value="Hybrid">Híbrido</option>
          </select>
        </div>
      </div>
      <div className="flex gap-4 justify-end px-4 py-2">
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
            className="px-4 py-2 bg-gray-800 text-white shadow-md rounded hover:bg-gray-700"
          >
            Cancelar edición
          </button>
        )}
        <button
          type="button"
          onClick={closeForm}
          className="px-4 py-2 bg-gray-800 text-white shadow-md rounded hover:bg-gray-700"
        >
          Cerrar
        </button>
      </div>
    </form>
  );
}
