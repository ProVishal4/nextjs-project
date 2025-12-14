import { connectDB } from "@/lib/mongodb";
import database from "@/models/database";

export async function GET(req) {
    await connectDB();

    const { searchParams } = new URL(req.url);

    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 5;
    const category = searchParams.get("category");

    const skip = (page - 1) * limit;

    const query = category ? { category } : {};
    // .find({_id: query})
    const articles = await database
        .find(query)
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 });

    const total = await database.countDocuments(query);

    return Response.json({
        articles,
        page,
        totalPages: Math.ceil(total / limit),
    });
}