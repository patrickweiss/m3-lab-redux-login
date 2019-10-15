const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create an object to create, read, update and delete asset data in the MongoDB

let Asset = new Schema({
    //we do not need to define the _id to identify the asset, mongoose does this automatically
    asset_name: {
        type: String
    },
    asset_value: {
        type: String
    }
});

module.exports = mongoose.model('Asset', Asset);