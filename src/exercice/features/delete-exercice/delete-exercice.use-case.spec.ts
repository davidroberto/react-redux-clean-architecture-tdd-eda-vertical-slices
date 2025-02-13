import {AppStore} from "@/src/shared/application/root.store";
import {Exercice, ExercicesSortedByMuscle,} from "@/src/exercice/features/shared/exercice.model.type";
import {createTestStoreWithExercices} from "@/src/exercice/features/shared/test/utils/create-test-store-with-exercices";
import {ExerciceLoadingRepositoryFake} from "@/src/exercice/features/shared/test/exercice-loading.repository.fake";
import {deleteExerciceUseCase} from "@/src/exercice/features/delete-exercice/delete-exercice.use-case";
import {ExerciceSuccessRepositoryFake} from "@/src/exercice/features/shared/test/exercice-success.repository.fake";
import {ExerciceErrorRepositoryFake} from "@/src/exercice/features/shared/test/exercice-error.repository.fake";
import {NotificationType} from "@/src/notification/features/shared/notification-type.enum";

describe("As a user i want to delete a created exercice", () => {
    let exercicesCreated: Exercice[] | ExercicesSortedByMuscle[];
    let exerciceIdToDelete: string;
    let testStore: AppStore;

    describe("Given two exercices are already created", () => {
        beforeAll(async () => {
            testStore = await createTestStoreWithExercices();
            exercicesCreated = testStore.getState().exercices.list.exercices;
        });

        describe("When the exercice deletion has not started", () => {
            test("Then the loading should be false", async () => {
                expect(testStore.getState().exercices.delete.isLoading).toBe(false);
            });

            test("Then the exercices list contains the created exercices", async () => {
                expect(testStore.getState().exercices.list.exercices).toBe(exercicesCreated);
            });
        });
    });

    describe("Given two exercices are already created", () => {
        beforeAll(async () => {
            testStore = await createTestStoreWithExercices();
            exerciceIdToDelete = testStore.getState().exercices.list.exercices[0].id;
        });

        describe("When the exercice deletion starts", () => {
            beforeAll(async () => {
                deleteExerciceUseCase(exerciceIdToDelete)(testStore.dispatch, testStore.getState, {
                    exerciceRepository: new ExerciceLoadingRepositoryFake(),
                },);
            });

            test("Then it should set the loading to true", async () => {
                expect(testStore.getState().exercices.delete.isLoading).toBe(true);
            });
        });
    });

    describe("Given two exercices are already created", () => {
        beforeAll(async () => {
            testStore = await createTestStoreWithExercices();
            exercicesCreated = testStore.getState().exercices.list.exercices;
            exerciceIdToDelete = exercicesCreated[0].id;
        });

        describe("When the exercice is deleted successfully", () => {
            beforeEach(async () => {
                await deleteExerciceUseCase(exerciceIdToDelete)(testStore.dispatch, testStore.getState, {
                    exerciceRepository: new ExerciceSuccessRepositoryFake(),
                },);
            });

            test("Then it should set the loading to false", () => {
                expect(testStore.getState().exercices.delete.isLoading).toBe(false);
            });

            test("Then the exercice should be removed from the list", () => {
                expect(testStore.getState().exercices.list.exercices.length).toBe(exercicesCreated.length - 1,);

                const exercicesInStore = testStore.getState().exercices.list.exercices;
                const ExerciceDeletedInStore = exercicesInStore.find((exercice) => exercice.id === exerciceIdToDelete,);
                expect(ExerciceDeletedInStore).toBeUndefined();
            });

            test("Then it should set a success notification", () => {
                const deleteSuccessNotification = testStore
                    .getState()
                    .notifications.list.find(
                        (notification) => notification.message === "Exercice suppression réussie",);

                expect(deleteSuccessNotification).not.toBeUndefined();
                expect(deleteSuccessNotification?.type).toBe(NotificationType.SUCCESS);
            });
        });
    });

    describe("Given two exercices are already created", () => {
        beforeAll(async () => {
            testStore = await createTestStoreWithExercices();
            exercicesCreated = testStore.getState().exercices.list.exercices;
            exerciceIdToDelete = exercicesCreated[0].id;
        });

        describe("When the exercice deletion fails", () => {
            beforeEach(async () => {
                await deleteExerciceUseCase(exerciceIdToDelete)(testStore.dispatch, testStore.getState, {
                    exerciceRepository: new ExerciceErrorRepositoryFake(),
                },);
            });

            test("Then it should set the loading to false", () => {
                expect(testStore.getState().exercices.delete.isLoading).toBe(false);
            });

            test("Then it should set an error notification", () => {
                const deleteErrorNotification = testStore
                    .getState()
                    .notifications.list.find(
                        (notification) => notification.message === "Exercice suppression échouée",);

                expect(deleteErrorNotification).not.toBeUndefined();
                expect(deleteErrorNotification?.type).toBe(NotificationType.ERROR);
            });
        });
    });
});
