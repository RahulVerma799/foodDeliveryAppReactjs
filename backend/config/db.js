import mongoose from 'mongoose';

export const connectDb = async () => {
  try {
    await mongoose.connect('mongodb+srv://rahulverma:rahul@cluster0.fpxfh.mongodb.net/FoodApplication', {
     
    });
    console.log("DB connected successfully");
  } catch (error) {
    console.error("Error connecting to the database: ", error.message);
  }
};
