import {AppStore} from "@/src/shared/application/root.store";
import {Exercice, ExercicesSortedByMuscle,} from "@/src/exercice/features/shared/exercice.model.type";
import {createTestStoreWithExercices} from "@/src/exercice/features/shared/test/utils/create-test-store-with-exercices";
import {ExerciceLoadingRepositoryFake} from "@/src/exercice/features/shared/test/exercice-loading.repository.fake";
import {deleteExerciceUseCase} from "@/src/exercice/features/delete-exercice/delete-exercice.use-case";
import {ExerciceSuccessRepositoryFake} from "@/src/exercice/features/shared/test/exercice-success.repository.fake";
import {ExerciceErrorRepositoryFake} from "@/src/exercice/features/shared/test/exercice-error.repository.fake";
import {NotificationType} from "@/src/notification/features/shared/notification-type.enum";
import {
    getDeleteExerciceError, getDeleteExerciceStatus
} from "@/src/exercice/features/delete-exercice/delete-exercice.selectors";
import {getExercicesListData} from "@/src/exercice/features/list-exercices/list-exercices.selectors";
import {getNotificationsList} from "@/src/notification/features/shared/notification.selectors";

describe("As a user i want to delete a created exercice", () => {
    let exercicesCreated: Exercice[] | ExercicesSortedByMuscle[];
    let exerciceIdToDelete: string;
    let testStore: AppStore;

    describe("Given two exercices are already created", () => {
        beforeAll(async () => {
            testStore = await createTestStoreWithExercices();
            exercicesCreated = getExercicesListData(testStore.getState());
        });

        describe("When the exercice deletion has not started", () => {
            test("Then the status should be idle", async () => {
                expect(getDeleteExerciceStatus(testStore.getState())).toBe("idle");
            });

            test("Then there should be no error", async () => {
                expect(getDeleteExerciceError(testStore.getState())).toBe(null);
            });

            test("Then the exercices list should still contains the created exercices", async () => {
                expect(getExercicesListData(testStore.getState())).toBe(exercicesCreated);
            });
        });
    });

    describe("Given two exercices are already created", () => {
        beforeAll(async () => {
            testStore = await createTestStoreWithExercices();
            exerciceIdToDelete = getExercicesListData(testStore.getState())[0].id;
        });

        describe("When the exercice deletion starts", () => {
            beforeAll(async () => {
                deleteExerciceUseCase(exerciceIdToDelete)(testStore.dispatch, testStore.getState, {
                    exerciceRepository: new ExerciceLoadingRepositoryFake(),
                });
            });

            test("Then the status should be loading", async () => {
                expect(getDeleteExerciceStatus(testStore.getState())).toBe("loading");
            });
        });
    });

    describe("Given two exercices are already created", () => {
        beforeAll(async () => {
            testStore = await createTestStoreWithExercices();
            exercicesCreated = getExercicesListData(testStore.getState());
            exerciceIdToDelete = exercicesCreated[0].id;
        });

        describe("When the exercice is deleted successfully", () => {
            beforeEach(async () => {
                await deleteExerciceUseCase(exerciceIdToDelete)(testStore.dispatch, testStore.getState, {
                    exerciceRepository: new ExerciceSuccessRepositoryFake(),
                },);
            });

            test("Then the status should be loading", async () => {
                expect(getDeleteExerciceStatus(testStore.getState())).toBe("success");
            });

            test("Then the exercice should be removed from the list", () => {
                expect(getExercicesListData(testStore.getState()).length).toBe(exercicesCreated.length - 1,);

                const ExerciceDeletedInStore = getExercicesListData(testStore.getState()).find(
                    (exercice) => exercice.id === exerciceIdToDelete,);
                expect(ExerciceDeletedInStore).toBeUndefined();
            });

            test("Then it should set a success notification", () => {
                const deleteSuccessNotification = getNotificationsList(testStore.getState()).find(
                    (notification) => notification.message === "Exercice suppression réussie",);

                expect(deleteSuccessNotification).not.toBeUndefined();
                expect(deleteSuccessNotification?.type).toBe(NotificationType.SUCCESS);
            });
        });
    });

    describe("Given two exercices are already created", () => {
        beforeAll(async () => {
            testStore = await createTestStoreWithExercices();
            exercicesCreated = getExercicesListData(testStore.getState());
            exerciceIdToDelete = exercicesCreated[0].id;
        });

        describe("When the exercice deletion fails", () => {
            beforeEach(async () => {
                await deleteExerciceUseCase(exerciceIdToDelete)(testStore.dispatch, testStore.getState, {
                    exerciceRepository: new ExerciceErrorRepositoryFake(),
                },);
            });

            test("Then the status should be error", async () => {
                expect(getDeleteExerciceStatus(testStore.getState())).toBe("error");
            });

            test("Then there should be an error", async () => {
                expect(getDeleteExerciceError(testStore.getState())).toBe("Exercice suppression échouée");
            });

            test("Then it should set an error notification", () => {
                const deleteErrorNotification = getNotificationsList(testStore.getState()).find(
                    (notification) => notification.message === "Exercice suppression échouée");

                expect(deleteErrorNotification).not.toBeUndefined();
                expect(deleteErrorNotification?.type).toBe(NotificationType.ERROR);
            });
        });
    });
});
