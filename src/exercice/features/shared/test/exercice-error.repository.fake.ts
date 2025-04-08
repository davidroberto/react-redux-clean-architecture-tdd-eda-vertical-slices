import {Exercice, ExercicesSortedByMuscle} from "@/src/exercice/features/shared/exercice.model.type";
import {ExerciceRepositoryInterface} from "@/src/exercice/features/shared/exercice.repository.interface";
import {ExerciceSortEnum} from "@/src/exercice/features/list-exercices/list-exercices-sort.enum";
import {CreateExerciceCommand} from "@/src/exercice/features/create-exercice/create-exercice.use-case";
import {UpdateExerciceCommand} from "@/src/exercice/features/update-exercice/update-exercice.usecase";

export class ExerciceErrorRepositoryFake implements ExerciceRepositoryInterface {
    exercices = [{
        id: "1",
        title: "Incline Bench Press",
        description: "Works the upper chest area.",
        image: "https://i0.wp.com/muscu-street-et-crossfit.fr/wp-content/uploads/2022/03/Muscles-DM-Halteres.002.jpeg",
        youtubeVideoUrl: "youtubeVideoUrl",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        primaryMuscles: [{id: "101"}],
        secondaryMuscles: [],
    }, {
        id: "2",
        title: "Deadlift",
        description: "Works the lower back and legs.",
        image: "https://i0.wp.com/muscu-street-et-crossfit.fr/wp-content/uploads/2022/03/Muscles-DM-Halteres.002.jpeg",
        youtubeVideoUrl: "youtubeVideoUrl",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        primaryMuscles: [{id: "102"}],
        secondaryMuscles: [],
    },];

    async findAll(sort?: ExerciceSortEnum,): Promise<ExercicesSortedByMuscle[] | Exercice[]> {
        throw new Error("Exercices récupération échouée");
    }

    async findById(exerciceId: string): Promise<Exercice | null> {
        throw new Error("Exercice récupération échouée");
    }

    async create(exercice: CreateExerciceCommand): Promise<void> {
        throw new Error("Exercice création échouée");
    }

    async update(exerciceId: string, updateExerciceDto: UpdateExerciceCommand,): Promise<void> {
        throw new Error("Exercice maj échouée");
    }

    async deleteById(id: string): Promise<void> {
        throw new Error("Exercice suppression échouée");
    }
}
