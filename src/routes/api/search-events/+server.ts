import type { RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
	const { selectedPage, perPage, searchValue, searchType } = await request.json();

	const apiUrl = `https://mysetlist.onrender.com/search?action=${searchType}&term=${encodeURIComponent(searchValue)}&page=${selectedPage}&limit=${perPage}`;

	console.log(apiUrl);

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
