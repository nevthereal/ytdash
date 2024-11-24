<script lang="ts">
	import type { Note } from '$lib/server/db/schema';

	interface Props {
		note: Note;
	}

	let { note }: Props = $props();
</script>

<div class="group flex items-center rounded-box border border-base-300 bg-base-200 p-6">
	<p class="flex-grow text-xl">
		{note.content}
	</p>
	<div class="flex opacity-0 duration-200 ease-in-out group-hover:opacity-100">
		<button class="btn btn-square" aria-label="edit note">
			<i class="fa-solid fa-pencil fa-lg"></i>
		</button>
		<button class="btn btn-square hover:text-error" aria-label="delete note">
			<i class="fa-regular fa-trash-can fa-lg"></i>
		</button>
	</div>
</div>
