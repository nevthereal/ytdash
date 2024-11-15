<script lang="ts">
	import Loading from '$lib/components/Loading.svelte';
	import Spinner from '$lib/components/Spinner.svelte';
	import H1 from '$lib/components/typography/H1.svelte';
	import { cn } from '$lib/utils.js';
	import { superForm } from 'sveltekit-superforms';

	let { data } = $props();

	const { form, enhance, delayed } = superForm(data.addForm);

	const projectsPromise = data.projects;
</script>

<svelte:head>
	<title>ytdash home</title>
</svelte:head>

<div class="flex flex-col gap-16">
	<section>
		<H1>Add a project</H1>
		<form use:enhance action="?/add" method="POST" class="mx-auto max-w-[50%]">
			<div class="flex flex-col gap-2">
				<label for="project">Project name</label>
				<input
					bind:value={$form.title}
					type="text"
					name="title"
					placeholder="Project name"
					class="input input-primary"
				/>
				<button class={cn('btn', !$delayed ? 'btn-primary' : 'btn-disabled')}
					>Add {#if $delayed}<Spinner />{/if}</button
				>
			</div>
		</form>
	</section>

	<section>
		<H1>Ongoing projects</H1>
		{#await projectsPromise}
			<Loading thing="projects" />
		{:then projects}
			<ul class="flex flex-col gap-4">
				{#each projects as project}
					<a href={`/projects/${project.id}`}>{project.title}</a>
				{/each}
			</ul>
		{/await}
	</section>
</div>
