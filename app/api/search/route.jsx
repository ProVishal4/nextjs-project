import { connectDB } from "@/lib/mongodb";
//import categorise from "@/models/categorise";
import Database from "@/models/database";



export async function GET(request) {
  await connectDB();

  try {
    const query = request.query.article || "error-form-search";
    const result = await Database.find({
      title: { $regex: query, $options: "i" }, // case-insensitive search
    });
    return Response.json(result); // send JSON to frontend
  } catch (err) {
    //req.status(500).json({ error: "Server error" });
    console.log(err);
  }
}