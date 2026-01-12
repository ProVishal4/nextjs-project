export default function robots() {
    return {
        rules: {
            userAgent: "*",
            allow: "/",
            disallow: ["/admin", "/dashboard/*", "/login"],
        },

        sitemap: "https://cgwildexplore.vercel.app/sitemap.xml",
    };
}
