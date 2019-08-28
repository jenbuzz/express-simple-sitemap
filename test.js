'use strict';

const express = require('express');
const httpMocks = require('node-mocks-http');
const sitemap = require('./index');

test('add sitemap middleware to express application', () => {
    const app = express();
    app.use(sitemap());
});

test('skip sitemap middleware', () => {
    const request = httpMocks.createRequest({
        method: 'GET',
        url: '/',
    });

    const response = httpMocks.createResponse();

    sitemap()(request, response, () => {});

    expect(response._getData()).toEqual('');
    expect(response.statusCode).toEqual(200);
});

test('get empty sitemap from request', () => {
    const request = httpMocks.createRequest({
        method: 'GET',
        url: '/sitemap.xml',
    });

    const response = httpMocks.createResponse();

    sitemap()(request, response, () => {});

    expect(response.getHeader('Content-Type')).toEqual('application/xml');
});

test('get filled sitemap from request', () => {
    const request = httpMocks.createRequest({
        method: 'GET',
        url: '/site-map.xml',
    });

    const response = httpMocks.createResponse();

    sitemap({
        sitemapUrl: '/site-map.xml',
        urls: [
            {
                url: 'https://github.com/jenbuzz',
                lastmod: '2018-12-08',
                changefreq: 'daily',
                priority: 1.0,
            },
        ],
    })(request, response, () => {});

    expect(response.getHeader('Content-Type')).toEqual('application/xml');

    expect(response._getData()).toBe(
`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
<url>
    <loc>https://github.com/jenbuzz</loc>
    <lastmod>2018-12-08</lastmod>
    <changefreq>daily</changefreq>
    <priority>1</priority>
</url>
</urlset>`
    );
});

test('get filled sitemap with partly url objects from request', () => {
    const request = httpMocks.createRequest({
        method: 'GET',
        url: '/sitemap.xml',
    });

    const response = httpMocks.createResponse();

    sitemap({
        urls: [
            {
                url: 'https://github.com/jenbuzz',
            },
            {
                url: 'https://github.com/jenbuzz',
                lastmod: '2018-12-08',
            },
            {
                url: 'https://github.com/jenbuzz',
                lastmod: '2018-12-08',
                changefreq: 'always',
            },
            {
                url: 'https://github.com/jenbuzz',
                priority: 0.5,
            },
            {
                url: 'https://github.com/jenbuzz',
                lastmod: '2018-12-08',
                changefreq: 'daily',
                priority: 0,
            },
            {
                lastmod: '2018-12-08',
                changefreq: 'daily',
                priority: 0,
            },
        ],
    })(request, response, () => {});

    expect(response.getHeader('Content-Type')).toEqual('application/xml');

    expect(response._getData()).toBe(
`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
<url>
    <loc>https://github.com/jenbuzz</loc>
</url>
<url>
    <loc>https://github.com/jenbuzz</loc>
    <lastmod>2018-12-08</lastmod>
</url>
<url>
    <loc>https://github.com/jenbuzz</loc>
    <lastmod>2018-12-08</lastmod>
    <changefreq>always</changefreq>
</url>
<url>
    <loc>https://github.com/jenbuzz</loc>
    <priority>0.5</priority>
</url>
<url>
    <loc>https://github.com/jenbuzz</loc>
    <lastmod>2018-12-08</lastmod>
    <changefreq>daily</changefreq>
    <priority>0</priority>
</url>
</urlset>`
    );
});
