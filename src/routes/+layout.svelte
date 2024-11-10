<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<div class="mx-auto max-w-6xl">
	<nav class="bg-base-300 rounded-b-xl p-8">
		<a href="/" class="text-primary text-4xl font-black">home</a>
	</nav>
	<main class="my-4">
		{@render children()}
	</main>
</div>
