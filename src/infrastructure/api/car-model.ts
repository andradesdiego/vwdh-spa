import { VercelRequest, VercelResponse } from "@vercel/node";
import { readFileSync, existsSync } from "fs";
import { join } from "path";
import { Power } from "../../domain/value-objects/Power";
import { CarDTO, toCarDTO, toDomainCar } from "../../infrastructure/dto/carDTO";
import { CarModel } from "../../domain/models/CarModel";

// --- Carga segura del JSON con guardas y logs:
function loadDB() {
  try {
    const dbPath = join(process.cwd(), "db.json"); // raíz del proyecto
    if (!existsSync(dbPath)) {
      console.error("[car-model] db.json NO encontrado en:", dbPath);
      return { cars: [] };
    }
    const raw = readFileSync(dbPath, "utf-8");
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed?.cars)) {
      console.error(
        "[car-model] Estructura inválida en db.json. Esperaba { cars: [] }"
      );
      return { cars: [] };
    }
    return parsed;
  } catch (e) {
    console.error("[car-model] Error leyendo db.json:", e);
    return { cars: [] };
  }
}

let cars: CarModel[] = [];
try {
  const carsDB = loadDB();
  cars = (carsDB.cars as CarDTO[]).map(toDomainCar);
} catch (e) {
  console.error("[car-model] Fallo inicializando cars:", e);
  cars = [];
}

export default function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const { method, query, body } = req;
    const id = query.id ? parseInt(query.id as string, 10) : undefined;

    switch (method) {
      case "GET": {
        if (id) {
          const car = cars.find((c) => c.id === id);
          return car
            ? res.status(200).json(toCarDTO(car))
            : res.status(404).json({ error: "Not found" });
        }
        return res.status(200).json(cars.map(toCarDTO));
      }

      case "POST": {
        try {
          const newCar: CarModel = {
            id: Date.now(),
            name: body?.name,
            brand: body?.brand,
            year: body?.year,
            fuelType: body?.fuelType as CarModel["fuelType"],
            horsepower: Power.create(body?.horsepower),
          };
          cars.push(newCar);
          return res.status(201).json(toCarDTO(newCar));
        } catch (err: any) {
          console.error("[car-model] POST error:", err);
          return res.status(400).json({ error: err?.message ?? "Bad Request" });
        }
      }

      case "PUT": {
        if (!id) return res.status(400).json({ error: "ID required" });
        const index = cars.findIndex((c) => c.id === id);
        if (index === -1) return res.status(404).json({ error: "Not found" });

        try {
          const updated: CarModel = {
            ...cars[index],
            ...body,
            horsepower: body?.horsepower
              ? Power.create(body.horsepower)
              : cars[index].horsepower,
          };
          cars[index] = updated;
          return res.status(200).json(toCarDTO(updated));
        } catch (err: any) {
          console.error("[car-model] PUT error:", err);
          return res.status(400).json({ error: err?.message ?? "Bad Request" });
        }
      }

      case "DELETE": {
        if (!id) return res.status(400).json({ error: "ID required" });
        cars = cars.filter((c) => c.id !== id);
        return res.status(204).end();
      }

      default: {
        res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
        return res.status(405).end(`Method ${method} Not Allowed`);
      }
    }
  } catch (err: any) {
    console.error("[car-model] UNHANDLED error:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
