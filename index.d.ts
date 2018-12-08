import { Response, Request } from 'express';

export interface SitemapUrl {
    url: string;
    lastmod?: string;
    changefreq?: string;
    priority?: number;
}

export interface SitemapOptions {
    sitemapUrl?: string;
    urls?: SitemapUrl[];
}

/**
 * Send a response with a sitemap containing specified URLs
 * if specified sitemap url is requested.
 * 
 * @param options containing sitemapUrl and urls.
 * @returns express middleware function.
 */
export default function sitemap(options?: SitemapOptions): (req: Request, res: Response, next: () => void) => void;
