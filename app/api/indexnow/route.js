export async function POST(req) {
    const { urlList } = await req.json();

    await fetch("https://api.indexnow.org/indexnow", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            host: "cgwildexplore.vercel.app",
            key: "a1f9f8b79d6c47a893e853837315fbd9",
            keyLocation: "https://cgwildexplore.vercel.app/a1f9f8b79d6c47a893e853837315fbd9.txt",
            urlList: urlList,
        }),
    });

    return Response.json({ success: true });
}