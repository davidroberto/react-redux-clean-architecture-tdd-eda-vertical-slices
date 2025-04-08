import {createTestStore} from "@/src/shared/application/test/test.store";
import {ExerciceSuccessRepositoryFake} from "@/src/exercice/features/shared/test/exercice-success.repository.fake";

export const createTestStoreWithExercices = async () => {
    const exerciceSuccessRepository = new ExerciceSuccessRepositoryFake();
    const exercices = (await exerciceSuccessRepository.findAll());
    return createTestStore({
        exercices: {
            list: {
                data: exercices,
            },
        },
    });
};
