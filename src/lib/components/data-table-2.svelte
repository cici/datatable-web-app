<script lang="ts">
	import { data } from '$lib/data/sample';
	import { createTable, Subscribe, Render } from 'svelte-headless-table';
	import { readable } from 'svelte/store';
	import * as Table from '$lib/components/ui/table';
	import * as Accordion from '$lib/components/ui/accordion';

	// Sample data
	const table = createTable(readable(data));

	// Define columns
	const columns = table.createColumns([
		table.column({
			accessor: 'id',
			header: 'ID'
		}),
		table.column({
			accessor: 'status',
			header: 'Status'
		}),
		table.column({
			accessor: 'email',
			header: 'Email'
		}),
		table.column({
			accessor: 'amount',
			header: 'Amount'
		}),
		table.column({
			accessor: ({ id }) => id,
			header: 'Actions'
		})
	]);

	const { headerRows, pageRows, tableAttrs, tableBodyAttrs } = table.createViewModel(columns);
</script>

<!-- Table structure -->
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
				<Accordion.Root>
					<Accordion.Item value={row.id}>
						<Subscribe rowAttrs={row.attrs()} let:rowAttrs>
							<!-- Accordion Trigger (Row is clickable) -->
							<Table.Row {...rowAttrs} class="cursor-pointer">
								{#each row.cells as cell (cell.id)}
									<Subscribe attrs={cell.attrs()} let:attrs>
										<Table.Cell {...attrs}>
											<Accordion.Trigger>
												<Render of={cell.render()} />
											</Accordion.Trigger>
										</Table.Cell>
									</Subscribe>
								{/each}
							</Table.Row>
						</Subscribe>

						<!-- Accordion Content (Expands when row is clicked) -->
						<Accordion.Content class="border-t bg-gray-100 p-4">
							<div class="text-sm text-gray-700">
								<!-- Here you can customize the expanded content. I'm using a list for example -->
								<p><strong>Details for {row.id}:</strong></p>
								<ul class="list-disc pl-6">
									<li>Status: {row.original.status}</li>
									<li>Email: {row.original.email}</li>
									<li>Amount: {row.original.amount}</li>
									<!-- Add more details as per your requirements -->
								</ul>
							</div>
						</Accordion.Content>
					</Accordion.Item>
				</Accordion.Root>
			{/each}
		</Table.Body>
	</Table.Root>
</div>
