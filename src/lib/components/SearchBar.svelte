<script lang="ts">
	import { Input } from '$lib/components/ui/input';
	import { Search } from 'lucide-svelte';
</script>

<div class="relative flex w-full md:w-auto md:max-w-xs">
	<div class="absolute left-[1.1rem] top-[0.7rem]">
		<Search size={16} />
	</div>
	<Input
		type="text"
		placeholder="Search"
		class="h-10 w-full rounded-lg border-2 px-4 pl-10 focus-visible:ring-1 "
	/>
</div>
