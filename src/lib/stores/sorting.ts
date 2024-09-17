// import { writable } from '@macfja/svelte-persistent-store';

import { writable } from 'svelte/store';

export interface SortingOption {
	value: string;
	label: string;
	ascending: boolean;
}

export const sortingOptions = [
	{ value: 'venue_name', label: 'Venue Name (A-Z)', ascending: true },
	{ value: 'venue_name', label: 'Venue Name (Z-A)', ascending: false },
	{ value: 'city_name', label: 'City Name (A-Z)', ascending: true },
	{ value: 'city_name', label: 'City Name (Z-A)', ascending: false },
	{ value: 'state_name', label: 'State Name (A-Z)', ascending: true },
	{ value: 'state_name', label: 'State Name (Z-A)', ascending: false },
	{ value: 'event_date', label: 'Event Date', ascending: true },
	{ value: 'number_songs', label: 'No. of songs (High to Low)', ascending: false },
	{ value: 'number_songs', label: 'No. of songs (Low to High)', ascending: true }
];

export const selectedSorting = writable<number>(0); // Default to the first sorting option
