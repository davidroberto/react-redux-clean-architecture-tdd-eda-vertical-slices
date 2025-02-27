import {AppStore} from "@/src/shared/application/root.store";
import {ExerciceLoadingRepositoryFake} from "@/src/exercice/features/shared/test/exercice-loading.repository.fake";
import {ExerciceErrorRepositoryFake} from "@/src/exercice/features/shared/test/exercice-error.repository.fake";
import {ExerciceSuccessRepositoryFake} from "@/src/exercice/features/shared/test/exercice-success.repository.fake";
import {createTestStoreWithExercices} from "@/src/exercice/features/shared/test/utils/create-test-store-with-exercices";
import {UpdateExerciceCommand} from "@/src/exercice/features/update-exercice/update-exercice.command";
import {updateExerciceUseCase} from "@/src/exercice/features/update-exercice/update-exercice.usecase";
import {Exercice, ExercicesSortedByMuscle} from "@/src/exercice/features/shared/exercice.model.type";
import {getExercicesList} from "@/src/exercice/features/list-exercices/list-exercices.selectors";
import {getExerciceUpdateLoading} from "@/src/exercice/features/update-exercice/update-exercice.selectors";
import {getNotificationsList} from "@/src/notification/features/shared/notification.selectors";

describe("As a user i want to update an exercice", () => {
    let testStore: AppStore;
    let exercices: Exercice[] | ExercicesSortedByMuscle[];
    let exerciceIdToUpdate: string;

    const updateExerciceCommand: UpdateExerciceCommand = {
        title: "Romanian Deadlift 2",
        description: "update The Romanian deadlift is a variation of the conventional deadlift that targets the posterior chain, including the hamstrings, glutes, and lower back.",
        image: "https://wger.de/media/exercise-images/89/Romanian-deadlift-1.png",
        youtubeVideoUrl: "https://www.youtube.com/watch?v=jEy_czb3RKA",
        primaryMuscles: [{id: "205"}],
        secondaryMuscles: [{id: "205"}],
    };

    describe("Given two exercices are created", () => {
        beforeAll(async () => {
            testStore = await createTestStoreWithExercices();
            exercices = getExercicesList(testStore.getState());
            exerciceIdToUpdate = exercices[0].id;
        });

        describe("When the exercice update has not started", () => {

            test("Then it should set the loading to true", async () => {
                expect(getExerciceUpdateLoading(testStore.getState())).toBe(false);
            });

            test("Then the list should still contains the original exercices", async () => {
                expect(getExercicesList(testStore.getState())).toBe(exercices);
            });

        });
    });

    describe("Given two exercices are created", () => {
        beforeAll(async () => {
            testStore = await createTestStoreWithExercices();
            exercices = getExercicesList(testStore.getState());
            exerciceIdToUpdate = exercices[0].id;
        });

        describe("When the exercice update starts", () => {
            beforeAll(() => {
                updateExerciceUseCase(exerciceIdToUpdate, updateExerciceCommand)(
                    testStore.dispatch, testStore.getState,
                    {
                        exerciceRepository: new ExerciceLoadingRepositoryFake(),
                    },
                );
            });

            test("Then it should set the loading to true", async () => {
                expect(getExerciceUpdateLoading(testStore.getState())).toBe(true);
            });
        });
    });

    describe("Given two exercices are created", () => {
        beforeAll(async () => {
            testStore = await createTestStoreWithExercices();
            exercices = getExercicesList(testStore.getState());
            exerciceIdToUpdate = exercices[0].id;
        });

        describe("When the exercice is updated successfully", () => {
            beforeAll(async () => {
                await updateExerciceUseCase(exerciceIdToUpdate, updateExerciceCommand)(
                    testStore.dispatch,
                    testStore.getState, {
                        exerciceRepository: new ExerciceSuccessRepositoryFake(),
                    },
                );
            });

            test("Then it should set the loading to false", async () => {
                expect(getExerciceUpdateLoading(testStore.getState())).toBe(false);
            });

            test("Then it should set the updated exercice as current exercice", async () => {
                expect(getExercicesList(testStore.getState())[0].id).toEqual(exerciceIdToUpdate,);
                expect(getExercicesList(testStore.getState())[0].title).toEqual(updateExerciceCommand.title,);
            });

            test("Then it should set a success notification", async () => {
                const updateSuccessNotification = getNotificationsList(testStore.getState()).find(
                    (notification) => notification.message === "Exercice mise à jour réussie",);

                expect(updateSuccessNotification).not.toBeUndefined();
            });
        });
    });

    describe("Given two exercices are created", () => {
        beforeAll(async () => {
            testStore = await createTestStoreWithExercices();
            exercices = getExercicesList(testStore.getState());
            exerciceIdToUpdate = exercices[0].id;
        });

        describe("When the exercice update fails", () => {
            beforeAll(async () => {
                await updateExerciceUseCase(exerciceIdToUpdate, updateExerciceCommand)(
                    testStore.dispatch,
                    testStore.getState, {
                        exerciceRepository: new ExerciceErrorRepositoryFake(),
                    },
                );
            });

            test("Then it should set the loading to false", async () => {
                expect(getExerciceUpdateLoading(testStore.getState())).toBe(false);
            });

            test("Then it should set an error notification", async () => {
                const updateErrorNotification = getNotificationsList(testStore.getState()).find(
                    (notification) => notification.message === "Exercice maj échouée",);

                expect(updateErrorNotification).not.toBeUndefined();
            });
        });
    });
});
