<script lang="ts">
	import type { Note } from '$lib/server/db/schema';

	interface Props {
		note: Note;
	}

	let { note }: Props = $props();
</script>

<div class="rounded-box border border-base-300 bg-base-200 p-4">
	<p>
		{note.content}
	</p>
</div>
