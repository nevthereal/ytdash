<script lang="ts">
	import { projectStatusEnum, type Project } from '$lib/db/schema';
	import { droppable, draggable, type DragDropState } from '@thisux/sveltednd';
	import { flip } from 'svelte/animate';
	import { fade } from 'svelte/transition';

	let { data } = $props();

	const statusValues = projectStatusEnum.enumValues;

	const columns = statusValues;
	const projectsByStatus = $derived(
		columns.map((status) => ({
			status,
			items: data.projects.filter((prj) => prj.status === status)
		}))
	);

	async function handleDrop(state: DragDropState<Project>) {
		const { draggedItem, targetContainer } = state;
		if (!targetContainer) return; // Prevent self-placement

		// Update the task's status to the target container
		data.projects = data.projects.map((project) => {
			if (project.id === draggedItem.id) {
				project.status = targetContainer as (typeof statusValues)[number];
			}
			return project;
		});
	}
</script>

<main class="p-8">
	<div class="mb-8 flex flex-col gap-2">
		<h1 class="text-2xl font-bold">Board View</h1>
		<p class="text-gray-600">
			Drag and drop projects between columns to reorder them in the board.
		</p>
	</div>

	<div class="flex gap-6 overflow-x-auto p-2">
		{#each projectsByStatus as { status, items }}
			<div class="w-80 flex-none">
				<div
					class="rounded-xl bg-gray-100 p-4 shadow-sm ring-1 ring-gray-200"
					use:droppable={{
						// The container is the status of the task. e.g. 'todo', 'in-progress', 'done'
						container: status,
						// When a task is dropped, the handleDrop function is called to update the task's status
						callbacks: { onDrop: handleDrop }
					}}
				>
					<div class="mb-4 flex items-center justify-between">
						<h2 class="font-semibold capitalize text-gray-900">
							{status.replace('-', ' ')}
						</h2>
						<span class="rounded-full bg-gray-100 px-2.5 py-0.5 text-sm text-gray-600">
							{items.length}
						</span>
					</div>

					<div class="space-y-3">
						{#each items as task (task.id)}
							<div
								use:draggable={{
									// The container is the status of the task. e.g. 'todo', 'in-progress', 'done'
									container: status,
									// The dragData is the task that is being dragged
									dragData: task
								}}
								animate:flip={{ duration: 200 }}
								in:fade={{ duration: 150 }}
								out:fade={{ duration: 150 }}
								class="svelte-dnd-touch-feedback cursor-move rounded-lg bg-white p-3 shadow-sm ring-1
                                       ring-gray-200 transition-all duration-200 hover:shadow-md hover:ring-2 hover:ring-blue-200"
							>
								<div class="mb-2 flex items-start justify-between gap-2">
									<h3 class="font-medium text-gray-900">
										{task.title}
									</h3>
								</div>
							</div>
						{/each}
					</div>
				</div>
			</div>
		{/each}
	</div>
</main>
