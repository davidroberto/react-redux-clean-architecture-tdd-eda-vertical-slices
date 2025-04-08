import {AppStore} from "@/src/shared/application/root.store";
import {listExercicesUseCase} from "@/src/exercice/features/list-exercices/list-exercices.use-case";
import {Exercice, ExercicesSortedByMuscle} from "@/src/exercice/features/shared/exercice.model.type";
import {ExerciceErrorRepositoryFake} from "@/src/exercice/features/shared/test/exercice-error.repository.fake";
import {ExerciceLoadingRepositoryFake} from "@/src/exercice/features/shared/test/exercice-loading.repository.fake";
import {ExerciceSuccessRepositoryFake} from "@/src/exercice/features/shared/test/exercice-success.repository.fake";
import {createTestStore} from "@/src/shared/application/test/test.store";
import {
    getExercicesListData, getExercicesListError, getExercicesListStatus
} from "@/src/exercice/features/list-exercices/list-exercices.state.model";
import {getNotificationsList, NotificationType} from "@/src/notification/features/shared/notification.state.model";

describe("As a user i want to get all exercices", () => {
    let testStore: AppStore;
    let exercices: Exercice[] | ExercicesSortedByMuscle[];

    describe("Given two exercices are created", () => {
        beforeAll(async () => {
            testStore = createTestStore();
            const exerciceSuccessRepository = new ExerciceSuccessRepositoryFake();
            exercices = await exerciceSuccessRepository.findAll();
        });
        describe("When the the exercices fetching has not started", () => {
            test("Then the status should be idle", async () => {
                expect(getExercicesListStatus(testStore.getState())).toBe("idle");
            });

            test("Then the data should not contains the exercices", async () => {
                expect(getExercicesListData(testStore.getState()).length).toBe(0);
            });

            test("Then there should be no error", async () => {
                expect(getExercicesListError(testStore.getState())).toBe(null);
            });
        });
    });

    describe("Given two exercices are created", () => {
        beforeAll(async () => {
            testStore = createTestStore();
            const exerciceSuccessRepository = new ExerciceSuccessRepositoryFake();
            exercices = await exerciceSuccessRepository.findAll();
        });
        describe("When the exercices retrieval starts", () => {
            beforeAll(async () => {
                listExercicesUseCase()(testStore.dispatch, testStore.getState, {
                    exerciceRepository: new ExerciceLoadingRepositoryFake(),
                });
            });

            test("Then the status should be loading", async () => {
                expect(getExercicesListStatus(testStore.getState())).toBe("loading");
            });

            test("Then the data should not contains the exercices", async () => {
                expect(getExercicesListData(testStore.getState()).length).toBe(0);
            });

            test("Then there should be no error", async () => {
                expect(getExercicesListError(testStore.getState())).toBe(null);
            });
        });
    });

    describe("Given two exercices are created", () => {
        beforeAll(async () => {
            testStore = createTestStore();
            const exerciceSuccessRepository = new ExerciceSuccessRepositoryFake();
            exercices = await exerciceSuccessRepository.findAll();
        });
        describe("When the exercices are retrieved successfully", () => {
            beforeAll(async () => {
                await listExercicesUseCase()(testStore.dispatch, testStore.getState, {
                    exerciceRepository: new ExerciceSuccessRepositoryFake(),
                });
            });

            test("Then the status should be success", async () => {
                expect(getExercicesListStatus(testStore.getState())).toBe("success");
            });

            test("Then the data should contains the exercices", async () => {
                expect(getExercicesListData(testStore.getState())).toEqual(exercices);
            });

            test("Then there should be no error", async () => {
                expect(getExercicesListError(testStore.getState())).toBe(null);
            });
        });
    });

    describe("Given two exercices are created", () => {
        beforeAll(async () => {
            testStore = createTestStore();
            const exerciceSuccessRepository = new ExerciceSuccessRepositoryFake();
            exercices = await exerciceSuccessRepository.findAll();
        });
        describe("When the exercices loading fails", () => {
            beforeAll(async () => {
                listExercicesUseCase()(testStore.dispatch, testStore.getState, {
                    exerciceRepository: new ExerciceErrorRepositoryFake(),
                });
            });

            test("Then the status should be error", async () => {
                expect(getExercicesListStatus(testStore.getState())).toBe("error");
            });

            test("Then the data should not contains the exercices", async () => {
                expect(getExercicesListData(testStore.getState()).length).toEqual(0);
            });

            test("Then there should be an error", async () => {
                expect(getExercicesListError(testStore.getState())).toBe("Exercices récupération échouée");
            });

            test("Then it should set an error message", async () => {
                const getErrorNotification = getNotificationsList(testStore.getState()).find(
                    (notification) => notification.message === "Exercices récupération échouée");
                expect(getErrorNotification).not.toBeUndefined();
                expect(getErrorNotification?.type).toBe(NotificationType.ERROR);
            });

        });
    });
});
