import { defineStore } from 'pinia';
import { createLayerObject } from '../utils/layer-object';

export type IDList = string[];

export interface ByID {}

export type ByIDs = {
	[key: string]: ByID;
};

export type ChangedProps = {
	[key: string]: Partial<ByID>;
};

export interface ProjectState {
	title: string;
	description: string;
	status: 'public' | 'private' | 'deleted';
	width: number;
	height: number;
	byIds: ByIDs;
	ids: IDList;
}

export interface ProjectGetters {}

export interface ProjectActions {
	addLayer: (props: Partial<ByID>) => void;
	removeLayer: (id: string) => void;
	updateProps: (id: string | ChangedProps, props?: Partial<ByID>) => void;
}

export default defineStore<string, ProjectState, ProjectGetters, ProjectActions>('project', {
	state: () => ({
		title: '',
		description: '',
		status: 'private',
		width: 400,
		height: 400,
		byIds: {},
		ids: []
	}),
	getters: {},
	actions: {
		addLayer(props) {
			const layer = createLayerObject(props);
			console.log(layer);
		},
		removeLayer() {},
		updateProps() {}
	}
});
