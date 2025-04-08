import {ExerciceSortEnum} from "@/src/exercice/features/list-exercices/list-exercices-sort.enum";
import {CreateExerciceCommand} from "@/src/exercice/features/create-exercice/create-exercice.use-case";
import {UpdateExerciceCommand} from "@/src/exercice/features/update-exercice/update-exercice.usecase";
import {Exercice, ExercicesSortedByMuscle} from "@/src/exercice/features/shared/exercice.state.model";

export interface ExerciceRepositoryInterface {
    create(createExerciceDto: CreateExerciceCommand): Promise<void>;

    update(exerciceId: string, updateExerciceDto: UpdateExerciceCommand,): Promise<void>;

    findAll(sort?: ExerciceSortEnum): Promise<ExercicesSortedByMuscle[] | Exercice[]>;

    deleteById(exerciceId: string): Promise<void>;

    findById(exerciceId: string): Promise<Exercice | null>;
}
