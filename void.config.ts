import { defineConfig } from 'void/config';

export default defineConfig({
	cloudflare: {
		compatibility_date: '2026-06-18',
		compatibility_flags: [
			'nodejs_compat',
			'global_fetch_strictly_public',
			'nodejs_als',
		],
		keep_vars: true,
		kv_namespaces: [
			{
				binding: 'FILES',
				id: '6fe535cdeca144be96e7bd265984c794',
			},
		],
		name: 'thasmo-resume',
		observability: {
			enabled: true,
			head_sampling_rate: 1,
		},
		preview_urls: true,
		routes: [
			{
				pattern: 'resume.thasmo.com',
				custom_domain: true,
			},
		],
		send_metrics: false,
	},
	inference: {
		appType: 'framework',
	},
});
