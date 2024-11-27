<script lang="ts">
	import { type Project } from '$lib/server/db/schema';
	import Menu from './Menu.svelte';
	import { prettyDate, timeTo } from '$lib/utils';

	let { project }: { project: Project } = $props();
</script>

<div class="rounded-box border-2 border-base-300 bg-base-200 p-8">
	<div class="flex items-center">
		<a href={`projects/${project.id}`} class="group flex-grow">
			<h1
				class="mb-2 text-2xl font-bold no-underline duration-300 ease-in-out group-hover:underline"
			>
				{project.title}
			</h1>
			<div class="flex items-center gap-2">
				<p>
					{#if project.description}
						{project.description}
					{:else}
						<span class="text-base-content/60">No description added</span>
					{/if}
				</p>
				<span>·</span>
				<p>
					{#if project.date}
						{timeTo(project.date)}
					{:else}
						<span class="text-base-content/60">No date set</span>
					{/if}
				</p>
			</div>
		</a>
		<Menu
			actions={[
				{ icon: 'fa-solid fa-hand', content: 'Say hi', action: () => console.log('hi') },
				{ icon: 'fa-solid fa-heart', content: 'Like', action: () => console.log('like') }
			]}
		>
			<i class="fa-solid fa-ellipsis"></i>
		</Menu>
	</div>
</div>
