export type UpdateExerciceCommand = {
  title: string;
  description: string | null;
  image: string | null;
  youtubeVideoUrl: string | null;
  primaryMuscles: [{ id: string }];
  secondaryMuscles: [{ id: string }];
};
