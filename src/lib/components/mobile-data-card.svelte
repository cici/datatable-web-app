<script lang="ts">
	import type { Event, Song } from '$lib/data/new-data';
	import * as Sheet from '$lib/components/ui/sheet';
	import SongItem from './song-item.svelte';

	export let event: Event;

	const statusColors = {
		'On track': 'bg-green-100 text-green-800',
		'On hold': 'bg-yellow-100 text-yellow-800',
		'At risk': 'bg-red-100 text-red-800'
	};
</script>

<Sheet.Root>
	<Sheet.Trigger class="w-full"
		><div class="flex flex-col gap-6 rounded-2xl border-2 p-6">
			<h1 class="text-left text-lg font-bold">{event.venue_name}</h1>
			<div class="flex w-full flex-col gap-2">
				<div class="flex w-full justify-between">
					<p class="text-muted-foreground">City</p>
					<p>{event.city_name}</p>
				</div>
				<div class="flex w-full justify-between">
					<p class="text-muted-foreground">State</p>
					<p>{event.state}</p>
				</div>
				<div class="flex w-full justify-between">
					<p class="text-muted-foreground">Date</p>
					<p>{event.event_date}</p>
				</div>
				<div class="flex w-full justify-between">
					<p class="text-muted-foreground">Number of Songs</p>
					{event.songs.length}
				</div>
			</div>
		</div></Sheet.Trigger
	>
	<Sheet.Content class="min-w-[90vw]">
		<Sheet.Header class="pb-8">
			<Sheet.Title class="text-left text-lg font-bold">Songs List</Sheet.Title>
		</Sheet.Header>
		<ul class="space-y-2">
			{#each event.songs as song, i}
				{@const isLast = i + 1 == event.songs.length ? true : false}
				<SongItem {song} index={i} {isLast} />
			{/each}
		</ul>
	</Sheet.Content>
</Sheet.Root>
