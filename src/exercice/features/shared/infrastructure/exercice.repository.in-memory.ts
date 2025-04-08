// pas de repo par features en VSA
// car chaque feature peut avoir besoin de plusieurs méthodes de repo
// et sur le repo in memory on travaille sur la même liste d'exercices quand on add, delete etc

import {ExerciceSortEnum} from "@/src/exercice/features/list-exercices/list-exercices-sort.enum";
import {Exercice, ExercicesSortedByMuscle,} from "@/src/exercice/features/shared/exercice.model.type";
import {ExerciceRepositoryInterface} from "@/src/exercice/features/shared/exercice.repository.interface";
import {CreateExerciceCommand} from "@/src/exercice/features/create-exercice/create-exercice.use-case";
import {UpdateExerciceCommand} from "@/src/exercice/features/update-exercice/update-exercice.usecase";

export default class ExerciceRepositoryInMemory implements ExerciceRepositoryInterface {
    private exercices: Exercice[] = [{
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
        title: "Incline Dumbbell Press",
        description: "Targets the upper chest region.",
        image: "https://i0.wp.com/muscu-street-et-crossfit.fr/wp-content/uploads/2022/03/Muscles-DM-Halteres.002.jpeg",
        youtubeVideoUrl: "youtubeVideoUrl",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        primaryMuscles: [{id: "101"}],
        secondaryMuscles: [],
    }, {
        id: "3",
        title: "Bench Press",
        description: "Classic chest exercise.",
        image: "https://i0.wp.com/muscu-street-et-crossfit.fr/wp-content/uploads/2022/03/Muscles-DM-Halteres.002.jpeg",
        youtubeVideoUrl: "youtubeVideoUrl",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        primaryMuscles: [{id: "102"}],
        secondaryMuscles: [],
    }, {
        id: "4",
        title: "Decline Bench Press",
        description: "Focuses on the lower chest area.",
        image: "https://i0.wp.com/muscu-street-et-crossfit.fr/wp-content/uploads/2022/03/Muscles-DM-Halteres.002.jpeg",
        youtubeVideoUrl: "youtubeVideoUrl",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        primaryMuscles: [{id: "103"}],
        secondaryMuscles: [],
    }, {
        id: "5",
        title: "Push-Up",
        description: "Overall chest exercise.",
        image: "https://i0.wp.com/muscu-street-et-crossfit.fr/wp-content/uploads/2022/03/Muscles-DM-Halteres.002.jpeg",
        youtubeVideoUrl: "youtubeVideoUrl",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        primaryMuscles: [{id: "1"}],
        secondaryMuscles: [],
    }, {
        id: "6",
        title: "Shrugs",
        description: "Targets the traps.",
        image: "https://i0.wp.com/muscu-street-et-crossfit.fr/wp-content/uploads/2022/03/Muscles-DM-Halteres.002.jpeg",
        youtubeVideoUrl: "youtubeVideoUrl",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        primaryMuscles: [{id: "201"}],
        secondaryMuscles: [],
    }, {
        id: "7",
        title: "Lat Pulldown",
        description: "Focuses on the lats.",
        image: "https://i0.wp.com/muscu-street-et-crossfit.fr/wp-content/uploads/2022/03/Muscles-DM-Halteres.002.jpeg",
        youtubeVideoUrl: "youtubeVideoUrl",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        primaryMuscles: [{id: "202"}],
        secondaryMuscles: [],
    }, {
        id: "8",
        title: "Face Pull",
        description: "Engages the rhomboids.",
        image: "https://i0.wp.com/muscu-street-et-crossfit.fr/wp-content/uploads/2022/03/Muscles-DM-Halteres.002.jpeg",
        youtubeVideoUrl: "youtubeVideoUrl",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        primaryMuscles: [{id: "203"}],
        secondaryMuscles: [],
    }, {
        id: "9",
        title: "Deadlift",
        description: "Overall back exercise.",
        image: "https://i0.wp.com/muscu-street-et-crossfit.fr/wp-content/uploads/2022/03/Muscles-DM-Halteres.002.jpeg",
        youtubeVideoUrl: "youtubeVideoUrl",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        primaryMuscles: [{id: "2"}],
        secondaryMuscles: [],
    }, {
        id: "10",
        title: "Squat",
        description: "Works the quads primarily.",
        image: "https://i0.wp.com/muscu-street-et-crossfit.fr/wp-content/uploads/2022/03/Muscles-DM-Halteres.002.jpeg",
        youtubeVideoUrl: "youtubeVideoUrl",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        primaryMuscles: [{id: "301"}],
        secondaryMuscles: [],
    }, {
        id: "11",
        title: "Leg Curl",
        description: "Targets the hamstrings.",
        image: "https://i0.wp.com/muscu-street-et-crossfit.fr/wp-content/uploads/2022/03/Muscles-DM-Halteres.002.jpeg",
        youtubeVideoUrl: "youtubeVideoUrl",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        primaryMuscles: [{id: "302"}],
        secondaryMuscles: [],
    }, {
        id: "12",
        title: "Seated Calf Raise",
        description: "Focuses on the soleus.",
        image: "https://i0.wp.com/muscu-street-et-crossfit.fr/wp-content/uploads/2022/03/Muscles-DM-Halteres.002.jpeg",
        youtubeVideoUrl: "youtubeVideoUrl",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        primaryMuscles: [{id: "30301"}],
        secondaryMuscles: [],
    }, {
        id: "13",
        title: "Standing Calf Raise",
        description: "Engages the gastrocnemius.",
        image: "https://i0.wp.com/muscu-street-et-crossfit.fr/wp-content/uploads/2022/03/Muscles-DM-Halteres.002.jpeg",
        youtubeVideoUrl: "youtubeVideoUrl",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        primaryMuscles: [{id: "30302"}],
        secondaryMuscles: [],
    },];

