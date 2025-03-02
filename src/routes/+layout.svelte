<script lang="ts">
	import { page } from '$app/state';
	import { authClient } from '$lib/auth/client';
	import '../app.css';

	let { children, data } = $props();
</script>

<nav class="flex items-center justify-between p-8">
	<a href="/" class="text-5xl font-black italic">YouKan</a>
	{#if data.user}
		<button
			onclick={async () => {
				await authClient(page.url.origin).signOut();
				location.reload();
			}}
			class="rounded-lg border-2 p-1">Sign Out</button
		>
	{/if}
</nav>
<main class="no-scrollbar px-8">
	{@render children()}
</main>
