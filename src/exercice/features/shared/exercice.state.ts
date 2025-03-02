import {Muscle} from "@/src/muscle/features/shared/muscle.model.type";
import {ListExercicesState} from "@/src/exercice/features/list-exercices/list-exercices.state";

import {UpdateExerciceState} from "@/src/exercice/features/update-exercice/update-exercice.state";
import {GetExerciceByIdState} from "@/src/exercice/features/get-exercice-by-id/get-exercice-by-id.state";
import {DeleteExerciceState} from "@/src/exercice/features/delete-exercice/delete-exercice.state";
import {CreateExerciceState} from "@/src/exercice/features/create-exercice/create-exercice.state";

export type ExercicesState = {
    list: ListExercicesState;
    create: CreateExerciceState;
    delete: DeleteExerciceState;
    getById: GetExerciceByIdState;
    update: UpdateExerciceState;
};

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
