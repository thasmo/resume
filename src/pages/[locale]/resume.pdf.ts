import type { APIRoute } from 'astro';
import { getDeployStore } from '@netlify/blobs';

export const prerender = false;

export const GET: APIRoute = async ({ currentLocale, site }) => {
	const url = `https://api.cloudflare.com/client/v4/accounts/${import.meta.env.CLOUDFLARE_ACCOUNT_ID}/browser-rendering/pdf`;
	const key = `resume-${currentLocale}.pdf`;

	const store = getDeployStore('files');

	let data = await store.get(key, { consistency: 'eventual', type: 'blob' });

	if (!data) {
		const options = getFetchOptions(`${site}/${currentLocale}`);
		data = await fetch(url, options).then(async response => await response.blob());

		await store.set(key, data);
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
