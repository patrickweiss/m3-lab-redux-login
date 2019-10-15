const express = require('express');
const assetRoutes = express.Router();


let Asset = require('../models/asset.model');

//now we define the rest endpoints for the CRUD methods and implement the CRUD methods
//R: read all assets

assetRoutes.route('/read').get(function (req, res) {
    console.log("got a request");
    Asset.find(function (err, assets) {
        if (err) {
            console.log(err);
        } else {
            res.json(assets);
        }
    });
});

//C: creat a new asset

assetRoutes.route('/add').post(function (req, res) {
    console.log("Request to save this asset:" + JSON.stringify(req.body));
    let asset = new Asset(req.body);
    asset.save()
        .then(asset => {
            res.status(200).json({ 'asset': 'asset added successfully' });
        })
        .catch(err => {
            res.status(400).send('adding new asset failed');
        });
});

//R: read one asset defined be the id of the asset

assetRoutes.route('/:id').get(function (req, res) {
    let id = req.params.id;
    Asset.findById(id, function (err, asset) {
        res.json(asset);
    });
});

//U: update the asset with the given id

assetRoutes.route('/update/:id').post(function (req, res) {
    Asset.findById(req.params.id, function (err, asset) {
        if (!asset) res.status(404).send("Asset to update not found, asset _id:" + req.params.id);
        else {
            asset.asset_id = req.body.asset_id;
            asset.asset_name = req.body.asset_name;
            asset.asset_value = req.body.asset_value;

            asset.save().then(asset => {
                res.json('asset updated!');
            })
                .catch(err => {
                    res.status(400).send("Update not possible");
                });
        }
    });
});

//D: delete the asset with the given id

assetRoutes.route('/delete/:id').get(function (req, res) {
    Asset.deleteOne({ "_id": req.params.id }, function (err, asset) {
        if (!asset)
            res.status(404).send("data is not found");
        else
            res.json('asset deleted!');
    });
});

module.exports = assetRoutes;