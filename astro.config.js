import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';
import vue from '@astrojs/vue';
import { defineConfig } from 'astro/config';
import process from 'node:process';
import unocss from 'unocss/astro';
import { loadEnv } from 'vite';

const env = loadEnv(process.env.NODE_ENV, process.cwd(), '');

export default defineConfig({
	adapter: cloudflare({
		imageService: 'compile',
		platformProxy: {
			enabled: true,
		},
	}),
	base: '/',
	i18n: {
		defaultLocale: 'en',
		locales: ['en', 'de'],
		routing: {
			prefixDefaultLocale: true,
		},
	},
	integrations: [
		vue(),
		unocss(),
		sitemap(),
	],
	output: 'static',
	redirects: {
		'/': {
			status: 301,
			destination: '/en',
		},
	},
	prefetch: {
		defaultStrategy: 'tap',
		prefetchAll: true,
	},
	site: env.APPLICATION_SITE,
	trailingSlash: 'never',
});
