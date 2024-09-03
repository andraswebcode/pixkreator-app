import { defineStore } from 'pinia';

export type EditorToolType =
	| ''
	| 'templates'
	| 'uploads'
	| 'photos'
	| 'graphics'
	| 'ai'
	| 'texts'
	| 'draw'
	| 'brand';

export type EditorModeType = 'select' | 'pan' | 'draw';

export type EditorPencilType = 'brush' | 'rect' | 'ellipse' | 'circle' | 'triangle' | 'arrow';

export interface EditorState {
	// UI
	tool: EditorToolType;
	loading: boolean;
	openStartDialog: boolean;
	openDownloadDialog: boolean;
	openShareDialog: boolean;
	openLoginDialog: boolean;
	// Canvas
	mode: EditorModeType;
	zoom: number;
	panX: number;
	panY: number;
	width: number;
	height: number;
	// Pencil
	pencil: EditorPencilType;
	penWidth: number;
	penColor: string;
	// Layers
	activeLayerIds: string[];
}

export type EditorGetters = {};

export default defineStore<string, EditorState, EditorGetters>('editor', {
	state: () => ({
		tool: '',
		loading: false,
		openStartDialog: false,
		openDownloadDialog: false,
		openShareDialog: false,
		openLoginDialog: false,
		mode: 'select',
		zoom: 1,
		panX: 0,
		panY: 0,
		width: 0,
		height: 0,
		pencil: 'brush',
		penWidth: 2,
		penColor: '#000000',
		activeLayerIds: []
	}),
	getters: {},
	undo: {
		disable: true
	}
});
