<script>
	import Navbar from '$lib/components/layout/navbar.svelte';
	import { Toaster } from '$lib/components/ui/sonner';
	import '../app.css';
</script>

<Toaster richColors theme="light" />
<Navbar />
<slot></slot>
