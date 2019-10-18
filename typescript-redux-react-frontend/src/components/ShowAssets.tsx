import React, { Component } from 'react'

import SimpleAsset from './SimpleAsset'
import mongoose from 'mongoose';
import { IAction, ActionType } from '../framework/IAction';
import {IAssetData, IState} from '../state/appState'
import { reducerFunctions } from '../reducer/appReducer';
import axios from 'axios';

import { IWindow } from '../framework/IWindow'
declare let window: IWindow;




export interface IAssetAction extends IAction {
  asset: IAssetData
}
reducerFunctions[ActionType.create_asset] = function (newState: IState, action: IAssetAction) {
  newState.UI.waitingForResponse = false;
  newState.BM.assets.push(action.asset);
  return newState;
}

export default class ShowAssets extends Component {
    constructor(props: any) {
        console.log("new App component will be initialized");
        super(props);
        this.handleCreateAsset = this.handleCreateAsset.bind(this);
      }
    render() {
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
        )
    }
    handleCreateAsset() {
        console.log("handleCreateAsset invoked");
        const uiAction: IAction = {
          type: ActionType.server_called
        }
        window.CS.clientAction(uiAction);
        const newAsset: IAssetData = {
          _id: mongoose.Types.ObjectId().toString(),
          asset_name: "",
          asset_value: 0
        }
        const action: IAssetAction = {
          type: ActionType.create_asset,
          asset: newAsset
        }
        axios.post('http://localhost:8080/assets/add', newAsset)
        .then(res =>{
          window.CS.clientAction(action);
        });
      }
}
