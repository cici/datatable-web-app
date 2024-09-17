<script lang="ts">
	import ItemsPerPage from '$lib/components/Items-per-page.svelte';
	import MobileDataCard from '$lib/components/mobile-data-card.svelte';
	import PaginationFooter from '$lib/components/pagination-footer.svelte';
	import SearchBar from '$lib/components/search-bar.svelte';
	import SimpleTable from '$lib/components/simple-table.svelte';
	import * as Pagination from '$lib/components/ui/pagination';
	import { eventsData } from '$lib/data/new-data';

	let perPage = 10;
	let selectedPage: number | undefined;
</script>

<Pagination.Root count={10} {perPage} bind:page={selectedPage} let:pages let:currentPage>
	<div class="w-full flex-col gap-6 px-4 py-6 md:flex md:px-36 md:pt-16">
		<SearchBar />
		<SimpleTable {eventsData} />
		<div class=" flex w-full flex-col gap-4 py-6 md:hidden">
			{#each eventsData as event, i}
				<MobileDataCard {event} />
			{/each}
		</div>
	</div>
	<div class="flex w-full flex-col items-center justify-between gap-4 px-4 md:flex-row md:px-36">
		<ItemsPerPage bind:perPage />
		<PaginationFooter {pages} {currentPage} bind:selectedPage />
	</div>
</Pagination.Root>
