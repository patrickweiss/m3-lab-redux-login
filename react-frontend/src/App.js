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

    //The dynamic data that any component shows to the user has to be stored in a property called "state"
    //that belongs to the JavaScript Object that represents the "App" component
    //the next line will initalize the state with an empty array of assets

    this.state = {
      assets: []
    }
  }

  //before the App component will be rendered, the React framework calls the following method

  componentDidMount() {
    console.log("componentDidMount, assets will be loaded from the database");

    //The axios library will be used to ask the express server to deliver the data of the assets that are already in the database 
    //by sending a get request to the express rest api

    axios.get('http://localhost:8080/assets/').then(response => {

      //this code will be executed as soon as the browser receives the response from the express server
      //in order to see how the response.data was created open the file /express-mongo-backend/server.js
      //and look for the line: assetRoutes.route('/').get(function (req, res) {

      console.log(response.data);

      //if the application is started for the first time and there are no assets in the database yet, we will create one example asset 

      if (response.data.length === 0) {
        const exampleAsset = {
          _id: mongoose.Types.ObjectId().toString(),
          asset_name: "This is an example, press Edit to change name and Value",
          asset_value: "0"
        }
        //we add the new asset to the mongodb database
        this.saveAssetToDatabase(exampleAsset);
        //and we put in in response.data (although it was actually not in the response, but that is where we expect the data to be later...)
        response.data = [exampleAsset];
      }

      //in "response.data" we now either have an array with the example asset or all the assets that are in the database
      //we now need to change the state of this react component
      //when the state is changed, the component has to be rendered again
      //this is done by the react framework
      //the framework will invoke the "render" methode (that you will see later in this file) to create the new HTML that shows the new state
      //in order for the framework to know that the state has changed, we have to change the state by calling the method "setState()", not by just assigning it to "this.state"

      this.setState({
        //we will not just put the asset data in the state, but create React components that can render the data and put them in the state
        //to see how a "SimpleAsset" renders and works, look into the file /react-frontend/components/SimpleAsset.js
        assets: response.data.map(asset => <SimpleAsset key={asset._id} onDelete={this.handleDeleteAsset} asset={asset} />)
      });
    }).catch(function (error) { console.log(error); })
  }

  //every React component needs to have a render method
  //it creates the HTML to update the browser window when the component is shown for the first time and whenever the state is changed through "setState"
  render() {
    //the following code is no correct JavaScript
    //the code that looks like HTML will be transformed into JavaScript code that renders the HTML into the DOM 
    //that is one of the things that happens, when you test the react application by running "npm start"
    //it is done by a program called JSX-compiler
    //be carefull, the code looks like HTML but is actually not exactly the same as HTML, read the react documentation for the details
    return (
      <div>
        <h1>simple asset management application</h1>
        <p>to create a new asset click this button:&nbsp;
        { /*we can insert dynamic data into the static parts of the HTML, by writing JavaScript code within curly brackets */}
          <button onClick={this.handleCreateAsset}>create asset</button>
        </p>
        <table>
          <tbody>
            <tr><th>description</th><th>value</th><th>action</th></tr>
            {/*if the JavaScript code returns an array of React components, then the generated code will loop through the array and render all components in the array*/}
            {this.state.assets}
          </tbody>
        </table>
      </div>
    );
  }

  //the next method is called when the "create asset" button is clicked

  handleCreateAsset() {
    console.log("handleCreateAsset invoked");

    //we create a new empty asset with just an id to identify it

    const newAsset = {
      _id: mongoose.Types.ObjectId().toString(),
      asset_name: "",
      asset_value: ""
    }

    //now we have to add the new asset to the mongodb database
    this.saveAssetToDatabase(newAsset);

    // the react framework only rerenders the UI, when it detects that the state changed
    // when there is an object or an array in the state, the framework doesn't detect if a property of that object or an element of that array changed
    // we have to copy the elements of our array in a new array, in order for react to know, that we want to rerender the UI
    let newAssets = this.state.assets.slice();

    //now we can add the new asset to the new array
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

  //the next method is called when the "sell or dispose" button of any of the "SimpleAsset" components is clicked

  handleDeleteAsset(event) {
    const IdOfAssetToDelete = event.target.id;
    console.log("Delete asset with _id:" + IdOfAssetToDelete);

    //we delete the asset identified by the id in the event in the mongodb database, by calling the "delete" api of our express server 

    axios.get('http://localhost:8080/assets/delete/' + IdOfAssetToDelete)
      .then(res => console.log(res.data));

    //now we delete the asset in the UI and trigger an UI update by calling ".setState()"
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

  //the next method is just a helper to save a new asset in the database

  saveAssetToDatabase(asset) {
    axios.post('http://localhost:8080/assets/add', asset)
      .then(res => console.log(res.data));
  }

}


