var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var PeopleSchema = new Schema({
  firstname: {
    type: String,
    require: [true, "Person must have a firstname"],
    unique: true,
    trim: true,
  },
  lastname: {
    type: String,
    require: [true, "Person must have a lastname"],
    unique: true,
    trim: true,
  },
  city: {
    type: String,
  },
  country: {
    type: String,
  },
  salary: {
    type: Number,
    required: [true, "must have a salary"],
    min: [0, "salary must be above 0"],
  },
});

module.exports = mongoose.model("peopleAssignment", PeopleSchema);