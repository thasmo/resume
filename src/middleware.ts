import { defineMiddleware, sequence } from 'astro/middleware';

const handler = defineMiddleware((context, next) => {
	return next();
});

export const onRequest = sequence(handler);
