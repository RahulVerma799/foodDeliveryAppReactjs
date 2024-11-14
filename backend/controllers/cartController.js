import userModel from "../models/userModel.js";


//add items to user 
export const addTocart=async(req,res)=>{
    
    try{
        let userData=await userModel.findOne({_id:req.body.userId});
        console.log("userData:", userData);
        
        let cartData= await userData.cartData ;
        if(!cartData[req.body.itemId]){
            cartData[req.body.itemId]=1;
        } 
        else{
            cartData[req.body.itemId] +=1;
        }

        await userModel.findByIdAndUpdate(req.body.userId,{cartData});

        res.json({success:true,message:"Added to cart"})
    }
    catch(error){
        console.log(error);
        res.json({success:false,message:"Error in Added to cart"})
    }

}

//remove cart
export const removeFromCart=async(req,res)=>{
    try{
        let userData= await userModel.findById(req.body.userId);
        let cartData= await userData.cartData;
        
        if(cartData[req.body.itemId]>0){
            cartData[req.body.itemId]-= 1;
        }
            await userModel.findByIdAndUpdate(req.body.userId,{cartData});
            return res.json({
                success:true,
                message:"Removed from cart"
            })


    }
    catch(error){
        return res.json({
            success:false,
            message:"removed api cart error"
        })

    }

}

//fetch user cart
export const getCart=async(req,res)=>{

        try{
                let userData=await userModel.findById(req.body.userId);
                let cartData=await userData.cartData;

                return res.json({
                    success:true,
                    cartData
                })
        }
        catch(error){
            console.log(error)
            res.json({
                success:false,
                message:"Error"
            })

        }
}



