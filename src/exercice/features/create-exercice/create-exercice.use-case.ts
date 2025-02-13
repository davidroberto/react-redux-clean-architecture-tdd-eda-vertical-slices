import {Thunk} from "@/src/shared/application/thunk.type";
import {Dispatch} from "@reduxjs/toolkit";
import {CreateExerciceCommand} from "@/src/exercice/features/create-exercice/create-exercice.command";
import {
  exerciceCreated,
  exerciceCreationFailed,
  exerciceCreationStarted,
} from "@/src/exercice/features/create-exercice/create-exercice.events";
import {
  exercicesLoaded,
  exercicesLoadingFailed,
  exercicesLoadingStarted,
} from "@/src/exercice/features/list-exercices/list-exercices.events";

export const createExerciceUseCase =
    (createExercice: CreateExerciceCommand): Thunk =>
        async (dispatch: Dispatch, _, {exerciceRepository}) => {
            dispatch(exerciceCreationStarted());

            try {
                await exerciceRepository.create(createExercice);

                dispatch(exerciceCreated());

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
                        : "An error occurred while creating the exercice.";
                dispatch(exerciceCreationFailed(errorMessage));
            }
        };
