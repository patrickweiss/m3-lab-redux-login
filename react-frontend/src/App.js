import React, { Component } from 'react';
import SimpleAsset from './components/SimpleAsset.js'

export default class App extends Component {


  constructor(props) {
    console.log("new App component will be created");
    super(props);


    this.handleCreateAsset = this.handleCreateAsset.bind(this);
    this.handleDeleteAsset = this.handleDeleteAsset.bind(this);

    this.state = {
      assets: [
        <SimpleAsset key="exampleKey" onDelete={this.handleDeleteAsset} id="exampleKey" name="This is an example asset. Press edit to change" value="500" />,
      ]
    }

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
    // the react framework only rerenders the UI, when it detects that the state changed
    // when there is an object or an array in the state, the framework doesn't detect if a property or an element of that array changed
    // we have to copy the elements of our array in a new array, in order for react to know, that we want to rerender the UI
    let newAssets = this.state.assets.slice();

    //know that we have a new array, that will trigger rerendering, we can add the new asset to it
    newAssets.push(<SimpleAsset key="3" id ="3" edit={true} onDelete={this.handleDeleteAsset} name="House" value="50000" />);

    //we cannot just change the state, in order for react to know that we changed state and want rerendering, we need to call
    //the ".setState()" method. The method takes all properties of the state we want to change as arguments.
    this.setState(
      {
        assets: newAssets
      }
    );
  }

  handleDeleteAsset(event) {
    console.log("handleDeleteAsset invoked");
    const IDofAssetToDelete = event.target.id;
    let newAssets = this.state.assets.filter(asset => asset.key !== IDofAssetToDelete)

    this.setState(
      {
        assets: newAssets
      }
    );
  }
}


