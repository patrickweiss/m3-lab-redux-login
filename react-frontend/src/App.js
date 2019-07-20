import React, { Component } from 'react';
import SimpleAsset from './components/SimpleAsset.js'
import axios from 'axios';
import mongoose from 'mongoose';

//By extending the React Component "Component" our "App" component can use features provided by the React framework
export default class App extends Component {

  constructor(props) {
    console.log("new App component will be initialized");
    super(props);

    this.handleCreateAsset = this.handleCreateAsset.bind(this);
    this.handleDeleteAsset = this.handleDeleteAsset.bind(this);


    this.state = {
      assets: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:8080/assets/')
      .then(response => {
        console.log(response.data);
        if (response.data.length === 0) {
          //we create an example asset, if the application is started for the first time and there are no assets in the database yet
          const exampleAsset = {
            _id: mongoose.Types.ObjectId().toString(),
            asset_name: "This is an example, press Edit to change name and Value",
            asset_value: "0"
          }
          this.saveAssetToDatabase(exampleAsset);
          response.data = [exampleAsset];
        }
        this.setState({
          assets: response.data.map(asset => <SimpleAsset key={asset._id} onDelete={this.handleDeleteAsset} asset={asset} />)
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
        <p>to create a new asset click this button:&nbsp;
        <button onClick={this.handleCreateAsset}>create asset</button>
        </p>
        <table>
          <tbody>
            <tr><th>description</th><th>value</th><th>action</th></tr>
            {this.state.assets}
          </tbody>
        </table>
      </div>
    );
  }

  handleCreateAsset() {
    console.log("handleCreateAsset invoked");


    const newAsset = {
      _id: mongoose.Types.ObjectId().toString(),
      asset_name: "",
      asset_value: ""
    }

    //now we have to add the new asset to the mongodb database
    this.saveAssetToDatabase(newAsset);

    // the react framework only rerenders the UI, when it detects that the state changed
    // when there is an object or an array in the state, the framework doesn't detect if a property or an element of that array changed
    // we have to copy the elements of our array in a new array, in order for react to know, that we want to rerender the UI
    let newAssets = this.state.assets.slice();

    //now that we have a new array, that will trigger rerendering, we can add the new asset to it
    newAssets.push(<SimpleAsset key={newAsset._id} onDelete={this.handleDeleteAsset} edit={true} asset={newAsset} />);

    //we cannot just change the state, in order for react to know that we changed state and want rerendering, we need to call
    //the ".setState()" method. The method takes all properties of the state we want to change as arguments.
    this.setState(
      {
        assets: newAssets
      }
    );
    console.log(newAsset);
  }

  saveAssetToDatabase(asset) {
    axios.post('http://localhost:8080/assets/add', asset)
      .then(res => console.log(res.data));

  }

  handleDeleteAsset(event) {
    const IdOfAssetToDelete = event.target.id;
    console.log("Delete asset with _id:" + IdOfAssetToDelete);

    //delete the asset in the mongodb database
    axios.get('http://localhost:8080/assets/delete/' + IdOfAssetToDelete)
      .then(res => console.log(res.data));

    //delete the asset in the UI and trigger UI update by calling ".setState()"
    let newAssets = this.state.assets.filter(asset => {
      console.log("asset.key:" + asset.key + " IdOfAssetToDelete:" + IdOfAssetToDelete + " " + (asset.key !== IdOfAssetToDelete));
      return asset.key !== IdOfAssetToDelete;
    })
    this.setState(
      {
        assets: newAssets
      }
    );
  }
}


