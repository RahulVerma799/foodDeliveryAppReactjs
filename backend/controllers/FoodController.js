import foodModel from "../models/foodModel.js";
import fs from 'fs';

//addfood
export const addfood=async(req,res)=>{
    try{
        let image_filename=`${req.file.filename}`;

        const {name,description,price,category}=req.body;

        const newFood=await foodModel.create({name,description,price,category,image:image_filename})

        return res.json({
            success:true,
            data:newFood,
            message:"food added successfully"
        })

    }catch(error){  
        console.log(error)
        res.json({
            success:false,
            message:"error"
        })
        
    }
}

//list of food
export const listfood=async(req,res)=>{
    try{
        const foods=await foodModel.find({});
        res.json({
            success:true,
            data:foods
        })
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"error"
        })
    }

}

export const removefood=async(req,res)=>{
    try{
        console.log(req.body);
        const food=await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`,()=>{})

        await foodModel.findByIdAndDelete(req.body.id)

        return res.status(400).json({
            success:true,
            message:'food Removed'
        })

    }
    catch(error){
        console.log(error)
            return res.status(500).json({
                success:false,
                message:"failed to remove"
            })
        }
}
