<script lang="ts">
	import BigH from '$lib/components/typography/BigH.svelte';
	import H1 from '$lib/components/typography/H1.svelte';

	let { data } = $props();

	const project = data.project;

	let descModal: HTMLDialogElement;

	$effect(() => {
		descModal = document.getElementById('description_modal') as HTMLDialogElement;
	});
</script>

<H1>Project:</H1>
<BigH>{project.title}</BigH>

{#if !project.description}
	<p>{project.description}</p>
{/if}

<div>
	<button class="underline" onclick={() => descModal.showModal()}>Edit project data</button>
	<dialog id="description_modal" class="modal">
		<div class="modal-box">
			<H1>Edit project</H1>
			<form action="?/editProject"></form>
		</div>
		<form method="dialog" class="modal-backdrop">
			<button>close</button>
		</form>
	</dialog>
</div>
