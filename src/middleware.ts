import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware(async (context, next) => {
	const response = await next();

	response.headers.set('Referrer-Policy', 'no-referrer');
	response.headers.set('Permissions-Policy', '');
	response.headers.set('X-Frame-Options', 'DENY');
	response.headers.set('X-Content-Type-Options', 'nosniff');

	return response;
});
