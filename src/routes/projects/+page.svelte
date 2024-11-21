<script lang="ts">
	import H1 from '$lib/components/typography/H1.svelte';
	import Loading from '$lib/components/typography/Loading.svelte';

	let { data } = $props();

	const projectsPromise = data.projects;
</script>

<H1>Your projects:</H1>
{#await projectsPromise}
	<Loading thing={'Projects'} />
{:then projects}
	{#each projects as project}
		<div>{project.title}</div>
	{/each}
{/await}
