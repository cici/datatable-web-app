// import type { PageLoad } from './$types';

// export const load: PageLoad = async ({ fetch, url }) => {
// 	const page = url.searchParams.get('page') || '1';
// 	const limit = url.searchParams.get('limit') || '10';

// 	try {
// 		const response = await fetch(
// 			`https://74db-207-170-229-104.ngrok-free.app/shows?page=${page}&limit=${limit}`
// 		);
// 		if (response.ok) {
// 			const data = await response.json();
// 			return {
// 				props: {
// 					eventsData: data.results, // Assuming the API returns an array of events in a 'results' field
// 					totalCount: data.totalCount // Assuming the API returns total count of items for pagination
// 				}
// 			};
// 		} else {
// 			console.error('Error fetching data:', response.statusText);
// 			return {
// 				props: {
// 					eventsData: [],
// 					totalCount: 0
// 				}
// 			};
// 		}
// 	} catch (error) {
// 		console.error('Fetch error:', error);
// 		return {
// 			props: {
// 				eventsData: [],
// 				totalCount: 0
// 			}
// 		};
// 	}
// };
