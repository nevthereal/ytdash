<script lang="ts">
	import '../app.css';
	import { toast, Toaster } from 'svelte-sonner';

	let { children } = $props();
</script>

<Toaster
	toastOptions={{
		classes: {
			toast:
				'bg-base-200 border border-base-300 rounded-box p-4 right-0 w-96 absolute flex gap-4 items-center',
			title: 'text-base-content',
			description: 'text-base-content',
			actionButton: 'btn btn-xs btn-primary',
			cancelButton: 'btn btn-xs btn-warning',
			closeButton: 'btn btn-xs btn-ghost'
		},
		duration: 1000,
		unstyled: true
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
