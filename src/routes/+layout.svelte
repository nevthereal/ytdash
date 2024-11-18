<script lang="ts">
	import '../app.css';
	import { toast, Toaster } from 'svelte-sonner';

	let { children } = $props();
</script>

<Toaster
	toastOptions={{
		classes: {
			toast: 'bg-base-200 border border-base-300 rounded-box p-4',
			title: 'text-base-content text-lg',
			description: 'text-base-content',
			actionButton: 'btn btn-xs btn-primary',
			cancelButton: 'btn btn-xs btn-warning',
			closeButton: 'btn btn-xs btn-ghost'
		}
	}}
/>

<div class="mx-auto max-w-6xl">
	<nav class="rounded-b-xl bg-base-300 p-8">
		<a href="/" class="text-4xl font-black text-primary">overview</a>
	</nav>
	<main class="my-4">
		{@render children()}
	</main>
</div>
