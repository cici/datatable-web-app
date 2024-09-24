<script lang="ts">
	import { Input } from '$lib/components/ui/input';
	import { Search, Filter } from 'lucide-svelte';
	import FilterPopup from './filter-dialog.svelte';
	import { resetAllFilters } from '$lib/stores/filters';
	import * as Select from '$lib/components/ui/select';
	import { fly } from 'svelte/transition';

	export let searchValue: any;
	export let selectedOption: any;
	export let searchOptions;
	export let updateResults: () => {};
</script>

<div class="relative flex w-full gap-2 rounded-lg md:w-auto md:max-w-xs">
	<div class="relative flex overflow-x-hidden">
		<div class="absolute left-[1.1rem] top-[0.7rem]">
			<Search size={16} />
		</div>
		<Input
			bind:value={searchValue}
			type="text"
			placeholder={`Search a ${selectedOption.label}`}
			class="  h-10  w-full border px-4 pl-10  pr-10 outline-0  !ring-0 focus-visible:ring-0 md:border-2 "
		/>
		{#if searchValue}
			<button
				transition:fly={{ x: 30 }}
				on:click={() => {
					updateResults();
				}}
				class="absolute right-1.5 top-1.5 h-7 rounded-sm bg-primary px-2 py-1 text-xs text-white hover:bg-primary/90"
				>Search</button
			>
		{/if}
	</div>
	<Select.Root bind:selected={selectedOption}>
		<Select.Trigger class="w-[110px]  border md:border-2">
			<Select.Value placeholder="Theme" />
		</Select.Trigger>
		<Select.Content>
			{#each searchOptions as option, i}
				<Select.Item value={option.value}>{option.label}</Select.Item>
			{/each}
		</Select.Content>
	</Select.Root>
</div>
