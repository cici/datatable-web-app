<script lang="ts">
	import { Input } from '$lib/components/ui/input';
	import { Search, Filter } from 'lucide-svelte';
	import FilterPopup from './filter-dialog.svelte';
	import { resetAllFilters } from '$lib/stores/filters';

	export let searchValue: any;
</script>

<div class="relative flex w-full md:w-auto md:max-w-xs">
	<div class="absolute left-[1.1rem] top-[0.7rem]">
		<Search size={16} />
	</div>
	<Input
		bind:value={searchValue}
		type="text"
		placeholder="Search"
		class="e h-10 w-full rounded-lg border-2 px-4 pl-10 focus-visible:ring-1 "
	/>
	<!-- <button
		class="flex items-center justify-center rounded-r-lg border-2 border-l-0 px-3 hover:bg-muted"
	>
		<Filter size={16} />
	</button> -->
</div>
