import React, { Component } from 'react';
import axios from 'axios';

//this file defines the React component that renders a single asset to the browser window
//it also contains the logic to change asset properties and save the changes to the database
//most of the used React framework features are already explained in the comments of App.js
//so this code hopefully mostly explains itself ...

export default class SimpleAsset extends Component {

    constructor(props) {
        super(props);

        this.handleEdit = this.handleEdit.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleValueChange = this.handleValueChange.bind(this);
        this.handleSave = this.handleSave.bind(this);

        //one new thing is, that the state will be initialized by properties that are set when the component is created in the container element:
        //look for "<SimpleAsset key={newAsset._id} onDelete={this.handleDeleteAsset} edit={true} asset={newAsset} />" in App.js
        this.state = {
            delete_function: props.onDelete,
            edit_mode: props.edit,
            asset: props.asset,
        }
    }

    render() {
        
        //if the component is in edit mode, it will render different than if it just shows the data
        
        if (this.state.edit_mode)
            return (
                <tr>
                    <td><input type="text" name="name" value={this.state.asset.asset_name} onChange={this.handleNameChange} /></td>
                    <td><input type="text" name="value" value={this.state.asset.asset_value} onChange={this.handleValueChange} /> €</td>
                    <td> <button onClick={this.handleSave} id={this.state.asset._id}>save</button></td>
                </tr>
            )
        else
            return (
                <tr>
                    <td>{this.state.asset.asset_name}</td>
                    <td>{this.state.asset.asset_value} €</td>
                    <td>
                        <button onClick={this.handleEdit}>edit</button>
                        <button onClick={this.state.delete_function} id={this.state.asset._id}>sell or dispose</button>
                    </td>
                </tr>
            )
    }

    handleNameChange(event) {
        this.setState({
            asset: {
                _id: this.state.asset._id,
                asset_name: event.target.value,
                asset_value: this.state.asset.asset_value
            }
        });
    }

    handleValueChange(event) {
        this.setState({
            asset: {
                _id: this.state.asset._id,
                asset_name: this.state.asset.asset_name,
                asset_value: event.target.value
            }
        });
    }

    handleSave(event) {
        const IdOfAssetToDelete = event.target.id;
  
        axios.post('http://localhost:8080/assets/update/' + IdOfAssetToDelete, this.state.asset)
            .then(res => console.log(res.data));

        this.setState({ edit_mode: false });
    }
    handleEdit() {
        this.setState({ edit_mode: true });
    }
}