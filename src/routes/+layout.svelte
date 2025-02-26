<script lang="ts">
	import '../app.css';
	import { ModeWatcher } from 'mode-watcher';

	let { children } = $props();
</script>

<nav class="p-8">
	<a href="/" class="text-5xl font-black italic">YouKan</a>
</nav>
<main>
	{@render children()}
</main>
