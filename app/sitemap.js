export const dynamic = "force-dynamic";
import { connectDB } from "@/lib/mongodb";
import database from "@/models/database";

  function escapeXml(value = "") {
        return value
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&apos;")
            .replace(/%2F/g, "")
            .replace(/%20/g, "");
    }
// app/sitemap.js

// const res = fetch(`${baseUrl}/api/v2-limit`)
// const data = res.json()

export default async function sitemap() {
    await connectDB()
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    
    
    const staticRoutes = [
        "/tourist-places",
        "/privacy-policy",
        "/about",
        "/terms-conditions"
       
    ].map((route) => ({
        url: escapeXml(`${baseUrl}/${encodeURIComponent(route)}`),
        lastModified: new Date(),
        changeFrequency: route === "/tourist-places" ? "daily" : "weekly",
        priority: 0.8,
    })
);

    

const routeName = await database.find({}, "slug updatedAt imageUrl");

  



    const dynamicRoutes = routeName.map((post) => ({
        //url: `${process.env.NEXT_PUBLIC_BASE_URL}/tourist-places/${post.slug}`,
        url: escapeXml(`${baseUrl}/tourist-places/${encodeURIComponent(post.slug)}`),
        lastModified: new Date(post.updatedAt),
        images: post.imageUrl ? [escapeXml(post.imageUrl)] : [],
        changeFrequency: "weekly",
        priority: 0.7,
    }));
    return [...staticRoutes, ...dynamicRoutes];
}