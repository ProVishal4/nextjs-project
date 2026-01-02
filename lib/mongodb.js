import mongoose from "mongoose";

let isConnected = false;

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


// export async function connectDB() {
//     if (isConnected) return;
//     const offlineUrl = process.env.MONGODB_URI
//     // const atlas = process.env.ATLAS_URL
//     //"mongodb://127.0.0.1:27017/exdatabase"
//     try {
//         const conn = await mongoose.connect(offlineUrl);

//         isConnected = conn.connections[0].readyState;
//         console.log("MongoDB Connected");
//     } catch (error) {
//         console.error(error);
//     }
// }







let cached = global.mongoose;
if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

export async function connectDB() {
    if (cached.conn) return cached.conn;

    const atlasURI = process.env.ATLAS_URL;
    const localURI = process.env.MONGODB_URI;

    // Try Atlas first when available (short timeout). If it fails, fall back to local.
    if (atlasURI) {
        try {
            cached.promise = mongoose.connect(atlasURI, {
                dbName: "cgblogdatabase",
                serverSelectionTimeoutMS: 2000, // quick failover when offline
            });
            cached.conn = await cached.promise;
            console.log("✅ Connected to MongoDB Atlas");
            return cached.conn;
        } catch (atlasError) {
            console.warn("⚠️ Atlas connection failed, falling back to local MongoDB:", atlasError.message || atlasError);
            // fall through to try local
        }
    }

    // Attempt local connection
    try {
        cached.promise = mongoose.connect(localURI);
        cached.conn = await cached.promise;
        console.log("✅ Connected to Local MongoDB");
        return cached.conn;
    } catch (localError) {
        console.error("❌ Local MongoDB connection failed:", localError);
        throw localError;
    }
}






/* offline and Online work time response*/
// import mongoose from "mongoose";

// let cached = global.mongoose;

// if (!cached) {
//     cached = global.mongoose = { conn: null, promise: null };
// }

// export async function connectDB() {
//     if (cached.conn) return cached.conn;

//     const atlasURI = process.env.ATLAS_URL
//     const localURI = process.env.MONGODB_URI

//     try {
//         // ⏳ Try Atlas first (short timeout)
//         cached.promise = mongoose.connect(atlasURI, {
//             serverSelectionTimeoutMS: 2000,
//         });

//         cached.conn = await cached.promise;
//         console.log("✅ Connected to MongoDB Atlas");
//         return cached.conn;
//     } catch (atlasError) {
//         console.warn("⚠️ Atlas connection failed, switching to local MongoDB");

//         try {
//             cached.promise = mongoose.connect(localURI);
//             cached.conn = await cached.promise;
//             console.log("✅ Connected to Local MongoDB");
//             return cached.conn;
//         } catch (localError) {
//             console.error("❌ Local MongoDB connection failed");
//             throw localError;
//         }
//     }
// }
