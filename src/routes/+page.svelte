<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import { invalidateAll } from '$app/navigation';
	import { projectStatusEnum, type Project } from '$lib/db/schema';
	import { droppable, draggable, type DragDropState } from '@thisux/sveltednd';
	import { flip } from 'svelte/animate';
	import { fade } from 'svelte/transition';
	import { cn } from '$lib/utils';
	import { Plus } from 'lucide-svelte';

	let { data } = $props();

	const { projects } = $derived(data);

	const statusValues = projectStatusEnum.enumValues;

	const columns = statusValues;
	const projectsByStatus = $derived(
		columns.map((status) => ({
			status,
			items: projects.filter((prj) => prj.status === status)
		}))
	);

	async function handleDrop(state: DragDropState<Project>) {
		const { draggedItem, targetContainer } = state;
		if (!targetContainer) return; // Prevent self-placement

		await fetch(`/api/drop?id=${draggedItem.id}&target=${targetContainer}`, {
			method: 'POST'
		});
		invalidateAll();
	}

	let newItem = $state(false);

	const { form, enhance, constraints } = superForm(data.newProjectForm, {
		onSubmit: () => {
			newItem = false;
		}
	});
</script>

<main class="overflow-x-scroll p-8">
	<div class="mb-4">
		<h1 class="text-2xl font-bold">Board View</h1>
		<p>Drag and drop projects between columns to reorder them in the board.</p>
	</div>

	<div class="flex gap-6 overflow-x-auto p-2">
		{#each projectsByStatus as { status, items: projects }}
			<div class="w-80 flex-none">
				<div
					class={cn(
						'overflow-scroll rounded-2xl border-2 border-gray-400 p-4',
						status === 'todo'
							? 'bg-todo'
							: status === 're-record'
								? 'bg-rerecord'
								: status === 'in-progress'
									? 'bg-inprogress'
									: status === 'done'
										? 'bg-done'
										: 'bg-scrap'
					)}
					use:droppable={{
						// The container is the status of the task. e.g. 'todo', 'in-progress', 'done'
						container: status,
						// When a task is dropped, the handleDrop function is called to update the task's status
						callbacks: { onDrop: handleDrop }
					}}
				>
					<div class="mb-4 flex items-center justify-between">
						<h2 class="font-semibold capitalize">
							{status.replace('-', ' ')}
						</h2>
						<span class="px-2.5 py-0.5 text-sm">
							{projects.length}
						</span>
					</div>

					<div class="space-y-3">
						{#each projects as prj (prj.id)}
							<div
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
								animate:flip={{ duration: 200 }}
								in:fade={{ duration: 150 }}
								out:fade={{ duration: 150 }}
								class="cursor-move rounded-xl border-2 border-gray-400 bg-gray-400/10 p-4 transition-all duration-200"
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
							</div>
						{/each}
						{#if status === 'todo'}
							{#if newItem}
								<form action="/?/new" id="new-form" use:enhance method="post">
									<input
										{...$constraints.title}
										bind:value={$form.title}
										class="w-full rounded-xl border-2 border-gray-400 bg-gray-400/10 p-4 text-xl font-bold"
										type="text"
										name="title"
									/>
								</form>
							{/if}
							<button
								onclick={() => (newItem = true)}
								class="flex w-full justify-center gap-2 rounded-xl bg-white p-2 font-bold text-black"
								><Plus />New Item</button
							>{/if}
					</div>
				</div>
			</div>
		{/each}
	</div>
</main>

<style>
	:global(.dragging) {
		@apply opacity-50;
	}
</style>
