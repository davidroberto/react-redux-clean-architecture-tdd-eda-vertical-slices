import {AppStore} from "@/src/shared/application/root.store";
import {ExerciceLoadingRepositoryFake} from "@/src/exercice/features/shared/test/exercice-loading.repository.fake";
import {ExerciceSuccessRepositoryFake} from "@/src/exercice/features/shared/test/exercice-success.repository.fake";
import {ExerciceErrorRepositoryFake} from "@/src/exercice/features/shared/test/exercice-error.repository.fake";
import {createTestStore} from "@/src/shared/application/test/test.store";
import {createExerciceUseCase} from "@/src/exercice/features/create-exercice/create-exercice.use-case";
import {CreateExerciceCommand} from "@/src/exercice/features/create-exercice/create-exercice.command";
import {NotificationType} from "@/src/notification/features/shared/notification-type.enum";

describe("As a user i want to create an exercice", () => {
    let testStore: AppStore;
    const createExerciceCommand: CreateExerciceCommand = {
        title: "Romanian Deadlift",
        description: "The Romanian deadlift is a variation of the conventional deadlift that targets the posterior chain, including the hamstrings, glutes, and lower back.",
        image: "https://wger.de/media/exercise-images/89/Romanian-deadlift-1.png",
        youtubeVideoUrl: "https://www.youtube.com/watch?v=jEy_czb3RKA",
        primaryMuscles: [{id: "201"}],
        secondaryMuscles: [{id: "202"}],
    };

    describe("Given no exercice is already created", () => {
        beforeAll(() => {
            testStore = createTestStore();
        });

        describe("When the the exercice creation has not started", () => {
            test("Then the loading should be false", async () => {
                expect(testStore.getState().exercices.list.isLoading).toBe(false);
            });
            test("Then the exercices list should be empty", async () => {
                expect(testStore.getState().exercices.list.exercices.length).toBe(0);
            });
        });
    });

    describe("Given no exercice is already created", () => {
        beforeAll(() => {
            testStore = createTestStore();
        });

        describe("When the exercice creation starts", () => {
            beforeAll(() => {
                createExerciceUseCase(createExerciceCommand)(testStore.dispatch, testStore.getState, {
                    exerciceRepository: new ExerciceLoadingRepositoryFake(),
                },);
            });

            test("Then the loading should be true", async () => {
                expect(testStore.getState().exercices.create.isLoading).toBe(true);
            });

            test("Then the exercices list should be empty", async () => {
                expect(testStore.getState().exercices.list.exercices.length).toBe(0);
            });

        });
    });

    describe("Given no exercice is already created", () => {
        beforeAll(() => {
            testStore = createTestStore();
        });

        describe("When the exercice is created successfully", () => {
            beforeAll(async () => {
                await createExerciceUseCase(createExerciceCommand)(testStore.dispatch, testStore.getState, {
                    exerciceRepository: new ExerciceSuccessRepositoryFake(),
                },);
            });

            test("Then the loading should be false", () => {
                expect(testStore.getState().exercices.create.isLoading).toBe(false);
            });

            test("Then it should add a success notification", () => {
                const createSuccessNotification = testStore
                    .getState()
                    .notifications.list.find((notification) => notification.message === "Exercice créé",);

                expect(createSuccessNotification).not.toBeUndefined();
                expect(createSuccessNotification?.type).toBe(NotificationType.SUCCESS);
            });

            test("Then the new exercice should be in the list", () => {
                const exercicesInStore = testStore.getState().exercices.list.exercices;

                const newExerciceInStore = exercicesInStore.find(
                    (exercice) => exercice.title === createExerciceCommand.title,);
                expect(newExerciceInStore).not.toBeUndefined();
            });
        });
    });

    describe("Given no exercice is already created", () => {
        beforeAll(() => {
            testStore = createTestStore();
        });

        describe("When creating an exercice fails (server)", () => {
            beforeAll(async () => {
                await createExerciceUseCase(createExerciceCommand)(testStore.dispatch, testStore.getState, {
                    exerciceRepository: new ExerciceErrorRepositoryFake(),
                },);
            });
            test("Then the loading should be false", () => {
                expect(testStore.getState().exercices.create.isLoading).toBe(false);
            });

            test("Then the exercices list should be empty", async () => {
                expect(testStore.getState().exercices.list.exercices.length).toBe(0);
            });

            test("Then it should add an error notification", () => {
                const createExerciceErrorNotification = testStore
                    .getState()
                    .notifications.list.find((notification) => notification.message === "Exercice création échouée");

                expect(createExerciceErrorNotification).not.toBeUndefined();
                expect(createExerciceErrorNotification?.type).toBe(NotificationType.ERROR,);
            });
        });

        describe("When creating an exercice fails (title too short)", () => {
            beforeAll(async () => {
                const createExerciceCommandWithShortTitle = {
                    ...createExerciceCommand,
                    title: "R",
                };

                await createExerciceUseCase(createExerciceCommandWithShortTitle)(
                    testStore.dispatch, testStore.getState, {
                        exerciceRepository: new ExerciceSuccessRepositoryFake(),
                    },);
            });
            test("Then the loading should be false", () => {
                expect(testStore.getState().exercices.create.isLoading).toBe(false);
            });

            test("Then the exercices list should be empty", async () => {
                expect(testStore.getState().exercices.list.exercices.length).toBe(0);
            });

            test("Then it should add an error notification", () => {
                const createExerciceErrorNotification = testStore
                    .getState()
                    .notifications.list.find(
                        (notification) => notification.message === "Exercice création échouée : titre trop court");

                expect(createExerciceErrorNotification).not.toBeUndefined();
                expect(createExerciceErrorNotification?.type).toBe(NotificationType.ERROR);
            });
        });
    });
});
