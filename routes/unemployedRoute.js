const express = require('express')
const router = express.Router()
const MongoDB = require('mongodb');
const MongoClient = MongoDB.MongoClient;
const url = "mongodb://localhost:27017/robots";

let dbConn = null;
MongoClient.connect(url, function (error, db) {
    if (error) {
        console.log(error);
    }
    else {
        console.log("connected to db UNEMPLOYED");
        dbConn = db;
    }
})

router.get("/", function (req, res, next) {
    let query = {company:null}
    dbConn.collection("users").find(query).toArray(function (error, users) {
        if (error) {
            console.log("Error fechting users", error);
        }
        else {
            var data = {
                users: users
            }
            res.render('index', data)
        }
    })
})

module.exports = router;
