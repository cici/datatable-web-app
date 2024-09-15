<script lang="ts">
	import type { Song } from '$lib/data/sample';

	export let song: Song;
	export let index: number;
	export let isLast: boolean = false;
</script>

<li class="flex h-fit max-w-lg gap-4">
	<div class="grow-1 flex flex-col items-center gap-2">
		<div class="flex h-6 w-6 items-center justify-center rounded-full bg-red-200 text-xs">
			{index + 1}
		</div>
		{#if !isLast}
			<div class="min-h-5 w-[1px] grow bg-muted-foreground/50" />
		{/if}
	</div>
	<div class="flex w-full flex-row justify-between">
		<div class="flex flex-col gap-1">
			<span class="text-lg font-semibold">{song.title}</span>
			{#if song.note}
				<p class="pb-4 text-sm text-gray-600">{song.note}</p>
			{/if}
		</div>
		<div class="flex">
			{#each song.tags as tag}
				<span class="tag h-fit px-3 py-1">{tag}</span>
			{/each}
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
