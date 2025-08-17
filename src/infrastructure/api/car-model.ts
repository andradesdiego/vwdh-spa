import { VercelRequest, VercelResponse } from "@vercel/node";
import { readFileSync } from "fs";
import { join } from "path";
import { Power } from "../../domain/value-objects/Power";
import { CarDTO, toCarDTO, toDomainCar } from "../../infrastructure/dto/carDTO";
import { CarModel } from "../../domain/models/CarModel";

// Cargar base de datos simulada desde db.json
const dbPath = join(process.cwd(), "db.json");
const rawData = readFileSync(dbPath, "utf-8");
const carsDB = JSON.parse(rawData);

let cars: CarModel[] = (carsDB.cars as CarDTO[]).map(toDomainCar);

export default function handler(req: VercelRequest, res: VercelResponse) {
  const { method, query, body } = req;
  const id = query.id ? parseInt(query.id as string) : undefined;

  switch (method) {
    case "GET":
      if (id) {
        const car = cars.find((c) => c.id === id);
        car
          ? res.status(200).json(toCarDTO(car))
          : res.status(404).json({ error: "Not found" });
      } else {
        res.status(200).json(cars.map(toCarDTO));
      }
      break;

    case "POST":
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
        res.status(201).json(toCarDTO(newCar));
      } catch (error: any) {
        res.status(400).json({ error: error.message });
      }
      break;

    case "PUT":
      if (!id) return res.status(400).json({ error: "ID required" });
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
        res.status(200).json(toCarDTO(updated));
      } catch (error: any) {
        res.status(400).json({ error: error.message });
      }
      break;

    case "DELETE":
      if (!id) return res.status(400).json({ error: "ID required" });
      cars = cars.filter((c) => c.id !== id);
      res.status(204).end();
      break;

    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
