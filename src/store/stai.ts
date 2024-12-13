import { defineStore } from 'pinia';

export interface StAIState {
	drawMask: string;
	mask: Blob | null;
	brushWidth: number;
	clearMask: number; // Incremented number, just for signing mask canvas to clear.
}

export type StAIGetters = {};

export default defineStore<string, StAIState, StAIGetters>('stai', {
	state: () => ({
		drawMask: '',
		mask: null,
		brushWidth: 10,
		clearMask: 0
	}),
	getters: {},
	undo: {
		disable: true
	}
});
