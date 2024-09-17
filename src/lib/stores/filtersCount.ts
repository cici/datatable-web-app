import { derived } from 'svelte/store';
import { songsCount, states } from './filters';

export const selectedFiltersCount = derived([songsCount, states], ([$songsCount, $states]) => {
	let count = 0;

	if ($songsCount.some((count) => count.selected)) count += 1;
	if ($states.some((state) => state.selected)) count += 1;

	return count;
});
