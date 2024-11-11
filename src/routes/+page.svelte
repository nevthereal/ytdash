<script lang="ts">
	import { superForm } from 'sveltekit-superforms';

	let { data } = $props();

	const { form, enhance } = superForm(data.addForm);
</script>

<svelte:head>
	<title>ytdash home</title>
</svelte:head>

<h1 class="mb-4 text-2xl font-bold">Add a project</h1>
<form use:enhance action="/?add" class="mx-auto max-w-[50%]">
	<div class="flex flex-col gap-2">
		<label for="project">Project name</label>
		<input
			bind:value={$form.title}
			type="text"
			name="project"
			placeholder="Project name"
			class="input input-primary"
		/>
	</div>
</form>
