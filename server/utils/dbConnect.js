import mongoose from "mongoose";

export const dbConnect = async()=>{

    try {
        
        await mongoose.connect('mongodb://localhost:27017/Leads')
        console.log("Successfully Connected to MongoDb!!")

    } catch (error) {
        console.log('Unable to COnnect to DB')
    }

}