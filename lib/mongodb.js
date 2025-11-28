import mongoose from "mongoose";

let isConnected = false;

export async function connectDB() {
    if (isConnected) return;
//process.env.MONGODB_URI
    try {
        const conn = await mongoose.connect("mongodb://127.0.0.1:27017/exdatabase", {
            dbName: "exdatabase"
        });

        isConnected = conn.connections[0].readyState;
        console.log("MongoDB Connected");
    } catch (error) {
        console.error(error);
    }
}