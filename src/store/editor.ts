import { defineStore } from 'pinia';

export interface EditorState {}

export interface EditorGetters {}

export default defineStore<string, EditorState, EditorGetters>('editor', {
	state: () => ({}),
	getters: {}
});
