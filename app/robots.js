export default function robots() {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/admin', '/dashboard/*', '/login'],
            },
        ],
        sitemap: 'https://yourdomain.com/sitemap.xml',
    };
}
