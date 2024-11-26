<script lang="ts">
	import type { Note } from '$lib/server/db/schema';
	import type { zEditNote } from '$lib/zod';
	import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';

	interface Props {
		note: Note;
		editForm: SuperValidated<Infer<typeof zEditNote>>;
	}
	let { note, editForm: editFormData }: Props = $props();

	const {
		form: editForm,
		enhance: editEnhance,
		reset
	} = superForm(editFormData, {
		id: `editform-${note.id}`,
		onSubmit: ({ formData }) => {
			formData.set('id', note.id);
			reset();
			toggleMode();
		}
	});

	let editMode = $state(false);

	function toggleMode() {
		editMode = !editMode;
	}

	$editForm.content = note.content;
</script>

<div class="group flex items-center rounded-box border border-base-300 bg-base-200 p-6">
	{#if !editMode}
		<p class="flex-grow text-xl">
			{note.content}
		</p>
		<div class="flex opacity-0 duration-200 ease-in-out group-hover:opacity-100">
			<button class="btn btn-square" aria-label="edit note" onclick={toggleMode}>
				<i class="fa-solid fa-pencil fa-lg"></i>
			</button>
			<button class="btn btn-square hover:text-error" aria-label="delete note">
				<i class="fa-regular fa-trash-can fa-lg"></i>
			</button>
		</div>
	{:else}
		<div class="flex w-full gap-2">
			<form id="editNoteForm" use:editEnhance method="post" action="?/editNote" class="w-full">
				<input
					type="text"
					bind:value={$editForm.content}
					name="content"
					class="input input-bordered w-full flex-grow"
				/>
				<input type="text" class="hidden" />
			</form>
			<button
				onclick={() => {
					toggleMode();
					reset();
				}}
				aria-label="cancel"
				class="btn btn-error"><i class="fa-solid fa-ban"></i></button
			>
			<button form="editNoteForm" formaction="?/editNote" class="btn btn-success" aria-label="done"
				><i class="fa-solid fa-check"></i></button
			>
		</div>
	{/if}
</div>
