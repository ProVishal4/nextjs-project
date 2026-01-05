import { connectDB } from "@/lib/mongodb";
import database from "@/models/database";

// app/sitemap.js
export default async function sitemap() {
    await connectDB()
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    /* ---------- Static Routes ---------- */
    const staticRoutes = [
        "",
        "/about",
        "/contact",
        "/blog",
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.8, 
    }));

    /* ---------- Dynamic Routes ---------- */
    // Example: blog posts, products, categories
    // const posts = await fetch(`${baseUrl}/api/posts`, {
    //     cache: "no-store",
    // }).then((res) => res.json());  images:`${post.imgUrl}` post.map((img) => img.imageUrl),

const routeName = await database.find({}, "slug updatedAt imageUrl");


    const dynamicRoutes = routeName.map((post) => ({
        url: `${baseUrl}/tourist-places/${post.slug}`,
        lastModified: new Date(post.updatedAt),
        images: post.imageUrl ? [post.imageUrl] : [],
        changeFrequency: "weekly",
        priority: 0.7,
    }));

    return [...staticRoutes, ...dynamicRoutes];
}