import {Muscle} from "@/src/muscle/features/shared/muscle.model.type";
import {ListExercicesStateModel} from "@/src/exercice/features/list-exercices/list-exercices.state.model";

import {UpdateExerciceStateModel} from "@/src/exercice/features/update-exercice/update-exercice.state.model";
import {GetExerciceByIdStateModel} from "@/src/exercice/features/get-exercice-by-id/get-exercice-by-id.state.model";
import {CreateExerciceStateModel} from "@/src/exercice/features/create-exercice/create-exercice.state.model";
import {DeleteExerciceStateModel} from "@/src/exercice/features/delete-exercice/delete-exercice.state.model";

export type ExercicesState = {
    list: ListExercicesStateModel;
    create: CreateExerciceStateModel;
    getById: GetExerciceByIdStateModel;
    update: UpdateExerciceStateModel;
    delete: DeleteExerciceStateModel;
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
