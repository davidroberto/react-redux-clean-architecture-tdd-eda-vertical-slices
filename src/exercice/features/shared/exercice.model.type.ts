import { Muscle } from "@/src/muscle/features/shared/muscle.model.type";

export type Exercice = {
  id: string;
  title: string;
  description: string | null;
  image: string | null;
  youtubeVideoUrl: string | null;
  createdAt: string;
  updatedAt: string;
  primaryMuscles: Partial<Muscle>[];
  secondaryMuscles: Partial<Muscle>[];
};

export type ExercicesSortedByMuscle = {
  id: string;
  title: string;
  exercises: Exercice[];
  children: ExercicesSortedByMuscle[];
};
