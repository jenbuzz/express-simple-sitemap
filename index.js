'use strict';

const sitemap = (options) => {
    const sitemapUrl = options && options.sitemapUrl ? options.sitemapUrl : '/sitemap.xml';
    const urls = options && options.urls ? options.urls : [];

    return (req, res, next) => {
        if (req.url === sitemapUrl) {
            res.header('Content-Type', 'application/xml');

            let xmlUrls = '';
            urls.forEach(url => {
                const lineUrl = url.url ? `<loc>${url.url}</loc>` : '';
                const lineLastMod = url.lastmod ? `<lastmod>${url.lastmod}</lastmod>` : '';
                const lineChangeFreq = url.changefreq ? `<changefreq>${url.changefreq}</changefreq>` : '';
                const linePriority = url.priority ? `<priority>${url.priority}</priority>` : '';

                xmlUrls += `
                    <url>
                        ${lineUrl}
                        ${lineLastMod}
                        ${lineChangeFreq}
                        ${linePriority}
                    </url>
                `;
            });

            res.send(`<?xml version="1.0" encoding="UTF-8"?>
                <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
                    ${xmlUrls}
                </urlset>
            `);
        }

        next();
    }
}

module.exports = sitemap;
