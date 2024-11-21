<script lang="ts">
	import { goto } from '$app/navigation';
	import Menu from '$lib/components/Menu.svelte';
	import H1 from '$lib/components/typography/H1.svelte';

	let { data } = $props();

	const project = data.project;
</script>

<H1>{project.title}</H1>
<h3>
	{#if !project.description}
		<div class="drawer">
			<input id="my-drawer" type="checkbox" class="drawer-toggle" />
			<div class="drawer-content">
				<label for="my-drawer" class="underline">Add project description</label>
			</div>
			<div class="drawer-side">
				<label for="my-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
				<ul class="menu min-h-full w-80 bg-base-200 p-4 text-base-content">
					<form action="?/addInfo"></form>
				</ul>
			</div>
		</div>
	{:else}
		{project.description}
	{/if}
</h3>
