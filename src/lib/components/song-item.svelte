<script lang="ts">
	import type { Song } from '$lib/data/new-data';
	import SongItemTags from './song-item-tags.svelte';

	export let song: Song;
	export let index: number;
	export let isLast: boolean = false;
</script>

<li class="flex h-fit max-w-[30rem] gap-4">
	<div class="grow-1 flex flex-col items-center gap-2">
		<div class="flex h-6 w-6 items-center justify-center rounded-full bg-purple-200 text-xs">
			{index + 1}
		</div>
		{#if !isLast}
			<div class="min-h-5 w-[1px] grow bg-muted-foreground/50" />
		{/if}
	</div>
	<div class="flex w-full flex-row justify-between">
		<div class="flex flex-col gap-1 pb-4">
			<span class=" font-bold">{song.song_name}</span>

			<div class="flex flex-wrap gap-1 md:hidden">
				<SongItemTags {song} />
			</div>

			<!-- {#if song.note}
				<p class=" text-sm text-gray-600">{song.note}</p>
			{/if} -->
		</div>
		<div class="hidden h-6 md:flex">
			<SongItemTags {song} />
		</div>
	</div>
</li>

<style>
	.tag {
		background-color: #e5e7eb;
		color: #374151;
		font-size: 0.75rem;
		border-radius: 9999px;
		margin-right: 0.5rem;
	}
</style>
