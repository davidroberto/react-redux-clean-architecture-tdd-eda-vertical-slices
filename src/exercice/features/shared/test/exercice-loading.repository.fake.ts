import {ExerciceRepositoryInterface} from "@/src/exercice/features/shared/exercice.repository.interface";
import {Exercice, ExercicesSortedByMuscle} from "@/src/exercice/features/shared/exercice.model.type";
import {ExerciceSortEnum} from "@/src/exercice/features/list-exercices/list-exercices-sort.enum";
import {CreateExerciceCommand} from "@/src/exercice/features/create-exercice/create-exercice.use-case";
import {UpdateExerciceCommand} from "@/src/exercice/features/update-exercice/update-exercice.usecase";

export class ExerciceLoadingRepositoryFake implements ExerciceRepositoryInterface {
    async findAll(sort?: ExerciceSortEnum,): Promise<ExercicesSortedByMuscle[] | Exercice[]> {
        return new Promise(() => {
        });
    }

    async findById(exerciceId: string): Promise<Exercice | null> {
        return new Promise(() => {
        });
    }

    async create(exercice: CreateExerciceCommand): Promise<void> {
        return new Promise(() => {
        });
    }

    async update(exerciceId: string, updateExerciceDto: UpdateExerciceCommand,): Promise<void> {
        return new Promise(() => {
        });
    }

    async deleteById(id: string): Promise<void> {
        return new Promise(() => {
        });
    }
}
