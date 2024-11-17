export type MenuItem = {
	icon: string;
	content: string;
	action: (param: unknown) => unknown;
};
