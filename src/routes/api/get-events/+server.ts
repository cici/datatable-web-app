import type { RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
	const { selectedPage, perPage } = await request.json();

	const apiUrl = `${import.meta.env.VITE_API_BASE_URL}/shows?page=${selectedPage}&limit=${perPage}`;

	console.log('SERVER');
	console.log(apiUrl);

	try {
		const response = await fetch(apiUrl);
		console.log("before checking response")
		if (response.ok) {
			console.log("response is ok");
			console.log(response);
			const data = await response.json();
			console.log("data has been populated");
			return new Response(JSON.stringify({ results: data }), {
				headers: { 'Content-Type': 'application/json' }
			});
		} else {
			console.error('Error fetching data:', response.status, response.statusText);
			
			// Try to get error details from the external API
			let errorMessage = 'Failed to fetch events data';
			try {
				const errorData = await response.text();
				if (errorData) {
					errorMessage = `External API error: ${errorData}`;
				}
			} catch (parseError) {
				console.log('Could not parse external API error response');
			}
			
			// Provide more specific error messages based on status code
			if (response.status === 404) {
				errorMessage = 'Events endpoint not found';
			} else if (response.status === 500) {
				errorMessage = 'External database connection failed';
			} else if (response.status === 400) {
				errorMessage = 'Invalid request parameters';
			} else if (response.status === 401) {
				errorMessage = 'Authentication required';
			} else if (response.status === 403) {
				errorMessage = 'Access forbidden';
			} else if (response.status >= 500) {
				errorMessage = 'External server error';
			} else if (response.status >= 400) {
				errorMessage = 'External API request failed';
			}
			
			return new Response(JSON.stringify({ error: errorMessage, status: response.status }), {
				status: response.status,
				headers: { 'Content-Type': 'application/json' }
			});
		}
	} catch (error: unknown) {
		console.error('Fetch error:', error);
		
		let errorMessage = 'Network request failed';
		if (error instanceof TypeError && error.message.includes('fetch')) {
			errorMessage = 'Unable to connect to external service';
		} else if (error instanceof SyntaxError) {
			errorMessage = 'Invalid response from external service';
		} else if (error instanceof Error && error.message) {
			errorMessage = `Request error: ${error.message}`;
		}
		
		return new Response(JSON.stringify({ error: errorMessage }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' }
		});
	}
};
