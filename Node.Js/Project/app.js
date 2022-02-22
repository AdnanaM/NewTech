var express = require("express");
var app = express();
app.use(express.json());
var mongoose = require("mongoose");

var productRouter = require('./api/products/ProductRouter');
var userRouter = require('./api/users/UserRouter');
var commentRouter = require("./api/comments/CommentRouter");

app.use('/api/v1/products', productRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/comments', commentRouter);


const strConnect =
  "mongodb+srv://adnana:altaparola123@cluster0.zacci.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const OPT = { useNewUrlParser: true };

mongoose.connect(strConnect, OPT, function () {
  console.log("connected");
});

var port = 3000;
app.listen(port, function () {
console.log("Running on port " + port);
});