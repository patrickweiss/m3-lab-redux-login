import React from 'react';
import NavBar from './components/NavBar';
import Login from './components/Login';
import Register from './components/Register';
import ShowAssets from './components/ShowAssets';
import { Switch, Route } from 'react-router-dom';
import { IWindow } from './framework/IWindow'
declare let window: IWindow;

interface IProps {
  stateCounter: number
}
export default class App extends React.PureComponent<IProps> {
 
  render() {
    window.CS.log("App --> render()")
    return (
      <>
        <NavBar />
        <Switch>
          <Route path="/showassets" component={ShowAssets} />
          <Route path="/register" component={Register} />
          <Route exact={true} path="/" component={Login} />
        </Switch>
       
      </>
    );
  }
 
}

