import { defineConfig } from 'vite-plus';

export default defineConfig({
	staged: {
		'**/*.*': [
			'eslint --fix',
			'cspell --no-progress --no-summary --no-must-find-files',
		],
	},
});
