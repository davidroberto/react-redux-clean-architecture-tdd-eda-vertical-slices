import {AppStore} from "@/src/shared/application/root.store";
import {ExerciceLoadingRepositoryFake} from "@/src/exercice/features/shared/test/exercice-loading.repository.fake";
import {ExerciceErrorRepositoryFake} from "@/src/exercice/features/shared/test/exercice-error.repository.fake";
import {ExerciceSuccessRepositoryFake} from "@/src/exercice/features/shared/test/exercice-success.repository.fake";
import {createTestStoreWithExercices} from "@/src/exercice/features/shared/test/utils/create-test-store-with-exercices";
import {
    UpdateExerciceCommand, updateExerciceUseCase
} from "@/src/exercice/features/update-exercice/update-exercice.usecase";
import {Exercice, ExercicesSortedByMuscle} from "@/src/exercice/features/shared/exercice.model.type";
import {getExercicesListData} from "@/src/exercice/features/list-exercices/list-exercices.state.model";
import {
    getExerciceUpdateError, getExerciceUpdateStatus
} from "@/src/exercice/features/update-exercice/update-exercice.state.model";
import {getNotificationsList} from "@/src/notification/features/shared/notification.state.model";

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
            exercices = getExercicesListData(testStore.getState());
            exerciceIdToUpdate = exercices[0].id;
        });

        describe("When the exercice update has not started", () => {

            test("Then the status should be idle", async () => {
                expect(getExerciceUpdateStatus(testStore.getState())).toBe("idle");
            });

            test("Then there should be no error", async () => {
                expect(getExerciceUpdateError(testStore.getState())).toBe(null);
            });

            test("Then the exercices list should contains the original exercices", async () => {
                expect(getExercicesListData(testStore.getState())).toEqual(exercices);
            });

        });
    });

    describe("Given two exercices are created", () => {
        beforeAll(async () => {
            testStore = await createTestStoreWithExercices();
            exercices = getExercicesListData(testStore.getState());
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

            test("Then the status should be loading", async () => {
                expect(getExerciceUpdateStatus(testStore.getState())).toBe("loading");
            });

            test("Then there should be no error", async () => {
                expect(getExerciceUpdateError(testStore.getState())).toBe(null);
            });

            test("Then the exercices list should contains the original exercices", async () => {
                expect(getExercicesListData(testStore.getState())).toEqual(exercices);
            });
        });
    });

    describe("Given two exercices are created", () => {
        beforeAll(async () => {
            testStore = await createTestStoreWithExercices();
            exercices = getExercicesListData(testStore.getState());
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

            test("Then the status should be loading", async () => {
                expect(getExerciceUpdateStatus(testStore.getState())).toBe("success");
            });

            test("Then there should be no error", async () => {
                expect(getExerciceUpdateError(testStore.getState())).toBe(null);
            });

            test("Then the exercice list data should contain the updated exercice", async () => {
                expect(getExercicesListData(testStore.getState())[0].id).toEqual(exerciceIdToUpdate);
                expect(getExercicesListData(testStore.getState())[0].title).toEqual(updateExerciceCommand.title);
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
            exercices = getExercicesListData(testStore.getState());
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

            test("Then the status should be error", async () => {
                expect(getExerciceUpdateStatus(testStore.getState())).toBe("error");
            });

            test("Then there should be an error", async () => {
                expect(getExerciceUpdateError(testStore.getState())).toBe("Exercice maj échouée");
            });

            test("Then the exercices list should contains the original exercices", async () => {
                expect(getExercicesListData(testStore.getState())).toEqual(exercices);
            });

            test("Then it should set an error notification", async () => {
                const updateErrorNotification = getNotificationsList(testStore.getState()).find(
                    (notification) => notification.message === "Exercice maj échouée",);

                expect(updateErrorNotification).not.toBeUndefined();
            });
        });
    });
});
