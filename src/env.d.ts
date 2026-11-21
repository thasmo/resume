// Let Astro's JSX read props of prebuilt Vue components (e.g. @thasmo/ui) from `$props`.
declare namespace astroHTML.JSX {
	interface ElementAttributesProperty {
		$props: object;
	}
}

// Only the bindings this project uses; `.void-wrangler.jsonc` is generated, so `wrangler types` has nothing to read.
declare module 'cloudflare:workers' {
	export const env: {
		CLOUDFLARE_ACCOUNT_ID: string;
		CLOUDFLARE_API_TOKEN: string;
		FILES: {
			get: (key: string, options: { type: 'arrayBuffer' }) => Promise<ArrayBuffer | null>;
			put: (key: string, value: ArrayBuffer, options?: { expirationTtl?: number }) => Promise<void>;
		};
	};
}
