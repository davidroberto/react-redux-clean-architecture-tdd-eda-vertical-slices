import { Muscle } from "@/src/muscle/features/shared/muscle.model.type";

export interface MuscleRepositoryInterface {
  findAll(): Promise<Muscle[]>;
}
