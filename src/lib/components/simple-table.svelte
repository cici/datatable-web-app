<script lang="ts">
	import * as Table from '$lib/components/ui/table';
	import Arrow from '$lib/assets/icons/Arrow.svelte';
	import { fly, slide } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import SongItem from './song-item.svelte';
	import type { Event } from '$lib/data/new-data';
	import { Calendar } from 'lucide-svelte';

	let expandedRow: string | null = null;

	export let eventsData: Event[];
	export let currentPage: number | undefined;
	export let perPage: number | undefined;

	function toggleRow(id: string) {
		if (expandedRow === id) {
			expandedRow = null;
		} else {
			expandedRow = id;
		}
	}
</script>

<div class="relative hidden w-full rounded-lg border md:flex">
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
				<Table.Row
					on:click={() => toggleRow(event.artist_show_id)}
					class="cursor-pointer {i % 2 == 0 ? 'bg-purple-100 hover:bg-purple-200' : ''}"
				>
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
					<Table.Cell class="">{event.venue?.venue_name || 'N/A'}</Table.Cell>
					<Table.Cell>{event.venue?.city?.city_name || 'N/A'}</Table.Cell>
					<Table.Cell>{event.venue?.city?.state || 'N/A'}</Table.Cell>
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
							{event.songs ? event.songs.length : '-'}
							</span>
						</div></Table.Cell
					>
				</Table.Row>

			{#if expandedRow === event.artist_show_id && event.songs && event.songs.length !== 0}
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
