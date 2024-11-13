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

	const searchOptions = [
		{
			label: 'Song',
			value: 'song'
		},
		{
			label: 'Venue',
			value: 'venue'
		},
		{
			label: 'City',
			value: 'city'
		}
	];

	let perPage = 10;
	let selectedPage: number = 1;
	let searchType = searchOptions[0];
	let searchValue: string = '';
	let eventsData: any[] = [];
	let totalEvents: number;

	let loading = true;
	let browserLoaded = false;

	// Keeping track of the last state to prevent unnecessary API calls
	let previousPage: number = selectedPage;
	let previousPerPage: number = perPage;
	let previousSearchValue: string = searchValue;

	const updateResults = async () => {
		loading = true;
		window.scrollTo({ top: 0, behavior: 'smooth' });
		try {
			let response;
			if (searchValue && searchType) {
				console.log('HERE');
				response = await fetch(`/api/search-events`, {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ selectedPage, perPage, searchValue, searchType: searchType.value })
				});
			} else {
				console.log('GET');
				response = await fetch(`/api/get-events`, {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ selectedPage, perPage })
				});
			}
			if (response.ok) {
				const data = await response.json();
				eventsData = data.results.show_list;
				totalEvents = data.results.show_list[0].full_count;
				console.log(eventsData);
			} else {
				console.error('Error fetching data:', response);
				let msg = response.statusText;
				if (response.status == 500) {
					msg = 'Unable to connect to database';
				}
				console.log(msg);
				toast.error(`Error: ${msg}`, {
					duration: 8000
				});
			}
		} catch (error) {
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
		if (selectedPage !== previousPage || perPage !== previousPerPage) {
			updateResults();

			previousPage = selectedPage;
			previousPerPage = perPage;
		}
	}
</script>

<Pagination.Root
	bind:count={totalEvents}
	{perPage}
	bind:page={selectedPage}
	let:pages
	let:currentPage
>
	<div class="w-full flex-col gap-6 py-6 md:flex md:pt-6 {pagePadding}">
		<div class="flex flex-col gap-2 md:flex-row">
			<SearchBar
				{updateResults}
				bind:searchValue
				bind:selectedOption={searchType}
				{searchOptions}
			/>
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
		{#if eventsData.length !== 0}
			<SimpleTable {eventsData} {currentPage} {perPage} />
			<div class="flex w-full flex-col gap-4 py-6 md:hidden">
				{#each eventsData as event, i}
					<MobileDataCard {event} />
				{/each}
			</div>
		{:else if loading}
			<Spinner />
		{:else}
			<div class="flex w-full flex-col items-center">
				<h1 class="mb-4 mt-16 w-full text-center text-2xl font-bold">No Results Found</h1>
				<button
					on:click={() => {
						searchValue = '';
						updateResults();
					}}
					class="mx-auto w-fit rounded-md bg-primary px-3 py-2 text-primary-foreground"
					>Go Back</button
				>
			</div>
		{/if}
	</div>
	{#if eventsData.length !== 0}
		<div
			class="flex w-full flex-col items-center justify-between gap-4 pb-16 md:flex-row {pagePadding}"
		>
			<ItemsPerPage bind:perPage />
			<PaginationFooter {pages} {currentPage} bind:selectedPage />
		</div>
	{/if}
</Pagination.Root>
{#if loading}
	<Spinner />
{/if}
