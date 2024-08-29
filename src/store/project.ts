import { defineStore } from 'pinia';
import { unique, uniqueId } from '../utils/functions';
import { FabricObjectProps, util } from 'fabric';

export type IDList = string[];

export interface ByID extends FabricObjectProps {
	id: string;
	name: string;
	type: string;
	src?: string;
	text?: string;
}

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
	link: string;
	width: number;
	height: number;
	background: string;
	byIds: ByIDs;
	ids: IDList;
}

export type ProjectGetters = {};

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
		link: '',
		width: 400,
		height: 400,
		background: '#FFFFFF',
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
				this.$patch({
					ids: unique<string>([...this.ids, id]),
					byIds: {
						...this.byIds,
						[id]: {
							visible: true,
							selectable: true,
							...layer,
							id
						}
					}
				});
			});
		},
		removeLayer(id) {
			const { [id]: _, ...restLayers } = this.byIds;
			// @ts-ignore
			this.$patch({
				byIds: restLayers,
				ids: this.ids.filter((_id) => _id !== id)
			});
		},
		updateProps(id, props) {
			if (typeof id === 'string') {
				if (this.byIds[id] && props) {
					this.byIds[id] = {
						...this.byIds[id],
						...props
					};
				}
			} else {
				for (let _id in id) {
					this.updateProps(_id, id[_id]);
				}
			}
		}
	},
	undo: {
		omit: ['title', 'description', 'status', 'link']
	}
});
