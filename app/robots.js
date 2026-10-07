export default function robots() {
    return {
        rules: {
            userAgent: "*",
            allow: "/",
            disallow: ["/dashboard/*", "/api/*", "/login"],
        },

        sitemap: "https://cgwildexplore.com/sitemap.xml",
    };
}
