const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Asset = new Schema({
    asset_name: {
        type: String
    },
    asset_value: {
        type: String
    }
});

module.exports = mongoose.model('Asset', Asset);