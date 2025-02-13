import {Muscle} from "@/src/muscle/features/shared/muscle.model.type";

export type CreateExerciceCommand = {
    title: string;
    description: string | null;
    image: string | null;
    youtubeVideoUrl: string | null;
    primaryMuscles: Partial<Muscle>[];
    secondaryMuscles: Partial<Muscle>[];
};
