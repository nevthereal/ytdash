<script lang="ts">
	import { cn } from '$lib/utils';
	import type { Snippet } from 'svelte';

	let { children, className }: { children: Snippet; className?: string } = $props();
</script>

<h1 class={cn('mb-6 text-4xl font-black', className)}>{@render children()}</h1>
