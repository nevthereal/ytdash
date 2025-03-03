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
		project.status === 'todo'
			? 'bg-todo/50'
			: project.status === 're-record'
				? 'bg-rerecord/50'
				: project.status === 'in-progress'
					? 'bg-inprogress/50'
					: project.status === 'done'
						? 'bg-done/50'
						: 'bg-scrap/50'
	)}
>
	{project.status.replace('-', ' ')}
</p>
