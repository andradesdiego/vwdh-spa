import { useState } from "react";
import { useCarStore } from "@/state/useCarStore";

export function CarForm() {
  const addCar = useCarStore((s) => s.addCar);

  const [form, setForm] = useState({
    name: "",
    brand: "",
    year: "",
    fuelType: "Gasoline",
    horsepower: "",
  });

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

    addCar({
      name: form.name,
      brand: form.brand,
      year: Number(form.year),
      fuelType: form.fuelType as any,
      horsepower: Number(form.horsepower),
    });

    setForm({
      name: "",
      brand: "",
      year: "",
      fuelType: "Gasoline",
      horsepower: "",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-3 mb-6 p-4 border rounded bg-white shadow-sm"
    >
      <h2 className="text-lg font-semibold">Añadir nuevo coche</h2>

      <div className="grid grid-cols-2 gap-4">
        <input
          name="name"
          placeholder="Nombre"
          value={form.name}
          onChange={handleChange}
          className="p-2 border rounded"
        />
        <input
          name="brand"
          placeholder="Marca"
          value={form.brand}
          onChange={handleChange}
          className="p-2 border rounded"
        />
        <input
          name="year"
          placeholder="Año"
          type="number"
          value={form.year}
          onChange={handleChange}
          className="p-2 border rounded"
        />
        <input
          name="horsepower"
          placeholder="CV"
          type="number"
          value={form.horsepower}
          onChange={handleChange}
          className="p-2 border rounded"
        />
        <select
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

      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Guardar
      </button>
    </form>
  );
}
