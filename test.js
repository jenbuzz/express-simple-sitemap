'use strict';

const express = require('express');
const httpMocks = require('node-mocks-http');
const sitemap = require('./index');

test('add sitemap middleware to express application', () => {
    const app = express();
    app.use(sitemap());
});

test('get sitemap from request', () => {
    const request = httpMocks.createRequest({
        method: 'GET',
        url: '/sitemap.xml',
    });

    var response = httpMocks.createResponse();

    sitemap()(request, response, () => {});

    expect(response.getHeader('Content-Type')).toEqual('application/xml');
});
