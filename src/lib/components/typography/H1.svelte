<script lang="ts">
	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();
</script>

<h1 class="mb-4 text-2xl font-bold">{@render children()}</h1>
