import type { RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
	const { selectedPage, perPage, searchValue } = await request.json();

	const apiUrl = `https://mysetlist.onrender.com/shows?page=${selectedPage}&limit=${perPage}&search=${encodeURIComponent(searchValue)}`;

	try {
		const response = await fetch(apiUrl);
		if (response.ok) {
			const data = await response.json();
			console.log('data:', data.results);
			return new Response(JSON.stringify({ results: data }), {
				headers: { 'Content-Type': 'application/json' }
			});
		} else {
			console.error('Error fetching data:', response.statusText);
			return new Response(JSON.stringify({ error: 'Error fetching data' }), {
				status: response.status,
				headers: { 'Content-Type': 'application/json' }
			});
		}
	} catch (error) {
		console.error('Fetch error:', error);
		return new Response(JSON.stringify({ error: 'Fetch error' }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' }
		});
	}
};
