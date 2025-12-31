import type { APIRoute } from 'astro';

export const prerender = false;

export const GET: APIRoute = async ({ currentLocale, locals, site }) => {
	const url = `https://api.cloudflare.com/client/v4/accounts/${import.meta.env.CLOUDFLARE_ACCOUNT_ID}/browser-rendering/pdf`;
	const key = `resume-${currentLocale}.pdf`;

	const { env } = (locals as any).runtime;
	const store = env.FILES;

	let data = await store.get(key, { type: 'arrayBuffer' });

	if (!data) {
		const options = getFetchOptions(`${site}/${currentLocale}`);
		data = await fetch(url, options).then(async response => await response.arrayBuffer());

		await store.put(key, data);
	}

	return new Response(data, {
		headers: {
			'content-type': 'application/pdf',
		},
	});
};

function getFetchOptions(url: string) {
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
			'authorization': `Bearer ${import.meta.env.CLOUDFLARE_API_TOKEN}`,
			'content-type': 'application/json',
		},
		method: 'POST',
	};
}
