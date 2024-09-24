<script>
	import { fade } from 'svelte/transition';

	export let size = '40px'; // You can pass the size as a prop
</script>

<div
	transition:fade={{ duration: 200 }}
	class="fixed left-1/2 top-1/2 z-50 flex -translate-x-1/2 -translate-y-1/2 transform items-center justify-center rounded-lg bg-white p-4 shadow-lg"
>
	<div class="spinner border-muted" style="--size: {size}; }"></div>
</div>

<style>
	.spinner {
		border: 4px solid rgba(0, 0, 0, 0.1); /* Light gray border */
		border-top-color: var(--color); /* The color of the spinner */
		border-radius: 50%;
		width: var(--size);
		height: var(--size);
		animation: spin 1s linear infinite;
	}

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
</style>
