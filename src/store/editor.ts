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
	width: number;
	height: number;
	// Pencil
	penWidth: number;
	penColor: string;
	// Layers
	activeLayerIds: string[];
}

export type EditorGetters = {};

export default defineStore<string, EditorState, EditorGetters>('editor', {
	state: () => ({
		tool: '',
		mode: 'select',
		zoom: 1,
		panX: 0,
		panY: 0,
		width: 0,
		height: 0,
		penWidth: 2,
		penColor: '#000000',
		activeLayerIds: []
	}),
	getters: {}
});
