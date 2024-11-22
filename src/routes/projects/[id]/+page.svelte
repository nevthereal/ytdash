<script lang="ts">
	import BigH from '$lib/components/typography/BigH.svelte';
	import H1 from '$lib/components/typography/H1.svelte';
	import dayjs from 'dayjs';
	import { toast } from 'svelte-sonner';
	import { superForm, dateProxy } from 'sveltekit-superforms';

	let { data } = $props();

	const project = data.project;

	let descModal: HTMLDialogElement;

	$effect(() => {
		descModal = document.getElementById('description_modal') as HTMLDialogElement;
	});

	const { form, enhance, constraints } = superForm(data.form, {
		onSubmit: () => {
			descModal.close();
			toast(`Updating ${project.title}`);
			location.reload();
		}
	});

	const date = dateProxy(form, 'date', { format: 'date', empty: 'undefined' });

	$date = dayjs(project.date).format('YYYY-MM-DD');
	$form.title = project.title;
	$form.description = project.description;
</script>

<div>
	<H1>Project:</H1>
	<BigH>{project.title}</BigH>

	<div class="flex gap-2">
		{#if project.description}
			<p>{project.description}</p>
			<p>·</p>
		{/if}

		<button class="underline" onclick={() => descModal.showModal()}>Edit project data</button>
	</div>
</div>

<dialog id="description_modal" class="modal">
	<div class="modal-box">
		<H1>Edit project</H1>
		<form use:enhance action="?/editProject" method="post" class="flex flex-col gap-4">
			<input
				type="text"
				bind:value={$form.title}
				name="title"
				class="input input-bordered w-full"
				placeholder="Title"
				{...$constraints.title}
			/>
			<input
				type="text"
				bind:value={$form.description}
				name="description"
				class="input input-bordered w-full"
				placeholder="Description"
				{...$constraints.description}
			/>
			<input
				type="date"
				bind:value={$date}
				name="date"
				class="input input-bordered w-full"
				placeholder="Date"
			/>
			<button>yay</button>
		</form>
	</div>
	<form method="dialog" class="modal-backdrop">
		<button>close</button>
	</form>
</dialog>
