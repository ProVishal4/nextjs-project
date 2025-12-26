// import { connectDB } from "@/lib/mongodb";
// import database from "@/models/database";
// import { NextResponse } from "next/server";

// export async function GET(req) {
//     const { searchParams } = new URL(req.url);
//     const q = searchParams.get("q")?.toLowerCase() || "";

// const allData = (await database.find()).map(({ title }) => ({ title }));
//    console.log(allData)

//     // const filtered = allData.filter((item) =>
//     //     item.toLowerCase().includes(q)
//     // );
//     const filtered = allData.filter(({ title }) => {
//         const text = (title || "").toLowerCase();
//         return q === "" || text.includes(q);
//     });

//     return Response.json({ results: filtered });
// }

// export async function GET(req) {
//     await connectDB(); 
//     const { searchParams } = new URL(req.url);
//     const q = searchParams.get("q")?.toLowerCase() || "";

// const items = [
//     "Apple",
//     "Banana",
//     "Orange",
//     "Grapes",
//     "Pineapple",
//     "Watermelon",
// ];
//     const items = (await database.find()).map(({ title }) => title);
//     console.log("Items from database:", items);
//    // return NextResponse.json(artical)
//     const filtered = items.filter((item) =>
//         item.toLowerCase().includes(q)
//     );

//     return NextResponse.json({ results: filtered });
// }

// import database from "@/models/database";

// export async function GET(req) {
//     console.log("🔥 API HIT: /search-route");

//     try {
//         const { searchParams } = new URL(req.url);
//         const q = searchParams.get("q")?.toLowerCase() || "";
//         console.log("🔎 Query received:", q);

//         const data = await database.find();
//         console.log("📦 Raw DB data:", data);

//         const allData = data.map(({ title }) => ({ title }));
//         console.log("📝 Mapped DB titles:", allData);

//         const filtered = allData.filter(({ title }) => {
//             const text = (title || "").toLowerCase();
//             return q === "" || text.includes(q);
//         });

//         console.log("✅ Filtered results:", filtered);

//         return Response.json({ results: filtered });
//     } catch (err) {
//         console.error("❌ API ERROR:", err);
//         return new Response(JSON.stringify({ error: "Server Error" }), {
//             status: 500,
//         });
//     }
// }

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

// import { connectDB } from "@/lib/mongodb";
// import database from "@/models/database";
// import { NextResponse } from "next/server";

// export async function GET(req) {
//     await connectDB();

//     const { searchParams } = new URL(req.url);
//     const q = searchParams.get("q")?.trim();

//     if (!q) {
//         return NextResponse.json([]);
//     }

//     try {
//         const items = await database
//             .find({ title: { $regex: q, $options: "i" } })
//             .select("title slug")
//             .limit(10);

//         return NextResponse.json({results:items});
//     } catch (error) {
//         console.error(error);
//         return NextResponse.json({ error: "Server error" }, { status: 500 });
//     }
// }


//suggetion api sugget search typing time searh reslutes
// import { connectDB } from "@/lib/mongodb";
// import database from "@/models/database";
// import { NextResponse } from "next/server";

// export async function GET(req) { 
//     await connectDB();
//     const { searchParams } = new URL(req.url);
//     const q = searchParams.get("q")?.toLowerCase() || "";
//     const data = (await database.find().limit(10)).map(({ title }) => title);
//       const docs = await database
//         .find({}, { title: 1, slug: 1, _id: 0 })
//         .lean()
//         .limit(5);
  
//     const filtered = docs.filter(
//       ({ title = "", slug = "" }) =>
//         title.toLowerCase().includes(q) || slug.toLowerCase().includes(q)
//     );
//     return NextResponse.json({ results: filtered });
// }