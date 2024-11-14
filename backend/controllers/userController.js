import userSchema from '../models/userModel.js';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt';
import validator from 'validator';
import userModel from '../models/userModel.js';

export const loginUser=async(req,res)=>{
    const {email,password}=req.body;
    try{
       const user= await userModel.findOne({email});
       if(!user){
             res.json({
                success:false,
                message:"user is registerd"
             })
       }
       const isMatch= await bcrypt.compare(password,user.password)

       if(!isMatch){
        return res.json({
            success:false,
            message:"invalid credential"
        })
       }

       const token=createToken(user._id);
       return res.json({
        success:true,
        token,
        message:"login successfully"

       })



    }
    catch(error){
        console.log(error); 
        return res.json({
            success:false,
            message:"login problm"
        })
    }

}

export const createToken=(id)=>{
    return jwt.sign({id},process.env.JWT_TOKEN)
}

export const registerUser=async(req,res)=>{
    
    const {name,password,email}=req.body;
    try{
          
           const exists=await userModel.findOne({email});
           if(exists){
            return res.json({
                success:false,
                message:"User is already exits",
            })
        }
        //checking vaidation
        if(!validator.isEmail(email)){
                return res.json({
                    success:false,
                    message:"user Already exist",    
                })
            }
        if(password.length<5){
            return res.json({
                success:false,
                message:"user password length is 5"
            })
        }

        //hasing passowrd
        const hashedPassword=await bcrypt.hash(password,10);


        //database
        const newUser=new userModel({
            name:name,
            email:email,
            password:hashedPassword,
        })

        const user= await newUser.save();
        const token=createToken(user._id);
        res.json({success:true,token })
           
           
    }catch(error){
        console.log(error);
        res.json({success:false, message:"not getting register"})
    }
}