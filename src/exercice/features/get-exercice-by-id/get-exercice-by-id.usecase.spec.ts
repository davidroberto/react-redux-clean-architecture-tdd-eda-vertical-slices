import {AppStore} from "@/src/shared/application/root.store";
import {createTestStoreWithExercices} from "@/src/exercice/features/shared/test/utils/create-test-store-with-exercices";
import {ExerciceLoadingRepositoryFake} from "@/src/exercice/features/shared/test/exercice-loading.repository.fake";
import {getExerciceByIdUseCase} from "@/src/exercice/features/get-exercice-by-id/get-exercice-by-id.usecase";
import {ExerciceSuccessRepositoryFake} from "@/src/exercice/features/shared/test/exercice-success.repository.fake";
import {ExerciceErrorRepositoryFake} from "@/src/exercice/features/shared/test/exercice-error.repository.fake";
import {
    getExerciceByIdData, getExerciceByIdError, getExerciceByIdStatus
} from "@/src/exercice/features/get-exercice-by-id/get-exercice-by-id.state.model";
import {getExercicesListData} from "@/src/exercice/features/list-exercices/list-exercices.state.model";
import {getNotificationsList, NotificationType} from "@/src/notification/features/shared/notification.state.model";
import {Exercice, ExercicesSortedByMuscle} from "@/src/exercice/features/shared/exercice.state";

let testStore: AppStore;

describe("As a user i want to get an exercice by its id", () => {
    let exercices: Exercice[] | ExercicesSortedByMuscle[];
    let exerciceIdToRetrieve: string;

    describe("Given two exercices are created", () => {
        beforeAll(async () => {
            testStore = await createTestStoreWithExercices();
            exercices = getExercicesListData(testStore.getState());
            exerciceIdToRetrieve = exercices[0].id;
        });

        describe("When the exercice fetching has not started", () => {

            test("Then the status should be idle", async () => {
                expect(getExerciceByIdStatus(testStore.getState())).toBe("idle");
            });

            test("Then the data should not contains the exercice", async () => {
                expect(getExerciceByIdData(testStore.getState())).toBe(null);
            });

            test("Then there should be no error", async () => {
                expect(getExerciceByIdError(testStore.getState())).toBe(null);
            });
        });
    });

    describe("Given two exercices are created", () => {
        beforeAll(async () => {
            testStore = await createTestStoreWithExercices();
            exercices = getExercicesListData(testStore.getState());
            exerciceIdToRetrieve = exercices[0].id;
        });

        describe("When the exercice fetching starts", () => {
            beforeAll(async () => {
                getExerciceByIdUseCase(exerciceIdToRetrieve)(testStore.dispatch, testStore.getState, {
                    exerciceRepository: new ExerciceLoadingRepositoryFake(),
                },);
            });

            test("Then the status should be loading", async () => {
                expect(getExerciceByIdStatus(testStore.getState())).toBe("loading");
            });

            test("Then the data should not contains the exercice", async () => {
                expect(getExerciceByIdData(testStore.getState())).toBe(null);
            });

            test("Then there should be no error", async () => {
                expect(getExerciceByIdError(testStore.getState())).toBe(null);
            });

        });
    });

    describe("Given two exercices are created", () => {
        beforeAll(async () => {
            testStore = await createTestStoreWithExercices();
            exercices = getExercicesListData(testStore.getState());
            exerciceIdToRetrieve = exercices[0].id;
        });

        describe("When the exercice is retrieved successfully", () => {
            beforeAll(async () => {
                await getExerciceByIdUseCase(exerciceIdToRetrieve)(testStore.dispatch, testStore.getState, {
                    exerciceRepository: new ExerciceSuccessRepositoryFake(),
                },);
            });

            test("Then the status should be success", async () => {
                expect(getExerciceByIdStatus(testStore.getState())).toBe("success");
            });

            test("Then the data should contains the exercice", async () => {
                expect(getExerciceByIdData(testStore.getState())).toStrictEqual(exercices[0]);
            });

            test("Then there should be no error", async () => {
                expect(getExerciceByIdError(testStore.getState())).toBe(null);
            });
            test("Then it should set a success notification", async () => {
                const getSuccessNotification = getNotificationsList(testStore.getState()).find(
                    (notification) => notification.message === "Exercice récupération réussie",);

                expect(getSuccessNotification).not.toBeUndefined();
                expect(getSuccessNotification?.type).toBe(NotificationType.SUCCESS);
            });
        });
    });

    describe("Given two exercices are created", () => {
        beforeAll(async () => {
            testStore = await createTestStoreWithExercices();
            exercices = getExercicesListData(testStore.getState());
            exerciceIdToRetrieve = exercices[0].id;
        });

        describe("When the exercice retrieval fails", () => {
            beforeAll(async () => {
                await getExerciceByIdUseCase(exerciceIdToRetrieve)(testStore.dispatch, testStore.getState, {
                    exerciceRepository: new ExerciceErrorRepositoryFake(),
                },);
            });

            test("Then the status should be error", async () => {
                expect(getExerciceByIdStatus(testStore.getState())).toBe("error");
            });

            test("Then there should be an error", async () => {
                expect(getExerciceByIdError(testStore.getState())).toBe("Exercice récupération échouée");
            });

            test("Then the data should not contains the exercice", async () => {
                expect(getExerciceByIdData(testStore.getState())).toBe(null);
            });

            test("Then it should set an error notification", async () => {
                const getErrorNotification = getNotificationsList(testStore.getState()).find(
                    (notification) => notification.message === "Exercice récupération échouée",);

                expect(getErrorNotification).not.toBeUndefined();
                expect(getErrorNotification?.type).toBe(NotificationType.ERROR);
            });
        });
    });

});
