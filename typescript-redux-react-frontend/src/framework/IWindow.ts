import {CS} from '../framework/CS'

export interface IWindow extends Window {
    CS:CS;
    store: any;
    __REDUX_DEVTOOLS_EXTENSION__: any;
}