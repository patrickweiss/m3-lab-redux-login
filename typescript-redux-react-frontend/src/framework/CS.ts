import { createStore, compose, applyMiddleware } from 'redux';
import { reducer } from '../reducer/appReducer'
import ReduxThunk from 'redux-thunk';

import { IUI, IBM } from '../state/appState';
import { IWindow } from '../framework/IWindow'
import { IAction } from './IAction';
declare let window: IWindow;

//Dev tools are needed so we can see the state in the browser
//Redux thunk is needed for actions that make a rest call in order to create another action, when the server responds
let reduxMiddleware: any;
if (window.__REDUX_DEVTOOLS_EXTENSION__) {
    reduxMiddleware = compose(
        applyMiddleware(ReduxThunk),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );
} else { reduxMiddleware = applyMiddleware(ReduxThunk); }


export class CS {
    private store: any;
    public log(message: string) {
        console.log(message);
    }
    public getStore(){
        return this.store;
    }
    public getState() {
        return this.store.getState();
    }
    public getUIState() {
        return this.getState().UI as IUI;
    }
    public getBMState() {
        return this.getState().BM as IBM;
    }
    public initializeStore() {
        this.store = createStore(
            reducer,
            reduxMiddleware
        );
    }
   //changed this to any because of the thunk returning a function ...
   public clientAction(action:IAction | Function){
    this.store.dispatch(action);
    }
}