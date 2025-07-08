import presetBasic from '@somehow-digital/unocss-preset';
import presetFonts from '@unocss/preset-web-fonts';
import { createLocalFontProcessor } from '@unocss/preset-web-fonts/local';
import { defineConfig } from 'unocss';

export default defineConfig({
	presets: [
		presetBasic(),
		presetFonts({
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
				fontServeBaseUrl: '/assets/fonts/',
			}),
			provider: 'fontshare',
		}),
	],
	theme: {
		breakpoint: {
			lg: '1400px',
			md: '1000px',
			sm: '600px',
		},
		colors: {
			primary: {
				DEFAULT: '#27374D',
			},
		},
	},
});
