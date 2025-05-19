export default {
	'**/*.*': ['cspell --no-progress --no-summary --no-must-find-files'],
	'**/*.{js,jsx,ts,tsx}': ['eslint'],
	'**/*.{md,json,yml,yaml}': ['prettier --check'],
};
