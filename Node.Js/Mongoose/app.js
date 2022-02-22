var express = require('express');
var app = express();
app.use(express.json());
var CurrentProduct = require('./ProductModel');
var mongoose = require('mongoose');
const strConnect ="mongodb+srv://adnana:Ianuarie2020%25@cluster0.zacci.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const OPT = {useNewUrlParser:true};

let newDate = new Date();
console.log(newDate);

//Creare produs nou 
app.post('/api/v1/products', function(req, res, next) {
    let p1 = req.body;
    console.log(req.body);
    var newItem = new CurrentProduct(p1);
    newItem.save().then(item=>{
        res.json({item:item})   
    }).catch(err=>{
        console.log("error :" + err)   
    });
});


//Citeste toate produsele
app.get('/api/v1/products', function(req, res, next){
    CurrentProduct.find({}).then(function(data){
        res.status(200).json ({
            status:"success",
            data:data       
        })   
    }).catch(err=>{
        res.status(404).json({
            status:"fail",
            message:"error:" + err       
        });   
    });
});


//Cauta un produs dupa ID
app.get('/api/v1/products/:id', function(req, res, next){
    let id = req.params.id;
    CurrentProduct.find({_id:id}).then(function(data){
        res.status(200).json({
            status:"success",
            data:data       
        })   
    }).catch(err=>{
        res.status(404).json({
            status:"fail",
            message:"error:" + err       
        });   
    });
});


//Update a product
app.patch('/api/v1/products/:id', function(req, res, next){
    let id = req.params.id;
    CurrentProduct.findByIdAndUpdate(id, req.body, {new:true,runValidators:true})   
    .then(function(data){
        res.status(200).json({
            status:"success",
            data:data       
        })   
    }).catch(err=>{
        res.status(404).json({
            status:"fail",
            message:"error:" + err       
        });   
    });
});


//Delete a product
app.delete('/api/v1/products/:id', function(req, res, next){
    let id = req.params.id;
    CurrentProduct.findByIdAndDelete(id)
    .then(function(data){
        res.status(200).json({
            status:"success",
            data: null       
        })   
    }).catch(err=>{
        res.status(404).json({
            status:"fail",
            message:"error:" + err       
        });   
    });
});



app.get('/api/v1/products', function(req, res, next){
    console.log("helllo")
    let queryObj = {...req.query}
    console.log(queryObj)
    let withOutFileds = ['page', 'sort', 'limit', 'fields']
    withOutFileds.forEach(el=> {
        delete queryObj[el]   
    });
    console.log(queryObj)
    CurrentProduct.find(queryObj).then(function(data){
        res.status(200).json({
            status:"success",
            data:data       
        })   
    }).catch(err=>{
        res.status(404).json({
            status:"fail",
            message:"error: :" + err       
        })   
    }) 
})


mongoose.connect(strConnect, OPT, function () {
    console.log('connected')
});


var port = 3000;
app.listen(port, function() {
    console.log("Running on port " + port);
});