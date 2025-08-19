import { CarRepositoryV2 } from "@/domain/repositories/CarRepositoryV2";
export const removeCar = (repo: CarRepositoryV2) => (id: number) =>
  repo.remove(id);
