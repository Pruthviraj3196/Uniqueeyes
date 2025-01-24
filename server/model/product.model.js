const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    productName:{
        type: String,
        required: true,
    },
    type: {
        type:String,
        require:true,
    },
    subtype: {
        type:String,
        require:true,
    },
    price:{
        type:Number,
        require:true,
    },
    description: {
        type:String,
        require: true,
    },
    imageid: {
        type:String,
        unique: true,
    },
})

module.exports = mongoose.model('Product', ProductSchema);
