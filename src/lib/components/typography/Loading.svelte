<script lang="ts">
	let { thing }: { thing: string } = $props();
</script>

<p class="text-center font-mono text-lg">Loading {thing.toLowerCase()}...</p>
