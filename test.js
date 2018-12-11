'use strict';

const express = require('express');
const httpMocks = require('node-mocks-http');
const sitemap = require('./index');

test('add sitemap middleware to express application', () => {
    const app = express();
    app.use(sitemap());
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
