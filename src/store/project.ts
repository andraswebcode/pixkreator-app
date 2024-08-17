import { defineStore } from 'pinia';

export type IDList = string[];

export interface ByID {}

export type ByIDs = {
	[key: string]: ByID;
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

export interface ProjectActions {}

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
	actions: {}
});
