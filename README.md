[![Build Status](https://secure.travis-ci.org/jenbuzz/express-simple-sitemap.png?branch=master)](http://travis-ci.org/jenbuzz/express-simple-sitemap) [![Coverage Status](https://coveralls.io/repos/github/jenbuzz/express-simple-sitemap/badge.svg?branch=master)](https://coveralls.io/github/jenbuzz/express-simple-sitemap?branch=master)

# express-simple-sitemap
The simplest way to add a sitemap to an express application.

## Installation

```bash
$ npm install express-simple-sitemap
```
or
```bash
$ yarn add express-simple-sitemap
```

## Usage

```javascript
// express setup
const express = require('express');
const app = express();

// import express-simple-sitemap
const sitemap = require('express-simple-sitemap');

// add express-simple-sitemap as middleware
app.use(sitemap({
    sitemapUrl: '/sitemap.xml', // optional, default value is '/sitemap.xml'
    urls: [
        {
            url: 'https://github.com/jenbuzz',
            lastmod: '2018-12-08', // optional
            changefreq: 'daily', // optional
            priority: 1.0, // optional
        },
        {
            url: 'https://github.com/jenbuzz/express-simple-sitemap',
        },
    ]
}));
```

Output:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
    <url>
        <loc>https://github.com/jenbuzz</loc>
        <lastmod>2018-12-08</lastmod>
        <changefreq>daily</changefreq>
        <priority>1</priority>
    </url>
    <url>
        <loc>https://github.com/jenbuzz/express-simple-sitemap</loc>
    </url>
</urlset>
```

## License
This package is open-sourced software licensed under the [MIT license](http://opensource.org/licenses/MIT)
