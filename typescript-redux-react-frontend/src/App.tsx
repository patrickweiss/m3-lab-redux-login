import React from 'react';
import SimpleAsset from './components/SimpleAsset'
import mongoose from 'mongoose';
import axios from 'axios';

import { IAction, ActionType } from './framework/IAction';
import { IWindow } from './framework/IWindow'
declare let window: IWindow;

interface IProps {
  stateCounter: number
}
export interface IAssetData {
  _id: string;
  asset_name: string;
  asset_value: number;
}

interface IState {
}

export interface IAssetAction extends IAction {
  asset: IAssetData
}

export interface IAssetsLoadedAction extends IAction {
  assets: IAssetData[]
}


export default class App extends React.PureComponent<IProps, IState> {

  constructor(props: any) {
    console.log("new App component will be initialized");
    super(props);

    this.handleCreateAsset = this.handleCreateAsset.bind(this);
  }

  componentDidMount() {
    const uiAction: IAction = {
      type: ActionType.server_called
    }
    window.CS.clientAction(uiAction);
    axios.get('http://localhost:8080/assets/read').then(response => {
      console.log("this data was loaded as a result of componentDidMount:");
      console.log(response.data);
      const responseAction: IAssetsLoadedAction = {
        type: ActionType.add_assets_from_server,
        assets: response.data as IAssetData[]
      }
      window.CS.clientAction(responseAction);
    }).catch(function (error) { console.log(error); })

  }

  render() {
    window.CS.log("App --> render()")
    return (
      <div>
        <p> {window.CS.getUIState().waitingForResponse.toString()}{window.CS.getUIState().counter}</p>
        <h1>simple asset management application</h1>
        <p>to create a new asset click this button:&nbsp;
          <button onClick={this.handleCreateAsset}>create asset</button>
        </p>
        <table>
          <tbody>
            <tr><th>description</th><th>value</th><th>action</th></tr>
            {window.CS.getBMState().assets.map(asset => <SimpleAsset key={asset._id} asset={asset} edit={false} />)}
          </tbody>
        </table>
      </div>
    );
  }

  handleCreateAsset() {
    console.log("handleCreateAsset invoked");
    const newAsset: IAssetData = {
      _id: mongoose.Types.ObjectId().toString(),
      asset_name: "",
      asset_value: 0
    }
    const action: IAssetAction = {
      type: ActionType.create_asset,
      asset: newAsset
    }
    window.CS.clientAction(action);
  }
}

