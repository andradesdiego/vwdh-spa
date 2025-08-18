import type { VercelRequest, VercelResponse } from "@vercel/node";

import { Power } from "../src/domain/value-objects/Power";
import {
  CarDTO,
  toCarDTO,
  toDomainCar,
} from "../src/infrastructure/dto/carDTO";
import { CarModel } from "../src/domain/models/CarModel";

import { readFileSync } from "fs";
import path from "path";

// En runtime serverless, usa process.cwd() para resolver archivos del proyecto.
// db.json debe estar en la raíz y ser incluido vía vercel.json -> functions.includeFiles
const dbPath = path.join(process.cwd(), "db.json");
const rawData = readFileSync(dbPath, "utf8");
const carsDB = JSON.parse(rawData) as { cars: CarDTO[] };

// "Base de datos" en memoria (se reinicia entre despliegues/instancias)
let cars: CarModel[] = (carsDB.cars ?? []).map(toDomainCar);

export default function handler(req: VercelRequest, res: VercelResponse) {
  const { method, query, body } = req;
  const id = query.id ? parseInt(query.id as string, 10) : undefined;

  switch (method) {
    case "GET": {
      if (id != null && !Number.isNaN(id)) {
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
          name: body.name,
          brand: body.brand,
          year: body.year,
          fuelType: body.fuelType as CarModel["fuelType"],
          horsepower: Power.create(body.horsepower),
        };
        cars.push(newCar);
        return res.status(201).json(toCarDTO(newCar));
      } catch (error: any) {
        return res.status(400).json({ error: error.message });
      }
    }

    case "PUT": {
      if (!id || Number.isNaN(id))
        return res.status(400).json({ error: "ID required" });

      const index = cars.findIndex((c) => c.id === id);
      if (index === -1) return res.status(404).json({ error: "Not found" });

      try {
        const updated: CarModel = {
          ...cars[index],
          ...body,
          horsepower: body.horsepower
            ? Power.create(body.horsepower)
            : cars[index].horsepower,
        };
        cars[index] = updated;
        return res.status(200).json(toCarDTO(updated));
      } catch (error: any) {
        return res.status(400).json({ error: error.message });
      }
    }

    case "DELETE": {
      if (!id || Number.isNaN(id))
        return res.status(400).json({ error: "ID required" });
      cars = cars.filter((c) => c.id !== id);
      return res.status(204).end();
    }

    default: {
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      return res.status(405).end(`Method ${method} Not Allowed`);
    }
  }
}
