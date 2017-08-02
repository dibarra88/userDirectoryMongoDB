const express = require('express')
const router = express.Router()
const userModel = require('../models/userModel')

router.get("/", function (req, res, next) {
    userModel.getAllUsers(function (data) {
        res.render("index", { users: data })
    })
})
router.get("/user/:username", function (req, res, next) {
    userModel.getUserByUsername(req.params.username, function(data) {
        res.render("user", data[0])
    })
})
router.get("/country/:country", function(req,res, next){
    userModel.getUsersByCountry(req.params.country, function(data){
        res.render("index", {users:data})
    })
})
router.get("/skills/:skills", function(req, res, next){
    userModel.getUsersBySkill(req.params.skills, function(data){
        res.render("index", {users:data})
    })
})
router.get("/employed", function(req,res,next){
    userModel.getUsers(true, function(data){
        res.render("index", {users:data})
    })
})
router.get("/unemployed", function(req,res,next){
    userModel.getUsers(false,function(data){
        res.render("index",{users:data})
    })
})
module.exports = router;
