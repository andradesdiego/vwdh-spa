import { CarModel } from "@/domain/models/CarModel";

const API_URL = "http://localhost:4000/cars";

export async function fetchCarsFromApi(): Promise<CarModel[]> {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) {
      throw new Error(`API Error: ${res.status} ${res.statusText}`);
    }
    return await res.json();
  } catch (error) {
    console.error("fetchCarsFromApi error:", error);
    throw error;
  }
}

/**
 * Create a new car in the mock API
 */
export async function createCarInApi(
  carData: Omit<CarModel, "id">
): Promise<CarModel> {
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(carData),
    });

    if (!res.ok) {
      throw new Error(`API Error: ${res.status} ${res.statusText}`);
    }

    return await res.json();
  } catch (error) {
    console.error("createCarInApi error:", error);
    throw error; // Vuelve a lanzar el error para que el caso de uso lo pueda gestionar
  }
}
/**
 * Update a car by ID using the mock API
 */
export async function updateCarInApi(car: CarModel): Promise<CarModel> {
  try {
    const res = await fetch(`${API_URL}/${car.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(car),
    });

    if (!res.ok) {
      throw new Error(`API Error: ${res.status} ${res.statusText}`);
    }

    return await res.json();
  } catch (error) {
    console.error("updateCarInApi error:", error);
    throw error;
  }
}
/**
 * Delete a car by ID using the mock API
 */
export async function deleteCarInApi(id: number): Promise<void> {
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      throw new Error(`API Error: ${res.status} ${res.statusText}`);
    }
  } catch (error) {
    console.error("deleteCarInApi error:", error);
    throw error;
  }
}
