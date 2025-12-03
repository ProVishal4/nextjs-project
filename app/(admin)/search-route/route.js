// app/api/search/route.js
export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q")?.toLowerCase() || "";


    
    const items = [
        "Apple",
        "Banana",
        "Orange",
        "Grapes",
        "Pineapple",
        "Watermelon",
    ];

    const filtered = items.filter((item) =>
        item.toLowerCase().includes(q)
    );

    return Response.json({ results: filtered });
}
