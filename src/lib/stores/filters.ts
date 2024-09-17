// import { writable } from '@macfja/svelte-persistent-store';

import { writable } from 'svelte/store';

export interface SongsCount {
	label: string;
	years: number[];
	selected: boolean;
}

export interface State {
	name: string;
	selected: boolean;
}

export const songsCount = writable<SongsCount[]>([
	{ label: '1-3', years: [1, 2, 3], selected: false },
	{ label: '3-6', years: [3, 4, 5, 6], selected: false },
	{ label: '6-10', years: [6, 7, 8, 9, 10], selected: false },
	{ label: '10+', years: [10, 9999], selected: false }
]);

export const states = writable<State[]>([
	{ name: 'California', selected: false },
	{ name: 'New York', selected: false },
	{ name: 'Texas', selected: false },
	{ name: 'Florida', selected: false },
	{ name: 'Illinois', selected: false },
	{ name: 'Pennsylvania', selected: false },
	{ name: 'Ohio', selected: false },
	{ name: 'Georgia', selected: false },
	{ name: 'North Carolina', selected: false },
	{ name: 'Michigan', selected: false }
]);

export function resetTenures() {
	songsCount.set([
		{ label: '1-3', years: [1, 2, 3], selected: false },
		{ label: '3-6', years: [3, 4, 5, 6], selected: false },
		{ label: '6-10', years: [6, 7, 8, 9, 10], selected: false },
		{ label: '10+', years: [10, 9999], selected: false }
	]);
}

export function resetPropertyTypes() {
	states.set([
		{ name: 'California', selected: false },
		{ name: 'New York', selected: false },
		{ name: 'Texas', selected: false },
		{ name: 'Florida', selected: false },
		{ name: 'Illinois', selected: false },
		{ name: 'Pennsylvania', selected: false },
		{ name: 'Ohio', selected: false },
		{ name: 'Georgia', selected: false },
		{ name: 'North Carolina', selected: false },
		{ name: 'Michigan', selected: false }
	]);
}

export const resetAllFilters = () => {
	resetTenures();
	resetPropertyTypes();
};
