import {ExerciceRepositoryInterface} from "@/src/exercice/features/shared/exercice.repository.interface";
import {ExerciceSortEnum} from "@/src/exercice/features/list-exercices/list-exercices-sort.enum";
import {CreateExerciceCommand} from "@/src/exercice/features/create-exercice/create-exercice.use-case";
import {UpdateExerciceCommand} from "@/src/exercice/features/update-exercice/update-exercice.usecase";
import {Exercice, ExercicesSortedByMuscle} from "@/src/exercice/features/shared/exercice.state";

export class ExerciceSuccessRepositoryFake implements ExerciceRepositoryInterface {
    private exercices = [{
        id: "1",
        title: "Incline Bench Press",
        description: "Works the upper chest area.",
        image: "https://i0.wp.com/muscu-street-et-crossfit.fr/wp-content/uploads/2022/03/Muscles-DM-Halteres.002.jpeg",
        youtubeVideoUrl: "youtubeVideoUrl",
        createdAt: new Date("2024-10-20").toISOString(),
        updatedAt: new Date("2024-10-20").toISOString(),
        primaryMuscles: [{id: "101"}],
        secondaryMuscles: [],
    }, {
        id: "2",
        title: "Deadlift",
        description: "Works the lower back and legs.",
        image: "https://i0.wp.com/muscu-street-et-crossfit.fr/wp-content/uploads/2022/03/Muscles-DM-Halteres.002.jpeg",
        youtubeVideoUrl: "youtubeVideoUrl",
        createdAt: new Date("2024-10-20").toISOString(),
        updatedAt: new Date("2024-10-20").toISOString(),
        primaryMuscles: [{id: "102"}],
        secondaryMuscles: [],
    },];

    async findAll(sort?: ExerciceSortEnum,): Promise<ExercicesSortedByMuscle[] | Exercice[]> {
        return this.exercices;
    }

    async findById(exerciceId: string): Promise<Exercice | null> {
        return this.exercices.find((ex) => ex.id === exerciceId) || null;
    }

    async create(exercice: CreateExerciceCommand): Promise<void> {
        //todo fix type
        this.exercices = [...this.exercices, {
            id: "3",
            title: exercice.title,
            description: exercice.description,
            image: exercice.image,
            youtubeVideoUrl: exercice.youtubeVideoUrl,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            primaryMuscles: exercice.primaryMuscles,
            secondaryMuscles: exercice.secondaryMuscles,
        },];
    }

    async update(exerciceId: string, updateExerciceDto: UpdateExerciceCommand,): Promise<void> {
        const exerciceToUpdate = this.exercices.find((ex) => ex.id === exerciceId);

        const exerciceUpdated = {
            ...exerciceToUpdate,
            title: updateExerciceDto.title,
            description: updateExerciceDto.description,
            image: updateExerciceDto.image,
            youtubeVideoUrl: updateExerciceDto.youtubeVideoUrl,
            primaryMuscles: updateExerciceDto.primaryMuscles,
            secondaryMuscles: updateExerciceDto.secondaryMuscles,
            updatedAt: new Date().toISOString(),
        };
        //todo fix type
        this.exercices = this.exercices.map((exercice) => exercice.id === exerciceId ? exerciceUpdated : exercice,);
    }

    async deleteById(id: string): Promise<void> {
        this.exercices = this.exercices.filter((ex) => ex.id !== id);
    }
}
