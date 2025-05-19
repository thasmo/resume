import config from '@somehow-digital/eslint-config/typescript';

export default [
	...config,
	{
		ignores: ['**/.*/', 'dist/'],
	},
];
