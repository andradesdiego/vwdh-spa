// api/cars.ts
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { readFileSync, writeFileSync } from "fs";
import path from "path";

/** Tipos "locales" a la Function (no importan de src/) */
type FuelType = "gasoline" | "diesel" | "electric" | "hybrid" | string;

export type CarDTO = {
  id: number;
  name: string;
  brand: string;
  year: number;
  fuelType: FuelType;
  horsepower: number;
};

const DB_PATH = path.join(process.cwd(), "db.json");

/** Carga síncrona del JSON (semilla). */
function loadDB(): { cars: CarDTO[] } {
  const raw = readFileSync(DB_PATH, "utf8");
  return JSON.parse(raw) as { cars: CarDTO[] };
}

/** ⚠️ Nota: en serverless, escribir archivo no persiste entre despliegues/reinicios.
 *  Lo dejo solo para simular un flujo completo. Si quieres persistir, usa Vercel Blob (ver sección 4).
 */
function saveDB(db: { cars: CarDTO[] }) {
  try {
    writeFileSync(DB_PATH, JSON.stringify(db, null, 2), "utf8");
  } catch {
    // Ignora errores en prod (FS no persistente)
  }
}

/** "BD" en memoria por instancia (se resetea en frío). */
let memory = loadDB();

export default function handler(req: VercelRequest, res: VercelResponse) {
  const { method, query, body } = req;
  const id = query.id ? Number(query.id) : undefined;

  switch (method) {
    case "GET": {
      if (id != null && !Number.isNaN(id)) {
        const car = memory.cars.find((c) => c.id === id);
        return car
          ? res.status(200).json(car)
          : res.status(404).json({ error: "Not found" });
      }
      return res.status(200).json(memory.cars);
    }

    case "POST": {
      try {
        if (!body || !body.name || !body.brand) {
          return res.status(400).json({ error: "Invalid payload" });
        }
        const newCar: CarDTO = {
          id: Date.now(),
          name: body.name,
          brand: body.brand,
          year: Number(body.year) || new Date().getFullYear(),
          fuelType: String(body.fuelType || "gasoline"),
          horsepower: Number(body.horsepower || 0),
        };
        memory.cars.push(newCar);
        saveDB(memory);
        return res.status(201).json(newCar);
      } catch (e: any) {
        return res.status(400).json({ error: e?.message || "Bad Request" });
      }
    }

    case "PUT": {
      if (!id || Number.isNaN(id))
        return res.status(400).json({ error: "ID required" });
      const index = memory.cars.findIndex((c) => c.id === id);
      if (index === -1) return res.status(404).json({ error: "Not found" });

      const current = memory.cars[index];
      const updated: CarDTO = {
        ...current,
        ...body,
        year: body.year != null ? Number(body.year) : current.year,
        horsepower:
          body.horsepower != null
            ? Number(body.horsepower)
            : current.horsepower,
      };
      memory.cars[index] = updated;
      saveDB(memory);
      return res.status(200).json(updated);
    }

    case "DELETE": {
      if (!id || Number.isNaN(id))
        return res.status(400).json({ error: "ID required" });
      const before = memory.cars.length;
      memory.cars = memory.cars.filter((c) => c.id !== id);
      if (memory.cars.length === before)
        return res.status(404).json({ error: "Not found" });
      saveDB(memory);
      return res.status(204).end();
    }

    default: {
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      return res.status(405).end(`Method ${method} Not Allowed`);
    }
  }
}
