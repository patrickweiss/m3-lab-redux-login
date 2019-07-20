# mern-asset-management
mern-asset-management simplest possible MERN application

This application is a simplistic approach to show how the different building blocks of the MERN-Stack (MongoDB, express, React, node.js) work together

to run the application you need to install
-node.js
-mongodb

the installation and configuration of the runtime environment is not in the scope of this documentation

the focus of the documentation is on how the node.js server runtime, the express webserver, the react browser frontend and the MongoDB database work together to build a simple application
that supports CRUD features:
C:Create some data with the client part of the application and store it in the MongoDB database
R:Read the data from the database and show it in the browser
U:Update (change) the data and store it again in the database
D:Delete some data from the database

to run the application first you need to start the mongo db database
-open a terminal and run: mongod

to run the express webserver with the rest api to connect the browser client to the database start express
-open a new terminal and go into the directory /mern-asset-management/express-mongo-backend
-within this directory run: nodemon server

to run the webserver to server the react client
-open a new terminal and go into the directory /mern-asset-management/react-frontend
-within this directroy run: npm start

now a browser window should open automatically and show the application in the browser
if it doesn't work automatically then open a browser and enter the URL: localhost:3000

you should see the title of the application:
"simple asset management application"
and one example asset should already be created, shown and stored in the database

now 
