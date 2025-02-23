import type { Config } from 'tailwindcss';

const config: Config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			colors: {
				todo: 'hsl(39, 100%, 65%, 0.25)',
				inprogress: 'hsl(210, 100%, 62%, 0.25)',
				done: 'hsl(120, 100%, 60%, 0.25)',
				scrap: 'hsl(0, 100%, 67%, 0.25)',
				rerecord: 'hsl(300, 100%, 72%, 0.25)'
			}
		}
	}
};

export default config;
