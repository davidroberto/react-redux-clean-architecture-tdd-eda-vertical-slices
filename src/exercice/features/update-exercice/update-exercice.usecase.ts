import {Thunk} from "@/src/shared/application/thunk.type";
import {
    exercicesLoaded,
    exercicesLoadingFailed,
    exercicesLoadingStarted,
} from "@/src/exercice/features/list-exercices/list-exercices.events";
import {UpdateExerciceCommand} from "@/src/exercice/features/update-exercice/update-exercice.command";
import {
    exerciceUpdated,
    exerciceUpdateFailed,
    exerciceUpdateStarted,
} from "@/src/exercice/features/update-exercice/update-exercice.events";

export const updateExerciceUseCase =
    (exerciceId: string, updateExercice: UpdateExerciceCommand): Thunk =>
        async (dispatch, _, {exerciceRepository}) => {
            dispatch(exerciceUpdateStarted());
            try {
                await exerciceRepository.update(exerciceId, updateExercice);
                dispatch(exerciceUpdated());
                dispatch(exercicesLoadingStarted());
                try {
                    const exercices = await exerciceRepository.findAll();

                    dispatch(exercicesLoaded(exercices));
                } catch (error) {
                    const errorMessage =
                        error instanceof Error
                            ? error.message
                            : "An error occurred while loading the exercices.";
                    dispatch(exercicesLoadingFailed(errorMessage));
                }
            } catch (error) {
                const errorMessage =
                    error instanceof Error
                        ? error.message
                        : "An error occurred while updating the exercice.";
                dispatch(exerciceUpdateFailed(errorMessage));
            }
        };
