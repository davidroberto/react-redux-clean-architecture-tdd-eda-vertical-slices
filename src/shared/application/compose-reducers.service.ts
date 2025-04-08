import {Reducer, UnknownAction} from "redux";

const composeReducers = <State>(...reducers: Reducer[]) => {
    return (state: State, action: UnknownAction) => {
        return reducers.reduce((currentState, reducer) => {
            return reducer(currentState, action);
        }, state);
    };
};

export default composeReducers;