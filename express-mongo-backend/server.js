const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const assetRoutes = express.Router();
const PORT = 8080;

let Asset = require('./asset.model');

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/assets', { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

assetRoutes.route('/').get(function(req, res) {
    console.log("got a request");
    Asset.find(function(err, assets) {
        if (err) {
            console.log(err);
        } else {
            res.json(assets);
        }
    });
});

assetRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    Asset.findById(id, function(err, asset) {
        res.json(asset);
    });
});

assetRoutes.route('/update/:id').post(function(req, res) {
    Asset.findById(req.params.id, function(err, asset) {
        if (!asset)
            res.status(404).send("data is not found");
        else
            asset.asset_id = req.body.asset_id;
            asset.asset_name = req.body.asset_name;
            asset.asset_value = req.body.asset_value;
    
            asset.save().then(asset => {
                res.json('asset updated!');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});

assetRoutes.route('/delete/:id').get(function(req, res) {
    Asset.deleteOne({ "_id" : req.params.id}, function(err, asset) {
        if (!asset)
            res.status(404).send("data is not found");
        else
            res.json('asset deleted!');      
    });
});

assetRoutes.route('/add').post(function(req, res) {
    console.log("Reqest to save this asset:"+JSON.stringify(req.body));
    let asset = new Asset(req.body);
    asset.save()
        .then(asset => {
            res.status(200).json({'asset': 'asset added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new asset failed');
        });
});

app.use('/assets', assetRoutes);

app.listen(PORT, function() {
    console.log("Server should be running on Port: " + PORT);
});