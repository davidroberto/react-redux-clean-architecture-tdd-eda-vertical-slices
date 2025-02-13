import {Thunk} from "@/src/shared/application/thunk.type";
import {
    exerciceDeleted,
    exerciceDeletionFailed,
    exerciceDeletionStarted,
} from "@/src/exercice/features/delete-exercice/delete-exercice.events";
import {
    exercicesLoaded,
    exercicesLoadingFailed,
    exercicesLoadingStarted,
} from "@/src/exercice/features/list-exercices/list-exercices.events";

export const deleteExerciceUseCase =
    (exerciceId: string): Thunk =>
        async (dispatch, _, {exerciceRepository}) => {
            dispatch(exerciceDeletionStarted());

            try {
                await exerciceRepository.deleteById(exerciceId);

                dispatch(exerciceDeleted());

                dispatch(exercicesLoadingStarted());

                try {
                    const exercices = await exerciceRepository.findAll();

                    dispatch(exercicesLoaded(exercices));
                } catch (error: any) {
                    const errorMessage =
                        error instanceof Error
                            ? error.message
                            : "An error occurred while loading the exercices.";
                    dispatch(exercicesLoadingFailed(errorMessage));
                }
            } catch (error: any) {
                const errorMessage =
                    error instanceof Error
                        ? error.message
                        : "An error occurred while deleting the exercice.";
                dispatch(exerciceDeletionFailed(errorMessage));
            }
        };
