import mongoose from 'mongoose';

const orderSchema=new mongoose.Schema({
    userId:{
        type:String,
        required:true,
    },

    // items:{
    //     type:String,
    //     required:true,
    // },

    items: [{
        _id: String,
        name: String,
        description: String,
        price: Number,
        image: String,
        category: String,
        quantity: Number,
    }],

    amount:{
        type:Number,
        required:true,
    },

    address:{
        type:Object,
        required:true,

    },

    status:{
        type:String,
        default:"Food processing",
    },
    date:{
        type:Date,
        default:Date.now()
    },

    payment:{
        type:Boolean,
        default:false,
    }

})

export default mongoose.model("order",orderSchema);