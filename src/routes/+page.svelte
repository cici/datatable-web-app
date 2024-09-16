<script lang="ts">
	import DataTable from '$lib/components/data-table.svelte';
	import MobileDataCard from '$lib/components/mobile-data-card.svelte';
	import MobileList from '$lib/components/mobile-list.svelte';
	import PaginationFooter from '$lib/components/PaginationFooter.svelte';
	import SearchBar from '$lib/components/SearchBar.svelte';
	import SimpleTable from '$lib/components/simple-table.svelte';
	import * as Pagination from '$lib/components/ui/pagination';
	import { eventsData } from '$lib/data/new-data';

	let perPage = 10;
	let selectedPage: number | undefined;
</script>

<div class="flex h-full w-screen flex-col items-center">
	<!-- <div class=" flex w-full flex-col gap-4 px-2 py-6 md:hidden">
		<SearchBar />
		{#each eventsData as venue, i}
			<MobileDataCard {venue} />
		{/each}
	</div> -->
</div>

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
	<PaginationFooter {pages} {currentPage} bind:selectedPage />
</Pagination.Root>
