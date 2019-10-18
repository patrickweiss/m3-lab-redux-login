import React, { Component } from 'react'
import { IWindow } from '../framework/IWindow';
import { IAction, ActionType } from '../framework/IAction';
import { IUser, IState } from '../state/appState';
import { reducerFunctions } from '../reducer/appReducer';
import axios from 'axios';
declare let window: IWindow;


export interface IUserAction extends IAction {
    user: IUser
}

reducerFunctions[ActionType.update_user] = function (newState: IState, action: IUserAction) {
    newState.BM.user = action.user;
    return newState;
}
reducerFunctions[ActionType.user_created] = function (newState: IState, action: IUserAction) {
    newState.UI.waitingForResponse = false;
    newState.UI.loggedIn = true;
    return newState;
}

export default class Register extends Component {
    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="firstname">First name:</label>
                    <input type="firstname" placeholder="firstname" onChange={this.handleFirstnameChange} value={window.CS.getBMState().user.firstname} />
                    <br />
                    <label htmlFor="lastname">Last name:</label>
                    <input type="lastname" placeholder="lastname" onChange={this.handleLastnameChange} value={window.CS.getBMState().user.lastname} />
                    <br />
                    <label htmlFor="username">Username:</label>
                    <input type="username" placeholder="Your username" onChange={this.handleUsernameChange} value={window.CS.getBMState().user.username} />
                    <br />
                    <label htmlFor="password">Password:</label>
                    <input type="password" placeholder="********" onChange={this.handlePasswordChange} value={window.CS.getBMState().user.password} />
                    <br />
                    <input type="submit" value="Register as new User" />
                </form>
            </div>
        )
    }

    handleFirstnameChange(event: any) {
        let user = window.CS.getBMState().user;
        user.firstname = event.target.value;
        const action: IUserAction = {
            type: ActionType.update_user,
            user: user
        }
        window.CS.clientAction(action);
    }
    handleLastnameChange(event: any) {
        let user = window.CS.getBMState().user;
        user.lastname = event.target.value;
        const action: IUserAction = {
            type: ActionType.update_user,
            user: user
        }
        window.CS.clientAction(action);
    }
    handleUsernameChange(event: any) {
        let user = window.CS.getBMState().user;
        user.username = event.target.value;
        const action: IUserAction = {
            type: ActionType.update_user,
            user: user
        }
        window.CS.clientAction(action);
    }
    handlePasswordChange(event: any) {
        let user = window.CS.getBMState().user;
        user.password = event.target.value;
        const action: IUserAction = {
            type: ActionType.update_user,
            user: user
        }
        window.CS.clientAction(action);
    }
    handleSubmit(event:any){
        event.preventDefault();
        const uiAction: IAction = {
            type:ActionType.server_called
        }
        window.CS.clientAction(uiAction);
        axios.post(window.CS.getDBServerURL()+"/signup",window.CS.getBMState().user)
        .then(res => {
            const uiAction: IAction = {
                type:ActionType.user_created
            }
            window.CS.clientAction(uiAction);
        })
    }
}
