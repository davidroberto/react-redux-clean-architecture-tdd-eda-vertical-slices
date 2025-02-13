import {UpdateExerciceCommand} from "@/src/exercice/features/update-exercice/update-exercice.command";
import {CreateExerciceCommand} from "@/src/exercice/features/create-exercice/create-exercice.command";
import {Exercice, ExercicesSortedByMuscle,} from "@/src/exercice/features/shared/exercice.model.type";
import {ExerciceSortEnum} from "@/src/exercice/features/list-exercices/list-exercices-sort.enum";

export interface ExerciceRepositoryInterface {
    create(createExerciceDto: CreateExerciceCommand): Promise<void>;

    update(
        exerciceId: string,
        updateExerciceDto: UpdateExerciceCommand,
    ): Promise<void>;

    findAll(
        sort?: ExerciceSortEnum,
    ): Promise<ExercicesSortedByMuscle[] | Exercice[]>;

    deleteById(exerciceId: string): Promise<void>;

    findById(exerciceId: string): Promise<Exercice | null>;
}
