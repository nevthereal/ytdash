<script lang="ts">
	import { droppable, draggable, type DragDropState } from '@thisux/sveltednd';
</script>

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
	class="cursor-move rounded-xl border-2 border-muted-foreground bg-gray-400/10 p-4 transition-all duration-200"
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
