
// suggetion api. sugget  typing searh reslutes
import { connectDB } from "@/lib/mongodb";
import database from "@/models/database";
import { NextResponse } from "next/server";

export async function GET(req) {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q")?.trim() || "";

    try {
        const items = await database.find({
            title: { $regex: q, $options: "i" },
        }).limit(5).select("title slug _id");
         return NextResponse.json({results:items});
    } catch (error) {
        console.error(error);
        return NextResponse.json({error: "Server error" });
    }
}
// export const dynamic = "force-dynamic";


