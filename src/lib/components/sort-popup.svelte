<script lang="ts">
	// import DownArrow from './icons/DownArrow.svelte';
	import * as Popover from '$lib/components/ui/popover';
	import type { Selected } from 'bits-ui';
	import { selectedSorting, sortingOptions } from '$lib/stores/sorting';
	import { ArrowDown, Check } from 'lucide-svelte';

	export let onApply: Function = () => {};

	export let open = false;

	function updateSorting(index: number) {
		selectedSorting.set(index);
	}
</script>

<Popover.Root bind:open>
	<Popover.Trigger>
		<button
			class=" 
				  inline-flex w-fit max-w-36 items-center justify-center gap-1 whitespace-nowrap rounded-md border-2 border-input px-4 py-2 text-sm font-medium"
		>
			Sort
			<ArrowDown size={16} />
		</button>
	</Popover.Trigger>

	<Popover.Content class="flex w-fit flex-col gap-2">
		<div class="flex w-fit flex-col">
			{#each sortingOptions as option, i}
				<div class="relative flex flex-row items-center pl-5">
					<div class="{$selectedSorting == i ? '' : 'hidden'} absolute left-1 top-2">
						<Check size={16} />
					</div>
					<button on:click={() => updateSorting(i)} class=" w-full p-2 py-1 text-left"
						>{option.label}</button
					>
				</div>
			{/each}
		</div>
		<hr class="border-gray-200" />
		<div class="flex w-full flex-row justify-end gap-2 text-sm">
			<button
				class="h-fit w-fit rounded-md bg-gray-200 px-3 py-1.5 font-semibold text-gray-700 hover:bg-gray-300"
				on:click={() => {
					selectedSorting.set(0);
					open = false;
				}}>Clear</button
			>
			<button
				class="h-fit rounded-md bg-primary px-3 py-1.5 font-semibold text-white hover:bg-primary/80"
				on:click={() => {
					onApply();
					open = false;
				}}>Apply Filters</button
			>
		</div>
	</Popover.Content>
</Popover.Root>
