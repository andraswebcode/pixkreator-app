import { defineStore } from 'pinia';

type ActiveTool =
	| 'templates'
	| 'uploads'
	| 'photos'
	| 'graphics'
	| 'ai'
	| 'texts'
	| 'draw'
	| 'brand';

export interface EditorState {
	activeTool: ActiveTool;
}

export interface EditorGetters {}

export default defineStore<string, EditorState, EditorGetters>('editor', {
	state: () => ({
		activeTool: 'templates'
	}),
	getters: {}
});
