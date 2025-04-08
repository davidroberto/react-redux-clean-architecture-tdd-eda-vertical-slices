import {configureStore} from "@reduxjs/toolkit";
import rootReducer from "@/src/shared/application/root.reducer";

import {RootState} from "@/src/shared/application/root.state";

export const createTestStore = (preloadedState?: Partial<RootState>, extraArgument = {},) => configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        thunk: {
            extraArgument,
        },
    }),
});
