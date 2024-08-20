<script setup lang="ts">
import { onBeforeRouteUpdate, useRoute } from 'vue-router';
import { useEditor, useProject } from '../store';
import { useRequest } from '../hooks';
import { onMounted } from 'vue';

const route = useRoute();
const project = useProject();
const editor = useEditor();
const { get } = useRequest();

const fetchProject = (obj: any) => {
	if (obj.params.id) {
		editor.loading = true;
		get(obj.params.id as string, 'designs', (state) => {
			editor.$reset();
			project.$reset();
			if (state) {
				project.$patch(state);
			}
		});
	} else if (obj.query.template) {
		editor.loading = true;
		get(obj.query.template as string, 'templates', (state) => {
			editor.$reset();
			project.$reset();
			if (state) {
				project.$patch(state);
			}
		});
	}
};

onMounted(() => {
	fetchProject(route);
});
onBeforeRouteUpdate((to, from) => {
	if (to.path !== '/' && from.path === '/') {
		return;
	}
	fetchProject(to);
});
</script>

<template>
	<TopBar />
	<ToolBar />
	<LeftSideBar />
	<MainContent />
	<RightSideBar />
	<FooterBar />
	<StartDialog />
	<FullScreenLoader />
</template>

<style scoped lang="scss"></style>
