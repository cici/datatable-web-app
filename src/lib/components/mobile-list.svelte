<script>
	import { data } from '$lib/data/sample';
	import MobileDataCard from './mobile-data-card.svelte';
</script>

<div class="flex w-full flex-col gap-6 md:hidden">
	{#each data as venue, i}
		<MobileDataCard {venue} />
	{/each}
</div>
