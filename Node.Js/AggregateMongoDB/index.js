var express = require("express");
var app = express();
app.use(express.json());
var CurrentPeople = require("./Model");
var mongoose = require("mongoose");
const strConnect =
  "mongodb+srv://adnana:Ianuarie2020%25@cluster0.zacci.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const OPT = { useNewUrlParser: true };

app.post("/api/v1/people", async function (req, res, next) {
  let p1 = req.body;
  console.log(p1);
  let newPeople = new CurrentPeople(p1);
  try {
    await newPeople.save();
    res.json({
      people: newPeople,
    });
    
  } catch (e) {
    res.json({
      status: "failed",
      error: e,
    });
  }
});

app.get("/api/v1/people/statistics", function (req, res, next) {
  CurrentPeople.aggregate([
    {
      $group: {
        _id: null,
        avgSalary: { $avg: "$salary" },
        minSalary: { $min: "$salary" },
        maxSalary: { $max: "$salary" },
      },
    },
    {
      $sort: {
        minSalary: 1,
        maxSalary: 1,
      },
    },
  ])
    .then(function (data) {
      console.log(data);
      res.status(200).json({
        status: "success",
        data: data,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({
        status: "fail",
        messagge: err,
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
