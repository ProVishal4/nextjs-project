import mongoose from "mongoose";

let isConnected = false;

export async function connectDB() {
    if (isConnected) return;
    //process.env.MONGODB_URI
    const atlas = process.env.ATLAS_URL
    try {
        const conn = await mongoose.connect(atlas, {
            dbName: "cgblogdatabase"
        });

        isConnected = conn.connections[0].readyState;
        console.log("MongoDB Connected");
    } catch (error) {
        console.error(error);
    }
}
// import mongoose from "mongoose";

// let isConnected = false;

// export async function connectDB() {
//     if (isConnected) return;
//     //process.env.MONGODB_URI
//     const atlas = process.env.ATLAS_URL
//     try {
//         const conn = await mongoose.connect(atlas, {
//             dbName: "cgblogdatabase"
//         });

//         isConnected = conn.connections[0].readyState;
//         console.log("MongoDB Connected");
//     } catch (error) {
//         console.error(error);
//     }
// }