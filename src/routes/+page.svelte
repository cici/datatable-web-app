<script lang="ts">
	import FilterPopup from '$lib/components/filter-dialog.svelte';
	import ItemsPerPage from '$lib/components/Items-per-page.svelte';
	import MobileDataCard from '$lib/components/mobile-card.svelte';
	import PaginationFooter from '$lib/components/pagination-footer.svelte';
	import SearchBar from '$lib/components/search-bar.svelte';
	import SimpleTable from '$lib/components/simple-table.svelte';
	import SortPopup from '$lib/components/sort-popup.svelte';
	import * as Pagination from '$lib/components/ui/pagination';
	import { eventsData } from '$lib/data/new-data';
	import { resetAllFilters } from '$lib/stores/filters';
	import { pagePadding } from '$lib/utils/styles';

	let perPage = 10;
	let selectedPage: number | undefined;
	let searchValue: string;

	$: console.log('Searched Value:', searchValue);

	const updateResults = async () => {
		// call api with searchValue
	};
</script>

<Pagination.Root count={10} {perPage} bind:page={selectedPage} let:pages let:currentPage>
	<div class="w-full flex-col gap-6 py-6 md:flex md:pt-16 {pagePadding}">
		<div class="flex flex-col gap-2 md:flex-row">
			<SearchBar bind:searchValue />
			<div class="flex flex-row gap-2">
				<FilterPopup
					onApply={() => {
						updateResults();
					}}
					onClear={() => {
						resetAllFilters();
						updateResults();
					}}
				/>
				<SortPopup
					onApply={() => {
						updateResults();
					}}
				/>
			</div>
		</div>

		<SimpleTable {eventsData} />
		<div class=" flex w-full flex-col gap-4 py-6 md:hidden">
			{#each eventsData as event, i}
				<MobileDataCard {event} />
			{/each}
		</div>
	</div>
	<div
		class="flex w-full flex-col items-center justify-between gap-4 pb-16 md:flex-row {pagePadding}"
	>
		<ItemsPerPage bind:perPage />
		<PaginationFooter {pages} {currentPage} bind:selectedPage />
	</div>
</Pagination.Root>
