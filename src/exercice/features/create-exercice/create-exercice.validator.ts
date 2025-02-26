import {CreateExerciceCommand} from "@/src/exercice/features/create-exercice/create-exercice.command";

export const validateExercice = (createExercice: CreateExerciceCommand): string[] => {
    const MIN_TITLE_LENGTH = 2;

    const errors: string[] = [];

    if (createExercice.title.length < MIN_TITLE_LENGTH) {
        errors.push("titre trop court");
    }

    return errors;
}