<script lang="ts">
	import { cn } from '$lib/utils';
	import type { Snippet } from 'svelte';

	let { children, className }: { children: Snippet; className?: string } = $props();
</script>

<h1 class={cn('mb-4 text-2xl font-bold', className)}>{@render children()}</h1>
