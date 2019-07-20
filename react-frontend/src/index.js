// with the "import" Statement functionality that is not provided by the code in this file will be imported, so we can use it
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';


//the index.html file that was created by the react build process will load and run the JavaScript code in this file
//with react you can build "custom html elements", so kind of new html tags with looks and behaviour defined by the code you write
//these "new elements" are called React components
//looks and behaviour of the React component "App" is defined in the file "App.js"
//the following code will render "App" in the div element with the Id "root"
ReactDOM.render(<App />, document.getElementById('root'));

//in order to know what it will render open the file "App.js"