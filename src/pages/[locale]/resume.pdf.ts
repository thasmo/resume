import type { APIRoute } from 'astro';

export const prerender = false;

export const GET: APIRoute = async ({ currentLocale, site }) => {
	const { env } = await import('cloudflare:workers');
	const store = env.FILES;

	const url = `https://api.cloudflare.com/client/v4/accounts/${env.CLOUDFLARE_ACCOUNT_ID}/browser-rendering/pdf`;
	const key = `resume-${currentLocale}.pdf`;

	let data = await store.get(key, { type: 'arrayBuffer' });

	if (!data) {
		const options = getFetchOptions(`${site}/${currentLocale}`, env.CLOUDFLARE_API_TOKEN);
		data = await fetch(url, options).then(async response => await response.arrayBuffer());

		await store.put(key, data);
	}

	return new Response(data, {
		headers: {
			'content-type': 'application/pdf',
		},
	});
};

function getFetchOptions(url: string, token: string) {
	return {
		body: JSON.stringify({
			gotoOptions: {
				waitUntil: 'load',
			},
			pdfOptions: {
				format: 'a4',
				margin: {
					bottom: '15mm',
					left: '15mm',
					right: '15mm',
					top: '15mm',
				},
				printBackground: true,
			},
			setJavaScriptEnabled: true,
			url,
		}),
		headers: {
			'authorization': `Bearer ${token}`,
			'content-type': 'application/json',
		},
		method: 'POST',
	};
}
