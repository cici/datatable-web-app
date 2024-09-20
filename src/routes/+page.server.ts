// import type { PageServerLoad } from './$types';

// export const load: PageServerLoad = async () => {
// 	const perPage = 10; // Default value
// 	const selectedPage = 1; // Default value
// 	const searchValue = ''; // Default value

// 	const apiUrl = `https://mysetlist.onrender.com/shows?page=${selectedPage}&limit=${perPage}&search=${encodeURIComponent(searchValue)}`;

// 	try {
// 		const response = await fetch(apiUrl);
// 		if (response.ok) {
// 			const data = await response.json();
// 			return {
// 				eventsData: data.results,
// 				perPage,
// 				selectedPage,
// 				searchValue
// 			};
// 		} else {
// 			console.error('Error fetching data:', response.statusText);
// 			return {
// 				eventsData: [],
// 				perPage,
// 				selectedPage,
// 				searchValue
// 			};
// 		}
// 	} catch (error) {
// 		console.error('Fetch error:', error);
// 		return {
// 			eventsData: [],
// 			perPage,
// 			selectedPage,
// 			searchValue
// 		};
// 	}
// };
