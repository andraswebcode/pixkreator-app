import { defineStore } from 'pinia';
import { createLayerObject } from '../utils/layer-object';
import { util } from 'fabric';
import { uniqueId } from '../utils/functions';

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
			util.enlivenObjects([props]).then((objects) => {
				const layer = objects[0].toObject();
				const { type } = layer;
				const id = layer.id || uniqueId(type);
				this.ids.push(id);
				this.byIds[id] = {
					...layer,
					id
				};
			});
		},
		removeLayer() {},
		updateProps() {}
	}
});
