import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';
import vue from '@astrojs/vue';
import { defineConfig } from 'astro/config';
import process from 'node:process';
import unocss from 'unocss/astro';
import { loadEnv } from 'vite';
import { voidPlugin } from 'void';

const env = loadEnv(process.env.NODE_ENV, process.cwd(), '');

export default defineConfig({
	adapter: cloudflare({
		configPath: './.void-wrangler.jsonc',
		imageService: 'compile',
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
	session: false,
	vite: {
		plugins: [voidPlugin()],
	},
});