    private musclesHierarchy = [{
        id: "1",
        name: "Chest",
        children: [{
            id: "101",
            name: "Upper Chest",
            children: [],
        }, {
            id: "102",
            name: "Middle Chest",
            children: [],
        }, {
            id: "103",
            name: "Lower Chest",
            children: [],
        },],
    }, {
        id: "2",
        name: "Back",
        children: [{
            id: "201",
            name: "Traps",
            children: [],
        }, {
            id: "202",
            name: "Lats",
            children: [],
        }, {
            id: "203",
            name: "Rhomboids",
            children: [],
        },],
    }, {
        id: "3",
        name: "Legs",
        children: [{
            id: "301",
            name: "Quads",
            children: [],
        }, {
            id: "302",
            name: "Hamstrings",
            children: [],
        }, {
            id: "303",
            name: "Calves",
            children: [{
                id: "30301",
                name: "Soleus",
                children: [],
            }, {
                id: "30302",
                name: "Gastrocnemius",
                children: [],
            },],
        },],
    },];

    public async create(createExerciceDto: CreateExerciceCommand): Promise<void> {
        const newExercice: Exercice = {
            id: String(new Date().getTime()),
            title: createExerciceDto.title,
            description: createExerciceDto.description,
            image: createExerciceDto.image,
            youtubeVideoUrl: createExerciceDto.youtubeVideoUrl,
            createdAt: new Date(),
            updatedAt: new Date(),
            primaryMuscles: createExerciceDto.primaryMuscles,
            secondaryMuscles: createExerciceDto.secondaryMuscles,
        };

        this.exercices.push(newExercice);
    }

    public async findAll(sort?: ExerciceSortEnum = ExerciceSortEnum.MUSCLE_GROUP): Promise<ExercicesSortedByMuscle[] | Exercice[]> {
        if (sort === ExerciceSortEnum.MUSCLE_GROUP) {
            const buildHierarchy = (muscles: any[]): ExercicesSortedByMuscle[] => {
                return muscles.map((muscle) => ({
                    id: muscle.id,
                    title: muscle.name,
                    exercises: this.exercices.filter(
                        (ex) => ex.primaryMuscles.some((primaryMuscle) => primaryMuscle.id === muscle.id,),),
                    children: buildHierarchy(muscle.children),
                }));
            };

            return buildHierarchy(this.musclesHierarchy);
        }

        return this.exercices.map((exercice) => ({
            ...exercice,
        }));
    }

    public async deleteById(id: string): Promise<void> {
        const index = this.exercices.findIndex((ex) => ex.id === id);
        if (index === -1) {
            throw new Error("Exercice not found");
        }

        this.exercices.splice(index, 1);
    }

    public async update(exerciceId: string, updateExerciceDto: UpdateExerciceCommand,): Promise<void> {
        const index = this.exercices.findIndex((ex) => ex.id === exerciceId);
        if (index === -1) {
            throw new Error("Exercice not found");
        }

        const updatedExercice = {
            ...this.exercices[index], ...updateExerciceDto,
            updatedAt: new Date(),
        };

        this.exercices[index] = updatedExercice;
    }

    public async findById(id: string): Promise<Exercice> {
        const exercice = this.exercices.find((ex) => ex.id === id);

        if (!exercice) {
            throw new Error("Exercice not found");
        }

        return exercice;
    }
}
