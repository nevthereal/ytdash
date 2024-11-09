<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<div class="mx-auto max-w-6xl">
	<nav class="my-4">
		<a href="/" class="text-4xl font-bold">overview</a>
	</nav>
	{@render children()}
</div>
