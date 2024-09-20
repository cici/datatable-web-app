<script>
	export let size = '40px'; // You can pass the size as a prop
</script>

<div class="spinner border-muted" style="--size: {size}; }"></div>

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
