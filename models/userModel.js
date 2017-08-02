//const data = require('../data')
const MongoDB = require('mongodb');
const MongoClient = MongoDB.MongoClient;
const url = "mongodb://localhost:27017/robots";

let conn = null;

MongoClient.connect(url, function (error, db) {
    if (error) {
        console.log("Something went wrong can't connect to DB", err)
    } else {
        console.log("Connected to DB")
        conn = db;
    }
})

function getAllUsers(cb) {
    conn.collection("users").find().toArray(function (error, data) {
        if (error) {
            console.log("Error fechting users", error);
        }
        else {
            cb(data)
        }
    })
}

function getUserByUsername(username, cb) {
    let query = { username: username }
    conn.collection("users").find(query).toArray(function (error, data) {
        if (error) {
            console.log("Error fetching user", err)
        }
        else {
            cb(data)
        }
    })
}

function getUsersByCountry(country, cb) {
    let query = { "address.country": country }
    conn.collection("users").find(query).toArray(function (error, data) {
        if (error) {
            console.log("Error fetching users by country", error)
        }
        else {
            cb(data)
        }
    })
}
function getUsersBySkill(skill, cb) {
    let query = { skills: skill }
    conn.collection("users").find(query).toArray(function (error, data) {
        if (error) {
            console.log("Error fetching users by skill", error)
        }
        else {
            cb(data)
        }
    })
}

function getUsers(employed, cb) {
    let query = employed ? { company: { $not: { $type: 10 } } } : {company:null}
    conn.collection("users").find(query).toArray(function (error, data) {
        if (error) {
            console.log("Error fechting users", error);
        }
        else {
            cb(data)
        }
    })
}

module.exports = {
    getAllUsers: getAllUsers,
    getUserByUsername: getUserByUsername,
    getUsersByCountry: getUsersByCountry,
    getUsersBySkill:getUsersBySkill,
    getUsers:getUsers
}