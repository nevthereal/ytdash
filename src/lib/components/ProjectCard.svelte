<script lang="ts">
	import { draggable } from '@thisux/sveltednd';
	import { fade } from 'svelte/transition';
	import { type Project } from '$lib/db/schema';
	import { projectStatusEnum } from '$lib/db/schema';

	interface Props {
		prj: Project;
		status: (typeof projectStatusEnum.enumValues)[number];
	}

	let { prj, status }: Props = $props();
</script>

<button
	ondblclick={() => console.log('double clicked')}
	use:draggable={{
		// The container is the status of the task. e.g. 'todo', 'in-progress', 'done'
		container: status,
		// The dragData is the task that is being dragged
		dragData: prj,
		callbacks: {
			onDrop: (e) => {
				console.log(e.invalidDrop);
			},
			onDragStart: () => console.log('drag start')
		}
	}}
	in:fade={{ duration: 150 }}
	out:fade={{ duration: 150 }}
	class="w-full cursor-move rounded-xl border-2 border-gray-400 bg-gray-400/10 p-4 text-left transition-all duration-200"
>
	<div class="flex flex-col gap-2">
		<h2 class="text-xl font-bold">
			{prj.title}
		</h2>
		{#if prj.date}
			<h3>
				{Intl.DateTimeFormat('en', {
					dateStyle: 'medium',
					timeStyle: 'short'
				}).format(prj.date)}
			</h3>
		{/if}
	</div>
</button>
