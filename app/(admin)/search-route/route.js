import { connectDB } from "@/lib/mongodb";
import database from "@/models/database";
import { NextResponse } from "next/server";

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

export async function GET(req) {
    await connectDB(); 
    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q")?.toLowerCase() || "";

    // const items = [
    //     "Apple",
    //     "Banana",
    //     "Orange",
    //     "Grapes",
    //     "Pineapple",
    //     "Watermelon",
    // ];
    const items = (await database.find()).map(({ title }) => title);
    console.log("Items from database:", items);
   // return NextResponse.json(artical)
    const filtered = items.filter((item) =>
        item.toLowerCase().includes(q)
    );

    return NextResponse.json({ results: filtered });
}

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
