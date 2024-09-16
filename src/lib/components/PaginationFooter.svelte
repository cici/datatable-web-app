<script lang="ts">
	import * as Pagination from '$lib/components/ui/pagination';
	import { ChevronLeft, ChevronRight } from 'lucide-svelte';
	import { browser } from '$app/environment';

	export let pages;
	export let currentPage: number | undefined;
	export let selectedPage: number | undefined;

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		});
	};

	const goToFirstPage = () => {
		currentPage = 1;
		selectedPage = 1;
	};
</script>

<Pagination.Content class="pb-16">
	<Pagination.Item>
		<Pagination.PrevButton>
			<ChevronLeft class="h-4 w-4" />
			<span class="">Previous</span>
		</Pagination.PrevButton>
	</Pagination.Item>
	{#each pages as page (page.key)}
		{#if page.type === 'ellipsis'}
			<Pagination.Item>
				<Pagination.Ellipsis />
			</Pagination.Item>
		{:else}
			<Pagination.Item>
				<Pagination.Link {page} isActive={currentPage == page.value}>
					{page.value}
				</Pagination.Link>
			</Pagination.Item>
		{/if}
	{/each}
	<Pagination.Item>
		<Pagination.NextButton>
			<span class="">Next</span>
			<ChevronRight class="h-4 w-4" />
		</Pagination.NextButton>
	</Pagination.Item>
</Pagination.Content>
