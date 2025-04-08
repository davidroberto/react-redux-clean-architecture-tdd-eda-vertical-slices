import {Thunk} from "@/src/shared/application/thunk.type";
import {ExerciceSortEnum} from "@/src/exercice/features/list-exercices/list-exercices-sort.enum";
import {
    exercicesLoaded, exercicesLoadingFailed, exercicesLoadingStarted,
} from "@/src/exercice/features/list-exercices/list-exercices.events";

export const listExercicesUseCase = (sort?: ExerciceSortEnum): Thunk => async (dispatch, _, {exerciceRepository}) => {
    dispatch(exercicesLoadingStarted());

    try {
        const exercices = await exerciceRepository.findAll(sort);

        dispatch(exercicesLoaded(exercices));
    } catch (error: any) {
        const errorMessage = error instanceof Error ? error.message : "An error occurred while loading the exercices.";

        dispatch(exercicesLoadingFailed(errorMessage));
    }
};
