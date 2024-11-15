<script lang="ts">
	import H1 from '$lib/components/typography/H1.svelte';

	let { data } = $props();

	const project = data.project;
</script>

<H1>{project.title}</H1>
<h3>
	{#if !project.info}
		<span>No project info.</span> <span class="underline">Add info</span>
	{:else}
		{project.info}
	{/if}
</h3>
