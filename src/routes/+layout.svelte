<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

<nav class="p-8">
	<a href="/" class="text-5xl font-black italic">YouKan</a>
</nav>
<main class="no-scrollbar px-8">
	{@render children()}
</main>
