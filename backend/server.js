import express from 'express'
import cors from 'cors'
import { connectDb } from './config/db.js';
import foodRouter from './routes/foodRoute.js';
import bodyParser from 'body-parser';
import userRouter from './routes/userRoutes.js';
import dotenv from 'dotenv';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';


dotenv.config();
const app=express()
const port= process.env.PORT || 4000;

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors())


connectDb();


//api sextion
app.use("/api/food",foodRouter)
app.use("/images",express.static('uploads'))
app.use("/api/user",userRouter); 
app.use("/api/cart",cartRouter);
app.use("/api/order",orderRouter);


app.get('/',(req,res)=>{
    res.send('working app')
})

app.listen(port,()=>{
    console.log(`server start : ${port}`)
})

//mongodb+srv://rahulverma:rahul@cluster0.fpxfh.mongodb.net/?


//mongodb+srv://rahulverma:rahul@cluster0.fpxfh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0