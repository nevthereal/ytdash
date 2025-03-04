<script lang="ts">
	import { cn } from '$lib/utils';

	let { data } = $props();

	let { project } = $derived(data);
</script>

<h1 class="mb-2 text-4xl font-bold">{project.title}</h1>
{#if project.date}
	<p>{project.date}</p>
{:else}
	<p class="text-gray-600 italic">No date set</p>
{/if}

<p
	class={cn(
		'w-fit rounded-full px-2 py-1 capitalize',
		project.status === 'To Do'
			? 'bg-todo/50'
			: project.status === 'Re Record'
				? 'bg-rerecord/50'
				: project.status === 'In Progress'
					? 'bg-inprogress/50'
					: project.status === 'Done'
						? 'bg-done/50'
						: 'bg-scrap/50'
	)}
>
	{project.status}
</p>
