import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

//import framework components
//CS: ClientServices, we will use them a lot, so to shorten the code they are just called: CS
import { CS } from './framework/CS';
//we will add a CS instance to the window object.
//We also want the window object strictly typed, so we declare that window has the type "IWindow"
import { IWindow } from './framework/IWindow'
declare let window: IWindow;
window.CS = new CS();
//we create the inital Application State
window.CS.initializeStore();

//now we can render this state to the DOM using React
ReactDOM.render(<App stateCounter={window.CS.getUIState().counter} />, document.getElementById('root'));


//whenever there is a new state, we render the whole virtual DOM again
//React will take care that only the differences from the previous and
//the current virtual DOM will be rendered to the browser DOM
window.CS.getStore().subscribe(() => {
  window.CS.log("3. before render ---------------------------------------------");
  ReactDOM.render(<App stateCounter={window.CS.getUIState().counter} />, document.getElementById('root'));
  window.CS.log("3. after render ---------------------------------------------");
});


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
