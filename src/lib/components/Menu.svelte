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
</script>

<details class="dropdown dropdown-right">
	<summary class="btn m-1">{@render children()}</summary>
	<ul
		transition:fade={{ duration: 200, easing: quadInOut }}
		class="menu dropdown-content z-[1] w-52 rounded-box border-2 border-base-300 bg-base-200 p-2 shadow"
	>
		{#each actions as menuItem}
			<button
				onclick={menuItem.action}
				class="flex items-center justify-between gap-4 p-2 text-left text-lg"
				><i class={menuItem.icon}></i><span class="mr-auto">{menuItem.content}</span></button
			>
		{/each}
	</ul>
</details>
