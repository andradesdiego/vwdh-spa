import { CarRepositoryV2 } from "@/domain/repositories/CarRepositoryV2";
export const listCars = (repo: CarRepositoryV2) => () => repo.list();
