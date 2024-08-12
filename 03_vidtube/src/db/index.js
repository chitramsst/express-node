import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";

const ConnectDB = async() => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`\n Mongo connected! DB host : ${connectionInstance.connection.host}`)
    } catch (e) {
        console.log('MongoDB connection error',error)
        process.exit(1)
    }
}





export default ConnectDB;