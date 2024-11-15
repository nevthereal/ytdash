<script lang="ts">
	import H1 from '$lib/components/typography/H1.svelte';

	let { data } = $props();

	const project = data.project;
</script>

<H1>{project.title}</H1>
