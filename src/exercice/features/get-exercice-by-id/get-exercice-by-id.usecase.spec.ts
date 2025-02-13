import {AppStore} from "@/src/shared/application/root.store";
import {createTestStoreWithExercices} from "@/src/exercice/features/shared/test/utils/create-test-store-with-exercices";
import {ExerciceLoadingRepositoryFake} from "@/src/exercice/features/shared/test/exercice-loading.repository.fake";
import {getExerciceByIdUseCase} from "@/src/exercice/features/get-exercice-by-id/get-exercice-by-id.usecase";
import {ExerciceSuccessRepositoryFake} from "@/src/exercice/features/shared/test/exercice-success.repository.fake";
import {ExerciceErrorRepositoryFake} from "@/src/exercice/features/shared/test/exercice-error.repository.fake";
import {Exercice, ExercicesSortedByMuscle,} from "@/src/exercice/features/shared/exercice.model.type";
import {NotificationType} from "@/src/notification/features/shared/notification-type.enum";

let testStore: AppStore;

describe("As a user i want to get an exercice by its id", () => {
    let exercices: Exercice[] | ExercicesSortedByMuscle[];
    let exerciceIdToRetrieve: string;

    describe("Given two exercices are created", () => {
        beforeAll(async () => {
            testStore = await createTestStoreWithExercices();
            exercices = testStore.getState().exercices.list.exercices;
            exerciceIdToRetrieve = exercices[0].id;
        });

        describe("When the exercice fetching has not started", () => {

            test("Then the loading should be false", async () => {
                expect(testStore.getState().exercices.current.isLoading).toBe(false);
            });

            test("Then the current exercice should be null", async () => {
                expect(testStore.getState().exercices.current.exercice).toBe(null);
            });
        });
    });

    describe("Given two exercices are created", () => {
        beforeAll(async () => {
            testStore = await createTestStoreWithExercices();
            exercices = testStore.getState().exercices.list.exercices;
            exerciceIdToRetrieve = exercices[0].id;
        });

        describe("When the exercice fetching starts", () => {
            beforeAll(async () => {
                getExerciceByIdUseCase(exerciceIdToRetrieve)(testStore.dispatch, testStore.getState, {
                    exerciceRepository: new ExerciceLoadingRepositoryFake(),
                },);
            });

            test("Then the loading should be true", async () => {
                expect(testStore.getState().exercices.current.isLoading).toBe(true);
            });
        });
    });

    describe("Given two exercices are created", () => {
        beforeAll(async () => {
            testStore = await createTestStoreWithExercices();
            exercices = testStore.getState().exercices.list.exercices;
            exerciceIdToRetrieve = exercices[0].id;
        });

        describe("When the exercice is retrieved successfully", () => {
            beforeAll(async () => {
                await getExerciceByIdUseCase(exerciceIdToRetrieve)(testStore.dispatch, testStore.getState, {
                    exerciceRepository: new ExerciceSuccessRepositoryFake(),
                },);
            });

            test("Then the loading should be false", async () => {
                expect(testStore.getState().exercices.current.isLoading).toBe(false);
            });

            test("Then it should set the retrieved exercice as current exercice", async () => {
                expect(testStore.getState().exercices.current.exercice).toEqual(exercices[0],);
            });

            test("Then it should set a success notification", async () => {
                const getSuccessNotification = testStore
                    .getState()
                    .notifications.list.find(
                        (notification) => notification.message === "Exercice récupération réussie",);

                expect(getSuccessNotification).not.toBeUndefined();
                expect(getSuccessNotification?.type).toBe(NotificationType.SUCCESS);
            });
        });
    });

    describe("Given two exercices are created", () => {
        beforeAll(async () => {
            testStore = await createTestStoreWithExercices();
            exercices = testStore.getState().exercices.list.exercices;
            exerciceIdToRetrieve = exercices[0].id;
        });

        describe("When the exercice retrieval fails", () => {
            beforeEach(async () => {
                await getExerciceByIdUseCase(exerciceIdToRetrieve)(testStore.dispatch, testStore.getState, {
                    exerciceRepository: new ExerciceErrorRepositoryFake(),
                },);
            });

            test("Then the loading should be false", async () => {
                expect(testStore.getState().exercices.current.isLoading).toBe(false);
            });

            test("Then it should set an error notification", async () => {
                const getErrorNotification = testStore
                    .getState()
                    .notifications.list.find(
                        (notification) => notification.message === "Exercice récupération échouée",);

                expect(getErrorNotification).not.toBeUndefined();
                expect(getErrorNotification?.type).toBe(NotificationType.ERROR);
            });
        });
    });
});
