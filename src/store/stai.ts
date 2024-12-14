import { defineStore } from 'pinia';

export interface StAIState {
	drawMask: boolean;
	mask: Blob | null;
	alphaMask: Blob | null;
	brushWidth: number;
	clearMask: number; // Incremented number, just for signing mask canvas to clear.
}

export type StAIGetters = {};

export default defineStore<string, StAIState, StAIGetters>('stai', {
	state: () => ({
		drawMask: false,
		mask: null,
		alphaMask: null,
		brushWidth: 100,
		clearMask: 0
	}),
	getters: {},
	undo: {
		disable: true
	}
});
