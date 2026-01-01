import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';
import { config } from '@dotenvx/dotenvx';
import inline from '@playform/inline';
import { defineConfig } from 'astro/config';
import { env } from 'node:process';
import unocss from 'unocss/astro';

config();

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
		unocss(),
		sitemap(),
		inline({
			Beasties: {
				preload: 'swap',
			},
		}),
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
