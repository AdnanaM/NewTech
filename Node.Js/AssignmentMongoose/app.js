var express = require("express");
var app = express();
app.use(express.json());
var CurrentPerson = require("./PersonModel");
var mongoose = require("mongoose");
const strConnect =
  "mongodb+srv://adnana:Ianuarie2020%25@cluster0.zacci.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const OPT = { useNewUrlParser: true };


// I. CRUD - Create
// // {"firstname": "Ioana","lastname": "Popa","city":"Ialomita","country": "Romania","salary": 3000}
// // {"firstname": "Sabina","lastname": "Traian","city": "Istanbul","country": "Turcia","salary": 4800}
// // {"firstname": "Mirabela","lastname": "Sima","city": "Berlin","country": "Germania","salary": 8500}
// // {"firstname": "Bogdan","lastname": "Popescu","city": "Florida","country": "SUA","salary": 6412}
// // {"firstname": "Ilona","lastname": "Antonescu","city": "Roma","country": "Italia","salary": 2456}
// {"firstname": "Ioan","lastname": "Tudor","city": "Florida","country": "SUA","salary": 4350}

app.post("/api/v1/persons", async function (req, res, next) {
  let person = req.body;
  let newPerson = new CurrentPerson(person);
  try {
    await newPerson.save();
    res.json({
      status: "success",
      people: newPerson,
    });
  } catch (e) {
    res.json({
      status: "failed",
      error: e,
    });
  };
});



//I. CRUD - Read all data
app.get("/api/v1/persons", function(req, res, next) {
  CurrentPerson.find({}).then(function(data){
    res.status(200).json({
      status: "success",
      data: data
    });
  }).catch(err => {
    res.status(404).json({
      status: "fail",
      messagge: err
    });
  });
});



//I. CRUD- Read a certain person using ID (_id: 61f7d3f1ba1120dde6c3a5da)
app.get("/api/v1/persons/:id", function (req, res, next){
  let id = req.params.id;
  CurrentPerson.find({_id:id}).then(function(data){
    res.status(200).json({
      status: "success",
      data: data
    });
  }).catch(err => {
    res.status(404).json({
      status: "fail",
      messagge: err
    });
  });
});



//I. CRUD - Update salary of a person using ID. (_id: 61f7d3f1ba1120dde6c3a5da - old salary: 8500, new salary: 8800) 

app.patch('/api/v1/persons/:id', function (req, res, next){
  let id = req.params.id;
  CurrentPerson.findByIdAndUpdate(id, req.body, {new:true,runValidators:true}).then(function(data){
    res.status(200).json({
      status: "success",
      data: data
    });
  }).catch(err => {
    res.status(404).json({
      status: "fail",
      messagge: err
    });
  });
});



//I. CRUD - Delete a person using ID. (_id: 61f7d357ba1120dde6c3a5d6)

app.delete('/api/v1/persons/:id', function(req, res, next){
  let id = req.params.id;
  CurrentPerson.findByIdAndDelete(id).then(function(data){
    res.status(200).json({
      status: "success",
      data: null
    });
  }).catch(err => {
    res.status(404).json({
      status: "fail",
      messagge: err
    });
  });
});



//II. Advanced reading & filtering 
//1a) Retrieve only the persons that have salary equal to 2456.
//1b) Retrieve only the persons that are from the same city (Florida).
//1c) Retrieve only the persons that have the salary grater than 4350.
//1d) Retrieve only the persons that have the salary grater than 2000  but less than 3000.

app.get("/api/v1/retrieve", function(req, res, next) {
  let queryObj = {...req.query};
  let withOutFileds = ['page', 'sort', 'limit', 'fields']
  withOutFileds.forEach(el=> {
    delete queryObj[el]   
  });
  let strQuery = JSON.stringify(queryObj);
  strQuery = strQuery.replace(/\b(gte|gt|lte|lt)\b/g,match=>`$${match}`);
  queryObj = JSON.parse(strQuery);


  CurrentPerson.find(queryObj).then(function(data){
    res.status(200).json({
      status: "success",
      data: data
    });
  }).catch(err => {
    res.status(404).json({
      status: "fail",
      messagge: err
    });
  });
});



//1e) Sort ascending for the salary field.

app.get("/api/v1/ascending", function(req, res, next) {
  let queryObj = {...req.query};
  let withOutFileds = ['page', 'sort', 'limit', 'fields']
  withOutFileds.forEach(el=> {
    delete queryObj[el]   
  });
  let strQuery = JSON.stringify(queryObj);
  strQuery = strQuery.replace(/\b(gte|gt|lte|lt)\b/g,match=>`$${match}`);
  queryObj = JSON.parse(strQuery);

  let sort="";
  if(req.query.sort){
    sort = req.query.sort.split(',').join(' ')
  };

  CurrentPerson.find(queryObj).sort([[sort, 1]]).then(function(data){
    res.status(200).json({
      status: "success",
      data: data
    });
  }).catch(err => {
    res.status(404).json({
      status: "fail",
      messagge: err
    });
  });
});



//1e) Sort descending for the salary field.

app.get("/api/v1/descending", function(req, res, next) {
  let queryObj = {...req.query};
  let withOutFileds = ['page', 'sort', 'limit', 'fields']
  withOutFileds.forEach(el=> {
    delete queryObj[el]   
  });
  let strQuery = JSON.stringify(queryObj);
  strQuery = strQuery.replace(/\b(gte|gt|lte|lt)\b/g,match=>`$${match}`);
  queryObj = JSON.parse(strQuery);

  let sort="";
  if(req.query.sort){
    sort = req.query.sort.split(',').join(' ')
  };

  CurrentPerson.find(queryObj).sort([[sort, -1]]).then(function(data){
    res.status(200).json({
      status: "success",
      data: data
    });
  }).catch(err => {
    res.status(404).json({
      status: "fail",
      messagge: err
    });
  });
});



//2. Add a function to show the minimum salary, the average salary and the maximum salary of the persons added to the collection.

app.get("/api/v1/report", function (req, res, next){
  CurrentPerson.aggregate([
    {
      $group: {
        _id: null,
        minSalary: {$min: "$salary"},
        maxSalary: {$max: "$salary"},
        avgSalary: {$avg: "$salary"}
      }
    }
  ]).then(function(data){
    res.status(200).json({
      status: "success",
      data: data
    })
  }).catch(err => {
    res.status(404).json({
      status: "fail",
      messagge: err
    });
  });
});

mongoose.connect(strConnect, OPT, function () {
    console.log("connected");
});
  
var port = 3000;
app.listen(port, function () {
  console.log("Running on port " + port);
});
  