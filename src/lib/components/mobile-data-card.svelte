<script lang="ts">
	import type { Venue, Song } from '$lib/data/sample';
	import * as Sheet from '$lib/components/ui/sheet';
	import SongItem from './song-item.svelte';

	export let venue: Venue;
	export let songs: Song[] = [];

	const statusColors = {
		'On track': 'bg-green-100 text-green-800',
		'On hold': 'bg-yellow-100 text-yellow-800',
		'At risk': 'bg-red-100 text-red-800'
	};
</script>

<Sheet.Root>
	<Sheet.Trigger
		><div class="flex flex-col gap-6 rounded-2xl border-2 p-6">
			<h1 class="text-left text-lg font-bold">{venue.venueName}</h1>
			<div class="flex w-full flex-col gap-4">
				<div class="flex w-full justify-between">
					<p>Status</p>
					<span
						class="whitespace-nowrap rounded-full px-2 py-1 text-xs font-semibold {statusColors[
							venue.status
						]}">{venue.status}</span
					>
				</div>
				<div class="flex w-full justify-between">
					<p>Date</p>
					<p>{venue.showDate}</p>
				</div>
				<div class="flex w-full justify-between">
					<p>Number of Songs</p>
					{venue.numberOfSongs}
				</div>
			</div>
		</div></Sheet.Trigger
	>
	<Sheet.Content class="min-w-[90vw]">
		<Sheet.Header class="pb-8">
			<Sheet.Title class="text-left text-lg font-bold">Songs List</Sheet.Title>
		</Sheet.Header>
		<ul class="space-y-2">
			{#each venue.songs as song, i}
				{@const isLast = i + 1 == venue.songs.length ? true : false}
				<SongItem {song} index={i} {isLast} />
			{/each}
		</ul>
	</Sheet.Content>
</Sheet.Root>
