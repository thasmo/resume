import type { APIRoute } from 'astro';

import { getDeployStore } from '@netlify/blobs';

export const prerender = false;

export const GET: APIRoute = async ({ currentLocale, site }) => {
	const key = `resume-${currentLocale}.pdf`;
	const url = `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/browser-rendering/pdf`;

	const store = getDeployStore('files');

	const data = await store.get(key, { consistency: 'eventual', type: 'blob' });

	if (!data) {
		const options = getFetchOptions(`${site?.href}/${currentLocale}/`);
		const data = await fetch(url, options).then((response) => response.blob());

		await store.set(key, data);
	}

	return new Response(data, {
		headers: {
			'content-type': 'application/pdf',
		},
	});
};

const getFetchOptions = (url: string) => {
	return {
		body: JSON.stringify({
			gotoOptions: {
				waitUntil: 'networkidle0',
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
			'authorization': `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,
			'content-type': 'application/json',
		},
		method: 'POST',
	};
};
