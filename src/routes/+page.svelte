<script lang="ts">
	import Spinner from '$lib/components/spinner.svelte';
	import { toast } from 'svelte-sonner';
	import { browser } from '$app/environment';
	import FilterPopup from '$lib/components/filter-dialog.svelte';
	import ItemsPerPage from '$lib/components/Items-per-page.svelte';
	import MobileDataCard from '$lib/components/mobile-card.svelte';
	import PaginationFooter from '$lib/components/pagination-footer.svelte';
	import SearchBar from '$lib/components/search-bar.svelte';
	import SimpleTable from '$lib/components/simple-table.svelte';
	import SortPopup from '$lib/components/sort-popup.svelte';
	import * as Pagination from '$lib/components/ui/pagination';
	import { resetAllFilters } from '$lib/stores/filters';
	import { pagePadding } from '$lib/utils/styles';
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';

	let perPage = 10;
	let selectedPage: number = 1;
	let searchValue: string = '';
	let eventsData: any[] = [];
	let totalEvents: number;

	let loading = false;
	let browserLoaded = false;

	// Keeping track of the last state to prevent unnecessary API calls
	let previousPage: number = selectedPage;
	let previousPerPage: number = perPage;
	let previousSearchValue: string = searchValue;

	const updateResults = async () => {
		loading = true;
		window.scrollTo({ top: 0, behavior: 'smooth' });
		try {
			const response = await fetch(`/api/events`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ selectedPage, perPage, searchValue })
			});
			if (response.ok) {
				const data = await response.json();
				eventsData = data.results.show_list;
				totalEvents = data.results.total_shows;
			} else {
				console.error('Error fetching data:', response.statusText);
				toast.error(`Error: ${response.statusText}`, {
					duration: 6000
				});
			}
		} catch (error) {
			console.error('Fetch error:', error);
		} finally {
			loading = false;
		}
	};

	onMount(() => {
		if (browser) {
			browserLoaded = true;
			updateResults();
		}
	});

	// Reactive block to call API only when any of the relevant values change
	$: if (browserLoaded) {
		// Only call the API if the page, perPage, or search value has changed
		if (
			selectedPage !== previousPage ||
			perPage !== previousPerPage ||
			searchValue !== previousSearchValue
		) {
			updateResults();

			// Update the previous values to prevent re-triggering
			previousPage = selectedPage;
			previousPerPage = perPage;
			previousSearchValue = searchValue;
		}
	}
</script>

{#if eventsData.length !== 0}
	<Pagination.Root
		bind:count={totalEvents}
		{perPage}
		bind:page={selectedPage}
		let:pages
		let:currentPage
	>
		<div class="w-full flex-col gap-6 py-6 md:flex md:pt-6 {pagePadding}">
			<div class="flex flex-col gap-2 md:flex-row">
				<SearchBar bind:searchValue />
				<div class="flex flex-row gap-2">
					<FilterPopup
						onApply={() => updateResults()}
						onClear={() => {
							resetAllFilters();
							updateResults();
						}}
					/>
					<SortPopup onApply={() => updateResults()} />
				</div>
			</div>

			<SimpleTable {eventsData} {currentPage} {perPage} />
			<div class="flex w-full flex-col gap-4 py-6 md:hidden">
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
{/if}
{#if loading}
	<div
		transition:fade={{ duration: 200 }}
		class="fixed left-1/2 top-1/2 z-50 flex -translate-x-1/2 -translate-y-1/2 transform items-center justify-center rounded-lg bg-white p-4 shadow-lg"
	>
		<Spinner />
	</div>
{/if}
