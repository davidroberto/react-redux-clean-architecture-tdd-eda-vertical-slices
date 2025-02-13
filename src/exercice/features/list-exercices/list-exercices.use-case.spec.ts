import {AppStore} from "@/src/shared/application/root.store";
import {listExercicesUseCase} from "@/src/exercice/features/list-exercices/list-exercices.use-case";
import {Exercice} from "@/src/exercice/features/shared/exercice.model.type";
import {ExerciceErrorRepositoryFake} from "@/src/exercice/features/shared/test/exercice-error.repository.fake";
import {ExerciceLoadingRepositoryFake} from "@/src/exercice/features/shared/test/exercice-loading.repository.fake";
import {ExerciceSuccessRepositoryFake} from "@/src/exercice/features/shared/test/exercice-success.repository.fake";
import {NotificationType} from "@/src/notification/features/shared/notification-type.enum";
import {createTestStore} from "@/src/shared/application/test/test.store";

describe("As a user i want to get all exercices", () => {
    let testStore: AppStore;
    let exercices: Exercice[];

    describe("Given two exercices are created", () => {
        beforeAll(async () => {
            testStore = createTestStore();
            const exerciceSuccessRepository = new ExerciceSuccessRepositoryFake();
            exercices = await exerciceSuccessRepository.findAll();
        });
        describe("When the the exercices retrieval has not started", () => {
            test("Then the loading should be false", async () => {
                expect(testStore.getState().exercices.list.isLoading).toBe(false);
            });
            test("Then the exercices should be empty", async () => {
                expect(testStore.getState().exercices.list.exercices.length).toBe(0);
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
            test("Then it should set the loading to true", async () => {
                expect(testStore.getState().exercices.list.isLoading).toBe(true);
            });
            test("Then the exercices should be empty", async () => {
                expect(testStore.getState().exercices.list.exercices.length).toBe(0);
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
            test("Then it should set the loading to false", async () => {
                expect(testStore.getState().exercices.list.isLoading).toBe(false);
            });
            test("Then it should set the retrieved exercices", async () => {
                expect(testStore.getState().exercices.list.exercices).toEqual(exercices);
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
            test("Then it should set an error message", async () => {
                const getErrorNotification = testStore
                    .getState()
                    .notifications.list.find(
                        (notification) => notification.message === "Exercices récupération échouée",);
                expect(getErrorNotification).not.toBeUndefined();
                expect(getErrorNotification?.type).toBe(NotificationType.ERROR);
            });
            test("Then it should set loading to false", async () => {
                expect(testStore.getState().exercices.list.isLoading).toBe(false);
            });
        });
    });
});
