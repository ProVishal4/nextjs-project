import { connectDB } from "@/lib/mongodb";
import database from "@/models/database";

export async function GET(req) {
  await connectDB();
   const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || "not working!";
  
  try {
    const result = await database
      .find({
        title: { $regex: search, $options: "i" }, 
      })
      .limit(6)
      .select("title slug description imageUrl");
  return  Response.json(result); 
  } catch (err) {
    Response.status(500).json({ error: "Server error" });
    console.log(err);
  }
}