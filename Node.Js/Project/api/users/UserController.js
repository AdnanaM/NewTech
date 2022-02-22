var CurrentUser = require('./UserModel')
exports.createUser = async function(req, res, next) {
    try{
        let p1= req.body;
        var newItem = await CurrentUser.create(p1);
        res.status(201).json({
            status:"success",
            data:newItem
        })
    }
    catch(err){
        res.status(400).json({
            status:"fail",
            message:"error:😱" + err
        })
    }
};
//read by id 
exports.getUserById =  function(req, res, next){
    let id = req.params.id 
    CurrentUser.find({_id:id}).then(function(data){
        res.status(200).json({
            status:"success",
            data:data
        })
    }).catch(err=>{
        res.status(404).json({
            status:"fail",
            message:"error:😱" + err
        })
    })
};

//update 
exports.updateUserById= function(req, res, next){
    let id = req.params.id 
    CurrentUser.findByIdAndUpdate(id, req.body, {new:true,runValidators:true})
    .then(function(data){
        res.status(200).json({
            status:"success",
            data:data
        })
    }).catch(err=>{
        res.status(404).json({
            status:"fail",
            message:"error:😱" + err
        })
    })
}
//delete 
exports.deleteUserById = function(req, res, next){
    let id = req.params.id 
    CurrentUser.findByIdAndDelete(id)
    .then(function(data){
        res.status(404).json({
            status:"success",
            data:null
        })
    }).catch(err=>{
        res.status(404).json({
            status:"fail",
            message:"error:😱" + err
        })
    })
}
//get
exports.getUsers = async function(req, res, next){
    //phase 1 - filtering 
    let queryObj = {...req.query}
    let withOutFileds = ['page', 'sort', 'limit', 'fields']
    withOutFileds.forEach(el => {
        delete queryObj[el]
    });
    //phase 2 - advance filtering 
    let strQuery = JSON.stringify(queryObj)
    strQuery = strQuery.replace(/\b(gte|gt|lte|lt)\b/g,match =>`$${match}`)
    queryObj = JSON.parse(strQuery)
    console.log(queryObj)
    let sort="";
    let selected = "";
    if(req.query.sort){
        sort = req.query.sort.split(',').join(' ')// add more sorts 
    }
    if(req.query.fields){
        selected = req.query.fields.split(',').join(' ')// show fields 
    }

    let limit = req.query.limit || 100
    let page = req.query.page || 1
    let skip = (page-1)*limit
    let documents = await CurrentUser.countDocuments()
    if(skip>=documents){
        res.status(404).json({
            status:"fail",
            data:"no data on this page and limit"
        })
        return
    }
    CurrentUser.find(queryObj).skip(skip).limit(limit).select(selected).sort(sort).then(function(data)
    {
        res.status(200).json({
            status:"success",
            data:data
        })
    }).catch(err=>{
        res.status(404).json({
            status:"fail",
            message:"error:😱 :" + err
        })
    })
}
