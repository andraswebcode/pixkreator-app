import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import EditorView from '../views/EditorView.vue';

const routes: RouteRecordRaw[] = [
	{
		name: 'editor',
		path: '/:id?',
		component: EditorView
	}
];

const router = createRouter({
	routes,
	history: createWebHistory()
});

export default router;
