<script lang="ts">
	import * as Select from '$lib/components/ui/select';

	export let perPage: number;

	const perPageOptions = [
		{ value: 10, label: '10' },
		{ value: 25, label: '25' },
		{ value: 50, label: '50' }
	];

	const setPerPage = (selected: any) => {
		perPage = selected?.value as number;
	};
</script>

<div class="flex h-fit items-center gap-2">
	<p class="text-sm text-muted-foreground">Results per page</p>
	<Select.Root
		selected={perPageOptions[0]}
		onSelectedChange={(selected) => {
			setPerPage(selected);
		}}
	>
		<Select.Trigger class="w-[72px]">
			<Select.Value placeholder="10" />
		</Select.Trigger>
		<Select.Content>
			{#each perPageOptions as option}
				<Select.Item value={option.value}>{option.label}</Select.Item>
			{/each}
		</Select.Content>
	</Select.Root>
</div>
