
import { connectDB } from "@/lib/mongodb";
import categorise from "@/models/categorise";
import database from "@/models/database";

export async function GET(req) {
    await connectDB();

    const { searchParams } = new URL(req.url);

    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 5;
    const category = searchParams.get("category");

    const skip = (page - 1) * limit;

    //const query = category ? { _id } : {};
    console.log("this is query of category:- ", category)
    // .find({_id: query})
    // build a filter that matches articles whose `category` field equals the category _id (if provided)
    const filter = {};
    if (category) {
        try {
            // convert string id to ObjectId when using mongoose
            const mongoose = await import("mongoose");
            filter.category = mongoose.Types.ObjectId(category);
        } catch {
            // fallback to string match if conversion/import fails
            filter.category = category;
        }
    }

    const articles = await database
        .find(filter)
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 });

    // replace the later countDocuments(query) with this to use the same filter
    const total = await database.countDocuments(filter);

    //const total = await database.countDocuments(query);

    return Response.json({
        articles,
        page,
        totalPages: Math.ceil(total / limit),
    });
}