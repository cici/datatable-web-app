<script lang="ts">
	import type { Song } from '$lib/data/new-data';
	import { Badge } from '$lib/components/ui/badge';

	export let song: Song;
</script>

<div class="flex flex-row flex-wrap gap-2 md:flex-nowrap">
	{#if song.encore}
		<Badge variant="outline" class="border-violet-300 bg-violet-200">Encore</Badge>
	{/if}
	{#if song.artist_name}
		<Badge variant="outline" class="border-green-300 bg-green-200">Cover: {song.artist_name}</Badge>
	{/if}
</div>
