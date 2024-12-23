<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import type { Note } from '$lib/server/db/schema';
	import { toast } from 'svelte-sonner';
	import { cubicInOut } from 'svelte/easing';
	import { slide } from 'svelte/transition';

	interface Props {
		note: Note;
	}
	let { note }: Props = $props();

	async function deleteNote() {
		await fetch(`/api/notes/delete/${note.id}`, {
			method: 'DELETE'
		});

		toast.error('Deleting note...');

		invalidateAll();
	}
</script>

<div
	transition:slide={{ duration: 300, easing: cubicInOut }}
	class="group flex items-center rounded-box border border-base-300 bg-base-200 p-6"
>
	<p class="flex-grow text-xl">
		{note.content}
	</p>
	<div class="flex opacity-0 duration-200 ease-in-out group-hover:opacity-100">
		<button onclick={deleteNote} class="btn btn-square hover:text-error" aria-label="delete note">
			<i class="fa-regular fa-trash-can fa-lg"></i>
		</button>
	</div>
</div>
