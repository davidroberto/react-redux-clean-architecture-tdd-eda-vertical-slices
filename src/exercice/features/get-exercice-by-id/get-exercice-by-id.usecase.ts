import {Thunk} from "@/src/shared/application/thunk.type";
import {
    exerciceLoaded, exerciceLoadingFailed, exerciceLoadingStarted,
} from "@/src/exercice/features/get-exercice-by-id/get-exercice-by-id.events";

export const getExerciceByIdUseCase = (exerciceId: string): Thunk => async (dispatch, _, {exerciceRepository}) => {
    dispatch(exerciceLoadingStarted());

    try {
        const exercice = await exerciceRepository.findById(exerciceId);

        dispatch(exerciceLoaded(exercice));
    } catch (error: any) {
        const errorMessage = error instanceof Error ? error.message : "An error occurred while loading the exercice.";
        dispatch(exerciceLoadingFailed(errorMessage));
    }
};
