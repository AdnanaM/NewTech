var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var CommentSchema = new Schema({
    title: {
        type:String,
        require:[true,'A comment must have title' ],   
    },
    description:{
        type:String,
        minlength:[5,'Description is minimum 20 characters'],
        maxlength:[1000,'Description is maximum 1000 characters']   
    },
    rating:{
        type:Number,
        required:[true, 'A comment must have rating'],
        min:1,
        max:5   
    },
    product:{
        type:mongoose.Schema.ObjectId,
        ref:'products',
        required:[true, 'Product must belong to a comment']   
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'users',
        required:[true, 'Product must belong to a user']   
    },
    created:Date
});

CommentSchema.pre(/^find/, async function(next){
    this.populate({
        path:'product',
        select:'title -suppliers'   
    }).populate({
        path:'user',
        select:'firstname lastname -_id'   
    })
    next();
})

module.exports = mongoose.model('comments', CommentSchema);