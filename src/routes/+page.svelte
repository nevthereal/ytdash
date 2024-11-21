<script lang="ts">
	import Loading from '$lib/components/typography/Loading.svelte';
	import ProjectCard from '$lib/components/ProjectCard.svelte';
	import Spinner from '$lib/components/Spinner.svelte';
	import H1 from '$lib/components/typography/H1.svelte';
	import { cn } from '$lib/utils';
	import { toast } from 'svelte-sonner';
	import { superForm } from 'sveltekit-superforms';

	let { data } = $props();

	const projectsPromise = data.projects;

	const { form, enhance, delayed } = superForm(data.addForm, {
		invalidateAll: false,
		onSubmit: ({ formData }) => {
			toast(`Trying to create ${formData.get('title')}`);
		}
	});
</script>

<svelte:head>
	<title>ytdash home</title>
</svelte:head>

<section>
	<H1>Add a project</H1>
	<form use:enhance action="?/add" method="POST" class="mx-auto">
		<div class="flex flex-col gap-2">
			<input
				bind:value={$form.title}
				type="text"
				name="title"
				placeholder="Project name"
				class="input input-primary"
			/>
			<button class={cn('btn ml-auto', !$delayed ? 'btn-primary' : 'btn-disabled')}
				>Add Project {$form.title}
				{#if $delayed}<Spinner />{/if}</button
			>
		</div>
	</form>
</section>

<section class="mt-12">
	{#await projectsPromise}
		<Loading thing="projects" />
	{:then projects}
		<H1>
			{#if projects.length != 0}
				<span>Ongoing projects</span>
			{:else}
				<span>No projects. Create one above!</span>
			{/if}
		</H1>
		<ul class="flex flex-col gap-4">
			{#each projects as project}
				<ProjectCard {project} />
			{/each}
		</ul>
	{/await}
</section>
