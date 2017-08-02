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
        console.log("connected to db USERS");
        dbConn = db;
    }
})

router.get("/", function (req, res, next) {
 let query = {}
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

//user
router.get("/user/:username", function (req, res, next) {
    let query = {username: req.params.username}
    dbConn.collection("users").find(query).toArray(function(error, user){
        if(error){
            console.log("Error fetching user", error)
        }
        else{
            var user = user[0]
            res.render("user", user)
        }
    })
})

router.get("/country/:country", function(req,res, next){
    let query = {"address.country": req.params.country}
    dbConn.collection("users").find(query).toArray(function(error, users){
        if(error){
            console.log("Error fetching user by country", error)
        }
        else{
            var data = { users: users, country:req.params.country}
            res.render('index', data)
        }
    })
})

router.get("/skills/:skills", function(req, res, next){
    let query = {skills: req.params.skills}
        dbConn.collection("users").find(query).toArray(function(error, users){
        if(error){
            console.log("Error fetching user by skill", error)
        }
        else{
            var data = { users: users, skill: req.params.skills}
            res.render('index', data)
        }
    })
})

module.exports = router;
