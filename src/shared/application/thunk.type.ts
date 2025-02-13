import {Container, RootState} from "@/src/shared/application/root.store";
import {Action} from "@reduxjs/toolkit";
import {ThunkAction} from "redux-thunk";

export type Thunk<ReturnType = Promise<void>> = ThunkAction<
    ReturnType,
    RootState,
    Container,
    Action
>;
