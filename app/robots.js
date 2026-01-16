export default function robots() {
    return {
        rules: {
            userAgent: "*",
            allow: "/",
            disallow: ["/dashboard/*", "/api/*", "/login"],
        },

        sitemap: "https://cgwildexplore.vercel.app/sitemap.xml",
    };
}
