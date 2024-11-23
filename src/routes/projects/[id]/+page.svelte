<script lang="ts">
	import BigH from '$lib/components/typography/BigH.svelte';
	import H1 from '$lib/components/typography/H1.svelte';
	import dayjs from 'dayjs';
	import { toast } from 'svelte-sonner';
	import { superForm, dateProxy } from 'sveltekit-superforms';

	let { data } = $props();

	const project = data.project;

	let descModal: HTMLDialogElement;

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

<dialog bind:this={descModal} class="modal">
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
			<div class="join flex">
				<input
					type="date"
					bind:value={$date}
					name="date"
					class="input join-item input-bordered w-full"
					placeholder="Date"
				/>
				<button
					type="button"
					onclick={() => ($date = '')}
					class="btn btn-square btn-error join-item"
					aria-label="clear date"><i class="fa-solid fa-minus"></i></button
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
