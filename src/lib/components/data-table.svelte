<script lang="ts">
	import { createTable, Subscribe, Render } from 'svelte-headless-table';
	import { readable } from 'svelte/store';
	import * as Table from '$lib/components/ui/table';
	import { slide } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import { data } from '$lib/data/sample';
	import Arrow from '$lib/assets/icons/Arrow.svelte';
	import SongItem from './song-item.svelte';
	import { addPagination } from 'svelte-headless-table/plugins';
	import { Button } from '$lib/components/ui/button';
	const table = createTable(readable(data), {
		page: addPagination({ initialPageSize: 5 })
	});

	const columns = table.createColumns([
		table.column({
			accessor: 'id',
			header: '',
			cell: ({ row }) => {
				// @ts-ignore
				return row.original.id;
			}
		}),
		table.column({
			accessor: 'index',
			header: '#',
			cell: ({ row }) => {
				// @ts-ignore
				return row.original.index;
			}
		}),
		table.column({
			accessor: 'venueName',
			header: 'Venue Name',
			cell: ({ row }) => {
				// @ts-ignore
				return `<a href="${row.original.venueLink}" class="text-blue-600 whitespace-nowrap">${row.original.venueName}</a>`;
			}
		}),
		table.column({
			accessor: 'projectManager',
			header: 'PM',
			cell: ({ row }) => {
				// @ts-ignore
				return `<img src="https://api.dicebear.com/9.x/initials/svg?backgroundColor=b6e3f4,c0aede,d1d4f9&scale=90&seed=${row.original.projectManager.name}" alt="${row.original.projectManager.name}" class="w-6 h-6 rounded-md" />`;
			}
		}),
		table.column({
			accessor: 'status',
			header: 'Status',
			cell: ({ row }) => {
				// @ts-ignore
				const statusColors = {
					'On track': 'bg-green-100 text-green-800',
					'On hold': 'bg-yellow-100 text-yellow-800',
					'At risk': 'bg-red-100 text-red-800'
				};
				// @ts-ignore
				return `<span class="px-2 py-1 rounded-full whitespace-nowrap text-xs font-semibold ${statusColors[row.original.status]}">${row.original.status}</span>`;
			}
		}),
		table.column({
			accessor: 'showDate',
			header: 'Show Date',
			cell: ({ row }) => {
				// @ts-ignore
				const date = new Date(row.original.showDate);
				return date.toLocaleDateString('en-US', {
					day: 'numeric',
					month: 'short',
					year: 'numeric'
				});
			}
		}),
		table.column({
			accessor: 'numberOfSongs',
			header: 'Number of Songs',
			cell: ({ row }) => {
				// @ts-ignore
				return `<div class="text-center">
      <span class="px-2 py-1 rounded-md text-sm font-semibold bg-muted text-muted-foreground">
        ${row.original.numberOfSongs}
      </span>
    </div>`;
			}
		})
	]);

	const { headerRows, pageRows, tableAttrs, tableBodyAttrs, pluginStates } =
		table.createViewModel(columns);

	const { hasNextPage, hasPreviousPage, pageIndex, pageCount } = pluginStates.page;

	// Variable to track the expanded row
	let expandedRow: string | null = null;

	// Function to toggle row expansion
	function toggleRow(id: string) {
		if (expandedRow === id) {
			expandedRow = null; // Collapse if the same row is clicked
		} else {
			expandedRow = id; // Expand the new row
		}
	}

	// Number of columns for colspan
	const numColumns = columns.length;
</script>

<div class="rounded-lg border">
	<Table.Root {...$tableAttrs}>
		<Table.Header>
			{#each $headerRows as headerRow}
				<Subscribe rowAttrs={headerRow.attrs()}>
					<Table.Row>
						{#each headerRow.cells as cell (cell.id)}
							<Subscribe attrs={cell.attrs()} let:attrs props={cell.props()}>
								<Table.Head
									{...attrs}
									class=" whitespace-nowrap {cell.id === 'numberOfSongs' ? 'text-center' : ''}"
								>
									<Render of={cell.render()} />
								</Table.Head>
							</Subscribe>
						{/each}
					</Table.Row>
				</Subscribe>
			{/each}
		</Table.Header>
		<Table.Body {...$tableBodyAttrs}>
			{#each $pageRows as row (row.id)}
				<!-- @ts-ignore -->
				<Subscribe rowAttrs={row.attrs()} let:rowAttrs>
					<!-- Main Row -->
					<!-- @ts-ignore -->
					<Table.Row
						{...rowAttrs}
						on:click={() => toggleRow(row.original.id)}
						class="table-row cursor-pointer"
					>
						{#each row.cells as cell (cell.id)}
							<Subscribe attrs={cell.attrs()} let:attrs>
								<Table.Cell class="py-2.5" {...attrs}>
									{#if cell.id === 'id'}
										<Arrow
											size={16}
											class="{expandedRow === row.original.id
												? 'rotate-90'
												: ''} transform transition-transform duration-300"
										/>
									{:else}
										{@html cell.render()}
									{/if}
								</Table.Cell>
							</Subscribe>
						{/each}
					</Table.Row>

					{#if expandedRow === row.original.id}
						<Table.Row>
							<Table.Cell colspan={numColumns} class="p-0">
								<div transition:slide={{ duration: 300, easing: cubicOut }} class="bg-muted p-4">
									<ul class="space-y-2">
										{#each row.original.songs as song, i}
											{@const isLast = i + 1 == row.original.songs.length ? true : false}
											<SongItem {song} index={i} {isLast} />
										{/each}
									</ul>
								</div>
							</Table.Cell>
						</Table.Row>
					{/if}
				</Subscribe>
			{/each}
		</Table.Body>
	</Table.Root>
</div>
<div class="flex items-center justify-between py-4">
	<div class="text-sm opacity-30">
		Page {$pageIndex + 1} of {$pageCount}
	</div>
	<div class="flex items-center justify-end space-x-4 py-4">
		<Button
			variant="outline"
			size="sm"
			on:click={() => ($pageIndex = $pageIndex - 1)}
			disabled={!$hasPreviousPage}>Previous</Button
		>
		<Button
			variant="outline"
			size="sm"
			disabled={!$hasNextPage}
			on:click={() => ($pageIndex = $pageIndex + 1)}>Next</Button
		>
	</div>
</div>

<style>
	/* Add any custom styles here */
	.table-row:hover {
		background-color: #fcfcfc;
	}
	.tag {
		background-color: #e5e7eb;
		color: #374151;
		font-size: 0.75rem;
		padding: 0.25rem 0.5rem;
		border-radius: 9999px;
		margin-right: 0.5rem;
	}
</style>
