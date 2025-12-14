
import { connectDB } from "@/lib/mongodb";
import database from "@/models/database";
//const Product = database.title;
export async function GET(req) {
    await connectDB();

    const { searchParams } = new URL(req.url);

    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 5;

    const skip = (page - 1) * limit;

    const articles = await database
        .find()
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 });

    const total = await database
        .countDocuments();

    return Response.json({
        articles,
        total,
        page,
        totalPages: Math.ceil(total / limit),
    });
}