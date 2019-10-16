import { initial, IState } from '../state/appState'
import { IWindow } from '../framework/IWindow'
import { IAction, ActionType } from '../framework/IAction'

declare let window: IWindow;

export const reducerFunctions:any = {};

export const reducer = (state = initial, action: IAction) => {
    window.CS.log("2. ACTION:" + action.type);
    let newState:IState = JSON.parse(JSON.stringify(state)) as IState;
    newState.UI.counter = state.UI.counter + 1;
    const reducerFunction = reducerFunctions[action.type];
	if (reducerFunction !== undefined) {
		reducerFunction(newState,action);
        return newState;
    }
    switch (action.type) {
        case ActionType.INIT:
            return newState;
        default:
            window.CS.log("1. Error!!!!! no reducer defined");
            return newState;
    }
}

