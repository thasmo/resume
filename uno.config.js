import preset from '@thasmo/ui/preset';
import fonts from '@unocss/preset-web-fonts';
import { createLocalFontProcessor } from '@unocss/preset-web-fonts/local';
import { defineConfig } from 'unocss';

export default defineConfig({
	presets: [
		preset(),
		fonts({
			fonts: {
				sans: {
					name: 'Fira Sans',
					weights: [400, 500],
				},
				serif: {
					name: 'Sentient',
					weights: [400, 500],
				},
			},
			processors: createLocalFontProcessor({
				cacheDir: 'node_modules/.cache/unocss/fonts/',
				fontAssetsDir: 'public/assets/fonts/',
				fontServeBaseUrl: '/assets/fonts',
			}),
			provider: 'fontshare',
		}),
	],
	safelist: [
		'font-sans',
		'font-serif',
	],
	content: {
		pipeline: {
			include: [
				/\.(vue|svelte|[jt]sx?|mdx?|astro|elm|php|phtml|html)($|\?)/,
				'**/node_modules/@thasmo/ui/**/*.*',
			],
		},
	},
});
