<script lang="ts">
	import * as Table from '$lib/components/ui/table';
	import Arrow from '$lib/assets/icons/Arrow.svelte';
	import { slide } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import SongItem from './song-item.svelte';
	import type { Event } from '$lib/data/new-data';

	// Variable to track the expanded row
	let expandedRow: number | null = null;

	export let eventsData: Event[];

	// Function to toggle row expansion
	function toggleRow(id: number) {
		if (expandedRow === id) {
			expandedRow = null; // Collapse if the same row is clicked
		} else {
			expandedRow = id; // Expand the new row
		}
	}
</script>

<div class="max-w-6xl rounded-lg border">
	<Table.Root>
		<Table.Header>
			<Table.Row>
				<Table.Head class="w-4 px-0"></Table.Head>
				<Table.Head>#</Table.Head>
				<Table.Head>Venue Name</Table.Head>
				<Table.Head>City</Table.Head>
				<Table.Head>State</Table.Head>
				<Table.Head>Show Date</Table.Head>
				<Table.Head class="text-center">Number of Songs</Table.Head>
			</Table.Row>
		</Table.Header>
		<Table.Body>
			{#each eventsData as event, i}
				<Table.Row on:click={() => toggleRow(event.event_id)} class="cursor-pointer">
					<Table.Cell>
						<Arrow
							size={16}
							class="{expandedRow === event.event_id
								? 'rotate-90'
								: ''} transform transition-transform duration-300"
						/>
					</Table.Cell>
					<Table.Cell>{i + 1}</Table.Cell>
					<Table.Cell>{event.venue_name}</Table.Cell>
					<Table.Cell>{event.city_name}</Table.Cell>
					<Table.Cell>{event.state}</Table.Cell>
					<Table.Cell>{new Date(event.event_date).toLocaleDateString('en-US')}</Table.Cell>
					<Table.Cell
						><div class="text-center">
							<span
								class="rounded-md border bg-muted px-2 py-1 text-sm font-semibold text-muted-foreground"
							>
								{event.songs.length}
							</span>
						</div></Table.Cell
					>
				</Table.Row>

				{#if expandedRow === event.event_id}
					<Table.Row>
						<Table.Cell colspan={7} class="p-0">
							<div transition:slide={{ duration: 300, easing: cubicOut }} class="bg-muted p-4">
								<ul class="space-y-2">
									{#each event.songs as song, i}
										{@const isLast = i + 1 === event.songs.length}
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
