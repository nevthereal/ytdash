<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<div class="mx-auto max-w-6xl">
	<nav class="rounded-b-xl bg-base-300 p-8">
		<a href="/" class="text-4xl font-black text-primary">overview</a>
	</nav>
	<main class="my-4">
		{@render children()}
	</main>
</div>
