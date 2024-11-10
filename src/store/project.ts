import { defineStore } from 'pinia';
import { unique, uniqueId } from '../utils/functions';
import { FabricObjectProps, util } from 'fabric';
import { ImageFilter, ImageFilterType } from '../types/image-filter';
import { PROGroup } from '../canvas/objects/group';

export type IDList = string[];

export interface ByID extends FabricObjectProps {
	id: string;
	name: string;
	type: string;
	src?: string;
	filters?: ImageFilter[];
	text?: string;
	fontFamily?: string;
	// Group
	parentId: string;
	childIds: string[];
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
	upload_id: number | null;
	link: string;
	width: number;
	height: number;
	background: string;
	byIds: ByIDs;
	ids: IDList;
	// for templates
	keywords: string;
}

export type ProjectGetters = {};

export interface ProjectActions {
	addLayer: (props: Partial<ByID>) => void;
	removeLayer: (id: string) => void;
	groupLayers: (ids: string[]) => void;
	ungroupLayers: (id: string) => void;
	updateProps: (id: string | ChangedProps, props?: Partial<ByID>) => void;
	applyFilter: (id: string, filter: ImageFilter) => void;
	removeFilter: (id: string, type: ImageFilterType) => void;
}

export default defineStore<string, ProjectState, ProjectGetters, ProjectActions>('project', {
	state: () => ({
		title: '',
		description: '',
		status: 'private',
		upload_id: null,
		link: '',
		width: 400,
		height: 400,
		background: '#FFFFFF',
		byIds: {},
		ids: [],
		// for templates
		keywords: ''
	}),
	getters: {},
	actions: {
		addLayer(props) {
			util.enlivenObjects([props]).then((shapes) => {
				const layer: { type: string; id: string; objects: any[] } = shapes[0].toObject();
				const { type, objects } = layer;
				const id = layer.id || uniqueId(type);

				if (type === 'Group' && objects?.length) {
					const groupLayers = objects.map((obj) => ({
						...obj,
						id: obj.id || uniqueId(obj.type),
						parentId: id
					}));
					this.$patch({
						ids: unique<string>([...this.ids, id]),
						byIds: {
							...this.byIds,
							// Data of the group object.
							[id]: {
								visible: true,
								selectable: true,
								...layer,
								id,
								objects: undefined,
								childIds: groupLayers.map(({ id }) => id)
							},
							// Data of the shapes inside group.
							...groupLayers.reduce((memo, layer) => {
								memo[layer.id] = layer;
								return memo;
							}, {})
						}
					});
				} else {
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
				}
			});
		},
		removeLayer(id) {
			this.$patch({
				byIds: {
					...this.byIds,
					[id]: undefined
				},
				ids: this.ids.filter((_id) => _id !== id)
			});
		},
		groupLayers(ids) {
			const layers = ids.map((id) => this.byIds[id]);
			util.enlivenObjects(layers).then((shapes: any) => {
				const group = new PROGroup(shapes);
				const groupLayer = group.toObject();
				const id = groupLayer.id || uniqueId('Group');
				this.$patch({
					ids: unique<string>([...this.ids.filter((id) => !ids.includes(id)), id]),
					byIds: {
						...this.byIds,
						// Data of the group object.
						[id]: {
							visible: true,
							selectable: true,
							...groupLayer,
							id,
							objects: undefined,
							childIds: ids,
							left: groupLayer.left + groupLayer.width / 2,
							top: groupLayer.top + groupLayer.height / 2
						},
						...ids.reduce((memo, id, i) => {
							const { left, top } = groupLayer.objects[i];
							memo[id] = {
								...this.byIds[id],
								left,
								top,
								parentId: groupLayer.id
							};
							return memo;
						}, {})
					}
				});
			});
		},
		ungroupLayers(id) {
			const group = this.byIds[id];
			this.$patch({
				ids: [...this.ids.filter((_id) => _id !== id), ...group.childIds],
				byIds: {
					...this.byIds,
					[id]: undefined,
					...group.childIds.reduce((memo, id) => {
						const layer = this.byIds[id];
						memo[id] = {
							...layer,
							left: layer.left + group.left,
							top: layer.top + group.top,
							parentId: undefined
						};
						return memo;
					}, {})
				}
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
		},
		applyFilter(id, filter) {
			const layer = this.byIds[id];
			if (!layer) {
				return;
			}
			if (!layer.filters) {
				layer.filters = [];
			}
			const index = layer.filters.findIndex((f) => f.type === filter.type);
			if (index !== -1) {
				layer.filters[index] = filter;
			} else {
				layer.filters.push(filter);
			}
		},
		removeFilter(id, type) {
			const layer = this.byIds[id];
			if (!layer || !layer.filters) {
				return;
			}
			const index = layer.filters.findIndex((f) => f.type === type);
			if (index !== -1) {
				layer.filters.splice(index, 1);
			}
		}
	},
	undo: {
		omit: ['title', 'description', 'status', 'link']
	}
});
