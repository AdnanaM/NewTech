var CurrentProduct = require('./ProductModel');

exports.getProducts = function(req, res, next){
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
};

exports.createProduct = function(req, res, next){
    let p1 = req.body;
    console.log(req.body);
    var newItem = new CurrentProduct(p1);
    newItem.save().then(item=>{
        res.json({item:item})   
    }).catch(err=>{
        console.log("error :" + err)   
    });
};

exports.getProductById = function(req, res, next){
    let id = req.params.id;
    CurrentProduct.find({_id:id}).populate({
        path: "suppliers"
    })
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
};

exports.updateProductById = function(req, res, next){
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
};

exports.deleteProductById = function(req, res, next){
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
};

exports.getStatistics = function (req, res, next) {
    CurrentProduct.aggregate([
      {
        $group: {
          _id: null,
          avgPrice: { $avg: "$price" },
          minPrice: { $min: "$price" },
          maxPrice: { $max: "$price" },
        }
      }
    ]).then(function (data) {
        res.status(200).json({
          status: "success",
          data: data,
        });
    }).catch((err) => {
        res.status(400).json({
          status: "fail",
          messagge: err,
        });
    });
};