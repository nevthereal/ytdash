<script lang="ts">
	import type { MenuItem } from '$lib/types';
	import type { Snippet } from 'svelte';
	import { quadInOut } from 'svelte/easing';
	import { fade } from 'svelte/transition';

	interface Props {
		children: Snippet;
		actions: MenuItem[];
	}

	let { children, actions }: Props = $props();

	let shown = $state(false);
</script>

<div class="flex">
	<button onclick={() => (shown = !shown)}>
		{@render children()}
	</button>
	{#if shown}
		<div
			transition:fade={{ duration: 200, easing: quadInOut }}
			class="absolute ml-6 rounded-box border-2 border-base-200 bg-base-100 p-4"
		>
			<ul class="flex flex-col gap-2">
				{#each actions as menuItem}
					<button
						onclick={menuItem.action}
						class="flex items-center justify-between gap-4 p-2 text-left text-lg"
						><i class={menuItem.icon}></i><span class="mr-auto">{menuItem.content}</span></button
					>
				{/each}
			</ul>
		</div>
	{/if}
</div>
