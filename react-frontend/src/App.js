import React, { Component } from 'react';
import SimpleAsset from './components/SimpleAsset.js'
import axios from 'axios';
import mongoose from 'mongoose';

export default class App extends Component {


  constructor(props) {
    console.log("new App component will be created");
    super(props);

    this.handleCreateAsset = this.handleCreateAsset.bind(this);
    this.handleDeleteAsset = this.handleDeleteAsset.bind(this);

    const exampleAsset = {
      _id: mongoose.Types.ObjectId(),
      asset_name: "This is an example asset. Press edit to change",
      asset_value: "500"
    }

    this.state = {
      assets: [
        <SimpleAsset key={exampleAsset._id} onDelete={this.handleDeleteAsset} asset={exampleAsset} />
      ]
    }

  }

  componentDidMount() {
    axios.get('http://localhost:8080/assets/')
      .then(response => {
        console.log( response.data );
      this.setState({
        assets : response.data.map(asset =>   <SimpleAsset key={asset._id} onDelete={this.handleDeleteAsset} asset={asset} />)
         });
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  render() {
    return (
      <div>
        <h1>simple asset management application</h1>
        <p>to create a new asset click this button:</p>
        <button onClick={this.handleCreateAsset}>create asset</button>
        {this.state.assets}
      </div>
    );
  }

  handleCreateAsset() {
    console.log("handleCreateAsset invoked");


    const newAsset = {
      _id: mongoose.Types.ObjectId(),
      asset_name: "Enter a descriptive name",
      asset_value: "0"
    }

    //now we have to add the new asset to the mongodb database
    axios.post('http://localhost:8080/assets/add', newAsset)
      .then(res => console.log(res.data));


    // the react framework only rerenders the UI, when it detects that the state changed
    // when there is an object or an array in the state, the framework doesn't detect if a property or an element of that array changed
    // we have to copy the elements of our array in a new array, in order for react to know, that we want to rerender the UI
    let newAssets = this.state.assets.slice();

    //now that we have a new array, that will trigger rerendering, we can add the new asset to it
    newAssets.push(<SimpleAsset key={newAsset.asset_id} onDelete={this.handleDeleteAsset} asset={newAsset} />);

    //we cannot just change the state, in order for react to know that we changed state and want rerendering, we need to call
    //the ".setState()" method. The method takes all properties of the state we want to change as arguments.
    this.setState(
      {
        assets: newAssets
      }
    );
    console.log(newAsset);
  }

  handleDeleteAsset(event) {
    const IDofAssetToDelete = event.target.id;
    console.log("Delete Asset with _id"+IDofAssetToDelete);

  //delete the asset in the mongodb database
  axios.get('http://localhost:8080/assets/delete/'+IDofAssetToDelete)
  .then(res => console.log(res.data));

 //delete the asset in the UI and trigger UI update by calling ".setState()"
    let newAssets = this.state.assets.filter(asset => asset.key !== IDofAssetToDelete)
    this.setState(
      {
        assets: newAssets
      }
    );
  }
}


