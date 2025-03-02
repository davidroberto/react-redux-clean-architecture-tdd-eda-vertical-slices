import {configureStore} from "@reduxjs/toolkit";
import rootReducer from "@/src/shared/application/root.reducer";
import ExerciceRepositoryInMemory from "@/src/exercice/features/shared/infrastructure/exercice.repository.in-memory";
import {ExerciceRepositoryInterface} from "@/src/exercice/features/shared/exercice.repository.interface";

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        thunk: {
            extraArgument: {
                exerciceRepository: new ExerciceRepositoryInMemory(),
            },
        },
    }),
});

export type AppStore = typeof store;

export type Container = {
    exerciceRepository: ExerciceRepositoryInterface;
};

export default store;



