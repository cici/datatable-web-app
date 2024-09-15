<script lang="ts">
	import DataTable from '$lib/components/data-table.svelte';
	import MobileList from '$lib/components/mobile-list.svelte';
</script>

<div class="mx-4 hidden w-[95vw] flex-col py-6 md:mx-10 md:flex md:py-16">
	<DataTable />
</div>
<div class="mx-4 w-[95vw] flex-col py-6 md:mx-10 md:flex md:hidden md:py-16">
	<MobileList />
</div>
