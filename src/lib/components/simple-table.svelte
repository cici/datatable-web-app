<script lang="ts">
	import * as Table from '$lib/components/ui/table';
	import Arrow from '$lib/assets/icons/Arrow.svelte';
	import { fly, slide } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import SongItem from './song-item.svelte';
	import type { Event } from '$lib/data/new-data';
	import { Calendar } from 'lucide-svelte';

	// Variable to track the expanded row
	let expandedRow: string | null = null;

	export let eventsData: Event[];
	export let currentPage: number | undefined;
	export let perPage: number | undefined;

	// Function to toggle row expansion
	function toggleRow(id: string) {
		if (expandedRow === id) {
			expandedRow = null; // Collapse if the same row is clicked
		} else {
			expandedRow = id; // Expand the new row
		}
	}
</script>

<div class="relative hidden w-full max-w-6xl rounded-lg border md:flex">
	<Table.Root>
		<Table.Header>
			<Table.Row class="sticky top-0">
				<Table.Head class="w-4 px-0"></Table.Head>
				<Table.Head class="w-4">#</Table.Head>
				<Table.Head>Venue Name</Table.Head>
				<Table.Head>City</Table.Head>
				<Table.Head>State</Table.Head>
				<Table.Head>Show Date</Table.Head>
				<Table.Head class="text-center">Number of Songs</Table.Head>
			</Table.Row>
		</Table.Header>
		<Table.Body>
			{#each eventsData as event, i}
				<Table.Row on:click={() => toggleRow(event.artist_show_id)} class="cursor-pointer">
					<Table.Cell>
						<Arrow
							size={16}
							class="{expandedRow === event.artist_show_id
								? 'rotate-90'
								: ''} transform transition-transform duration-300"
						/>
					</Table.Cell>
					<Table.Cell class="flex items-center justify-center px-0"
						>{(currentPage - 1) * perPage + i + 1}</Table.Cell
					>
					<Table.Cell class="">{event.venue_name}</Table.Cell>
					<Table.Cell>{event.city_name}</Table.Cell>
					<Table.Cell>{event.state}</Table.Cell>
					<Table.Cell class="flex flex-row items-center gap-1.5"
						><Calendar size={16} class="pb-0.5 opacity-80" />
						{new Date(event.event_date).toLocaleDateString('en-US', {
							day: 'numeric',
							month: 'short',
							year: 'numeric'
						})}</Table.Cell
					>
					<Table.Cell
						><div class="text-center">
							<span
								class="rounded-md border bg-muted px-2 py-1 text-sm font-semibold text-muted-foreground"
							>
								{event.song_list ? event.song_list.length : '-'}
							</span>
						</div></Table.Cell
					>
				</Table.Row>

				{#if expandedRow === event.artist_show_id && event.song_list}
					<Table.Row>
						<Table.Cell colspan={7} class="p-0">
							<div transition:slide={{ duration: 300, easing: cubicOut }} class="bg-muted p-4">
								<ul class="space-y-2">
									{#each event.song_list as song, i}
										{@const isLast = i + 1 === event.song_list.length}
										<SongItem {song} index={i} {isLast} />
									{/each}
								</ul>
							</div>
						</Table.Cell>
					</Table.Row>
				{/if}
			{/each}
		</Table.Body>
	</Table.Root>
</div>

<style>
	.rotate-90 {
		transform: rotate(90deg);
	}
</style>
