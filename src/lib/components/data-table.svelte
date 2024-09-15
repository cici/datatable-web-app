<script lang="ts">
	import { createTable, Subscribe, Render } from 'svelte-headless-table';
	import { readable } from 'svelte/store';
	import * as Table from '$lib/components/ui/table';
	import { slide } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import { data } from '$lib/data/sample';

	const table = createTable(readable(data));

	const columns = table.createColumns([
		table.column({
			accessor: 'index',
			header: '#',
			cell: ({ row }) => {
				return expandedRow === row.original.id
					? '▼ ' + row.original.index
					: '▶ ' + row.original.index;
			}
		}),
		table.column({
			accessor: 'venueName',
			header: 'Venue Name',
			cell: ({ row }) => {
				return `<a href="${row.original.venueLink}" class="text-blue-600 hover:underline">${row.original.venueName}</a>`;
			}
		}),
		table.column({
			accessor: 'projectManager',
			header: 'PM',
			cell: ({ row }) => {
				return `<img src="${row.original.projectManager.avatar}" alt="${row.original.projectManager.name}" class="w-8 h-8 rounded-full" />`;
			}
		}),
		table.column({
			accessor: 'status',
			header: 'Status',
			cell: ({ row }) => {
				const statusColors = {
					'On track': 'bg-green-100 text-green-800',
					'On hold': 'bg-yellow-100 text-yellow-800',
					'At risk': 'bg-red-100 text-red-800'
				};
				return `<span class="px-2 py-1 rounded-full text-xs font-semibold ${statusColors[row.original.status]}">${row.original.status}</span>`;
			}
		}),
		table.column({
			accessor: 'showDate',
			header: 'Show Date',
			cell: ({ row }) => {
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
			header: 'Number of Songs'
		})
	]);

	const { headerRows, pageRows, tableAttrs, tableBodyAttrs } = table.createViewModel(columns);

	// Variable to track the expanded row
	let expandedRow: number | null = null;

	// Function to toggle row expansion
	function toggleRow(id: number) {
		if (expandedRow === id) {
			expandedRow = null; // Collapse if the same row is clicked
		} else {
			expandedRow = id; // Expand the new row
		}
	}

	// Number of columns for colspan
	const numColumns = columns.length;
</script>

<div class="rounded-md border">
	<Table.Root {...$tableAttrs}>
		<Table.Header>
			{#each $headerRows as headerRow}
				<Subscribe rowAttrs={headerRow.attrs()}>
					<Table.Row>
						{#each headerRow.cells as cell (cell.id)}
							<Subscribe attrs={cell.attrs()} let:attrs props={cell.props()}>
								<Table.Head {...attrs}>
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
				<Subscribe rowAttrs={row.attrs()} let:rowAttrs>
					<!-- Main Row -->
					<Table.Row
						{...rowAttrs}
						on:click={() => toggleRow(row.original.id)}
						class="table-row cursor-pointer"
					>
						{#each row.cells as cell (cell.id)}
							<Subscribe attrs={cell.attrs()} let:attrs>
								<Table.Cell {...attrs}>
									{@html cell.render()}
								</Table.Cell>
							</Subscribe>
						{/each}
					</Table.Row>

					<!-- Expanded Content Row -->
					{#if expandedRow === row.original.id}
						<Table.Row>
							<Table.Cell colspan={numColumns} class="p-0">
								<div
									transition:slide={{ duration: 300, easing: cubicOut }}
									class="expanded-content"
								>
									<!-- Song Timeline -->
									<div class="p-4">
										<h3 class="mb-2 text-lg font-bold">Song Timeline</h3>
										<ul class="space-y-4">
											{#each row.original.songs as song}
												<li class="border-b pb-2">
													<div class="flex items-center justify-between">
														<span class="font-medium">{song.title}</span>
														<div class="flex">
															{#each song.tags as tag}
																<span class="tag">{tag}</span>
															{/each}
														</div>
													</div>
													{#if song.note}
														<p class="mt-1 text-sm text-gray-600">{song.note}</p>
													{/if}
												</li>
											{/each}
										</ul>
									</div>
								</div>
							</Table.Cell>
						</Table.Row>
					{/if}
				</Subscribe>
			{/each}
		</Table.Body>
	</Table.Root>
</div>

<style>
	/* Add any custom styles here */
	.table-row:hover {
		background-color: #f9fafb;
	}
	.expanded-content {
		background-color: #f3f4f6;
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
