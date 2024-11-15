<script lang="ts">
	import { type Project } from '$lib/server/db/schema';
	import dayjs from 'dayjs';

	let { project }: { project: Project } = $props();
</script>

<div class="rounded-box border-2 border-base-300 bg-base-200 p-8">
	<div class="flex items-center justify-between">
		<h1 class="text-2xl font-bold">{project.title}</h1>
		<div class="flex items-center gap-6">
			<p>
				{#if project.info}
					{project.info}
				{:else}
					<span class="text-base-content/60">No info added</span>
				{/if}
			</p>
			<p>
				{#if project.date}
					{dayjs(project.date).format('DD MMMM YYYY')}
				{:else}
					<span class="text-base-content/60">No date set</span>
				{/if}
			</p>
		</div>
	</div>
</div>
