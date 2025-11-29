import { connectDB } from "@/lib/mongodb";
//import categorise from "@/models/categorise";
import Database from "@/models/database";



export async function GET(request, response){
    await connectDB();
      const query = request.query.article || "error-form-search"; // e.g. ?q=iphone
      try {
        const result = await Database.find({
          title: { $regex: query, $options: "i" }, // case-insensitive search
        });
    response.json(result); // send JSON to frontend
      } catch (err) {
    response.status(500).json({ error: "Server error" });
        console.log(err);
      }
}