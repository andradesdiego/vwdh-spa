import { CarDTO } from "@/infrastructure/dto/carDTO";

const BASE_URL = "https://vwdh.vercel.app/api/car-model";
// const BASE_URL = "http://localhost:4173/api/car-model";

export async function getAll(): Promise<CarDTO[]> {
  const res = await fetch(BASE_URL);
  return res.json();
}

export async function create(dto: CarDTO): Promise<CarDTO> {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dto),
  });
  return res.json();
}

export async function update(dto: CarDTO): Promise<CarDTO> {
  const res = await fetch(`${BASE_URL}?id=${dto.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dto),
  });
  return res.json();
}

export async function remove(id: number): Promise<void> {
  await fetch(`${BASE_URL}?id=${id}`, { method: "DELETE" });
}
