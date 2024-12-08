import { defineStore } from 'pinia';
import { AppID } from '../types/apps';

export type EditorToolType =
	| ''
	| 'templates'
	| 'uploads'
	| 'photos'
	| 'graphics'
	| 'ai'
	| 'filters'
	| 'texts'
	| 'draw'
	| 'brand'
	| 'apps'
	| 'list'
	| 'settings';

export type EditorModeType = 'select' | 'pan' | 'draw';

export type EditorPencilType = 'brush' | 'rect' | 'ellipse' | 'circle' | 'triangle' | 'arrow';

export interface EditorState {
	// UI
	tool: EditorToolType;
	loading: boolean;
	aiIsGenerating: boolean;
	openStartDialog: boolean;
	openDownloadDialog: boolean;
	openShareDialog: boolean;
	openLoginDialog: boolean;
	nonLoggedInUserWantsTo: false | 'share' | 'download';
	// Context menu
	showContextMenu: boolean;
	contextMenuX: number;
	contextMenuY: number;
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
	// Apps
	activeApp: AppID | '';
	// Layers
	activeLayerIds: string[];
	// Settings
	showMargin: boolean;
	margin: number;
	snap: boolean;
}

export type EditorGetters = {};

export default defineStore<string, EditorState, EditorGetters>('editor', {
	state: () => ({
		tool: '',
		loading: false,
		aiIsGenerating: false,
		openStartDialog: false,
		openDownloadDialog: false,
		openShareDialog: false,
		openLoginDialog: false,
		nonLoggedInUserWantsTo: false,
		showContextMenu: false,
		contextMenuX: 0,
		contextMenuY: 0,
		mode: 'select',
		zoom: 1,
		panX: 0,
		panY: 0,
		width: 0,
		height: 0,
		pencil: 'brush',
		penWidth: 2,
		penColor: '#000000',
		activeApp: '',
		activeLayerIds: [],
		showMargin: true,
		margin: 20,
		snap: true
	}),
	getters: {},
	undo: {
		disable: true
	}
});
