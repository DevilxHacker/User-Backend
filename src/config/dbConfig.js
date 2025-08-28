import mongoose from "mongoose";
import { DB_URL } from "./serverConfig.js";

export default async function connectDB(){
    try{
         await mongoose.connect(DB_URL);
         console.log("Database connected successfully");
    }catch(error){
        console.error("Something went wrong while connecting to DB", error)
    }

}