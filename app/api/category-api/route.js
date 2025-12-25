import { connectDB } from "@/lib/mongodb";
import categorise from "@/models/categorise";

export async function GET() {
    await connectDB();
    

    const field = await categorise.find();
    return Response.json(field);
}
