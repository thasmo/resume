import type { APIRoute } from 'astro';
import { defaultLocale } from '../localization';

// Rendered by the worker, as `void deploy` doesn't upload the `_redirects` file.
export const prerender = false;

export const ALL: APIRoute = ({ redirect }) => redirect(`/${defaultLocale}`, 301);
