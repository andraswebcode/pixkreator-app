import { defineStore } from 'pinia';

type Tool =
	| ''
	| 'templates'
	| 'uploads'
	| 'photos'
	| 'graphics'
	| 'ai'
	| 'texts'
	| 'draw'
	| 'brand';

type Mode = 'select' | 'pan' | 'draw';

export interface EditorState {
	// UI
	tool: Tool;
	// Canvas
	mode: Mode;
	zoom: number;
	panX: number;
	panY: number;
	// Pencil
	penWidth: number;
	penColor: string;
}

export interface EditorGetters {}

export default defineStore<string, EditorState, EditorGetters>('editor', {
	state: () => ({
		tool: '',
		zoom: 1,
		mode: 'select'
	}),
	getters: {}
});
