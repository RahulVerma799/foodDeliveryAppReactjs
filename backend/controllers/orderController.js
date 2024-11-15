import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
//import stripe from 'stripe';

export const placeOrder=async(req,res)=>{

    const frontend_url="https://fooddeliveryappreactjs-1.onrender.com"

    try{

        const newOrder=new orderModel({
            userId:req.body.userId,
            items:req.body.items,
            amount:req.body.amount,
            address:req.body.address
        })

        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}})

        // const line_items=req.body.items.map((item)=>({
        //     price_data:{
        //         currency:"inr",
        //         product_data:{
        //             name:item.name
        //         },
        //         unit_amount:item.price
        //     },
        //     quantity:item.quantity
        // }))

        // line_items.push({
        //     price_data:{
        //         currency:"inr",
        //         product_data:{
        //             name:"Delivery Charges"
        //         },
        //         unit_amount:2
        //     },
        //     quantity:1
        // })

        // const session = await stripe.checkout.sessions.create({
        //     line_items:line_items,
        //     mode:"payment",
        //     success_url:`${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
        //     cancel_url:`${frontend_url}/verify?success=false&orderId=${newOrder._id}`
        // })

        res.json({
            success: true,
            message: "Order placed successfully!",
            orderId: newOrder._id,
        })
    }
    catch(error){
        console.log(error),
        res.json({
            success:false,
            message:"error in ordercontrolerr.js"
        })
    }

}

export const userOrder=async(req,res)=>{
    try{
        const orders =await orderModel.find({userId:req.body.userId})
        res.json({
            success:true,
            data:orders,
        })
    }
    catch(error){
        console.log(error)
        res.json({
            success:false,
            message:" Error in userOrder section"
        })
    }
      
}

export const listOrders=async(req,res)=>{
    try{

        const orders= await orderModel.find({});
        res.json({success:true,data:orders})
    }catch(error){
        console.log(error)
        res.json({
            success:false,message:"error in listOrder sections"
        })
    }
}

