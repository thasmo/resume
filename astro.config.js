import netlify from '@astrojs/netlify';
import sitemap from '@astrojs/sitemap';
import { config } from '@dotenvx/dotenvx';
import inline from '@playform/inline';
import { defineConfig } from 'astro/config';
import unocss from 'unocss/astro';

config();

export default defineConfig({
	adapter: netlify(),
	base: '/',
	i18n: {
		defaultLocale: 'en',
		locales: ['en', 'de'],
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
	prefetch: {
		defaultStrategy: 'tap',
		prefetchAll: true,
	},
	site: process.env.APPLICATION_SITE,
	trailingSlash: 'always',
});
