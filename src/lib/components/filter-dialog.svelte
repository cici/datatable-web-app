<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import { Search, Filter, Check } from 'lucide-svelte';
	import * as Accordion from '$lib/components/ui/accordion';
	import { songsCount, resetAllFilters, states } from '$lib/stores/filters';
	import { selectedFiltersCount } from '$lib/stores/filtersCount';

	let dialogOpen: boolean;

	export let onApply: Function;
	export let onClear: Function;

	let filterCount: number = 0;
	$: filterCount = $selectedFiltersCount;
</script>

<Dialog.Root bind:open={dialogOpen}>
	<Dialog.Trigger
		><button
			type="button"
			class="inline-flex h-10 w-fit items-center justify-center gap-1 whitespace-nowrap rounded-lg border border-input px-4 py-2 text-xs font-medium text-black hover:bg-muted md:border-2"
		>
			<Filter size={16} /> Filters
			{#if filterCount > 0}
				<p
					class="ml-1 rounded-sm bg-primary p-[0.2rem] px-2 text-xs font-bold text-primary-foreground"
				>
					{filterCount}
				</p>
			{/if}
		</button>
	</Dialog.Trigger>
	<Dialog.Content class="max-w-54  max-h-[95vh] w-[98vw] max-w-xl">
		<Dialog.Header>
			<Dialog.Title class="hstack items-center gap-2">Filter Search</Dialog.Title>
		</Dialog.Header>
		<div class="vstack h-full overflow-y-auto overflow-x-hidden pr-4">
			<Accordion.Root>
				<Accordion.Item value="item-1">
					<Accordion.Trigger>States</Accordion.Trigger>
					<Accordion.Content
						><div class="flex max-h-48 w-full flex-row flex-wrap gap-2 overflow-y-auto">
							{#each $states as state}
								<div class="flex">
									<input
										type="checkbox"
										bind:checked={state.selected}
										id={state.name}
										class="peer hidden"
									/>
									<label
										for={state.name}
										class="cursor-pointer select-none rounded-lg border border-gray-400
					 px-4 py-2 font-bold text-gray-400 transition-colors duration-200 ease-in-out peer-checked:border-gray-200 peer-checked:bg-gray-200 peer-checked:text-gray-900"
									>
										{state.name}
									</label>
								</div>
							{/each}
						</div></Accordion.Content
					>
				</Accordion.Item>
				<Accordion.Item value="item-7">
					<Accordion.Trigger>Number of Songs</Accordion.Trigger>
					<Accordion.Content
						><div class="flex max-h-48 w-full flex-row flex-wrap gap-2 overflow-y-auto">
							{#each $songsCount as count}
								<div class="flex">
									<input
										type="checkbox"
										bind:checked={count.selected}
										id={count.label}
										class="peer hidden"
									/>
									<label
										for={count.label}
										class="cursor-pointer select-none rounded-lg border border-gray-400
					 px-4 py-2 font-bold text-gray-400 transition-colors duration-200 ease-in-out peer-checked:border-gray-200 peer-checked:bg-gray-200 peer-checked:text-gray-900"
									>
										{count.label}
									</label>
								</div>
							{/each}
						</div></Accordion.Content
					>
				</Accordion.Item>
			</Accordion.Root>
		</div>
		<Dialog.Footer>
			<div class="flex flex-row gap-3">
				<button
					class="h-fit w-fit rounded-md bg-gray-200 px-3 py-1.5 font-semibold text-gray-700 hover:bg-gray-300"
					on:click={() => {
						onClear();
						dialogOpen = false;
					}}>Clear All</button
				>
				<button
					class=" h-fit rounded-md bg-primary px-3 py-1.5 font-semibold text-white hover:bg-primary/80"
					on:click={() => {
						onApply();
						dialogOpen = false;
					}}>Apply Filters</button
				>
			</div>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
