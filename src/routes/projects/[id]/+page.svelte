<script lang="ts">
	import Note from '$lib/components/Note.svelte';
	import BigH from '$lib/components/typography/BigH.svelte';
	import H1 from '$lib/components/typography/H1.svelte';
	import dayjs from 'dayjs';
	import { toast } from 'svelte-sonner';
	import { superForm, dateProxy } from 'sveltekit-superforms';

	let { data } = $props();

	const project = $derived(data.project);
	const notes = $derived(data.notes);

	let descModal: HTMLDialogElement;

	const {
		form: epForm,
		enhance: epEnhance,
		constraints: epConstraints
	} = superForm(data.editProjectForm, {
		onSubmit: () => {
			descModal.close();
			toast(`Updating ${project.title}`);
		}
	});

	const date = dateProxy(epForm, 'date', { format: 'date', empty: 'undefined' });

	const { form: anForm, enhance: anEnhance } = superForm(data.addNoteForm, {
		invalidateAll: true
	});
</script>

<section>
	<H1 className="flex gap-2 items-center"
		><a href="/projects" aria-label="see all project"><i class="fa-solid fa-arrow-left"></i></a
		>Project overview:</H1
	>
	<BigH>{project.title}</BigH>

	<div class="flex gap-2">
		{#if project.description}
			<p>{project.description}</p>
			<p>·</p>
		{/if}
		{#if project.date}
			<p>{dayjs(project.date).format('DD. MMM YYYY')}</p>
			<p>·</p>
		{/if}

		<button class="underline" onclick={() => descModal.showModal()}>Edit project data</button>
	</div>
</section>

<section class="mt-6 border-t border-base-content/30 pt-6">
	<H1>Notes:</H1>
	<form use:anEnhance action="?/addNote" method="post" class="join flex">
		<!-- svelte-ignore a11y_autofocus -->
		<input
			autofocus={true}
			bind:value={$anForm.content}
			type="text"
			name="content"
			placeholder="Note"
			class="input join-item input-bordered flex-grow"
		/>
		<button class="btn btn-primary join-item">Add</button>
	</form>
	<div class="mt-4 flex flex-col gap-2">
		{#each notes as note}
			<Note editForm={data.editNoteForm} {note} />
		{/each}
	</div>
</section>

<dialog bind:this={descModal} class="modal">
	<div class="modal-box">
		<H1>Edit project</H1>
		<form use:epEnhance action="?/editProject" method="post" class="flex flex-col gap-4">
			<input
				type="text"
				bind:value={$epForm.title}
				name="title"
				class="input input-bordered w-full"
				placeholder="Title"
				{...$epConstraints.title}
			/>
			<input
				type="text"
				bind:value={$epForm.description}
				name="description"
				class="input input-bordered w-full"
				placeholder="Description"
				{...$epConstraints.description}
			/>
			<div class="join flex">
				<input
					type="date"
					bind:value={$date}
					name="date"
					class="input join-item input-bordered w-full"
					placeholder="Date"
				/>
				<button type="button" onclick={() => ($date = '')} class="btn btn-error join-item"
					>Clear</button
				>
			</div>
			<button type="submit" class="btn btn-primary">Update</button>
		</form>
	</div>
	<form method="dialog" class="modal-backdrop">
		<button>x</button>
	</form>
</dialog>

<style>
	input::-webkit-calendar-picker-indicator {
		display: none;
	}

	input[type='date']::-webkit-input-placeholder {
		visibility: hidden !important;
	}
</style>
