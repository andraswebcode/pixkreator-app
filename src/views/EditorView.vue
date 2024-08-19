<script setup lang="ts">
import { onBeforeRouteUpdate, useRoute } from 'vue-router';
import { useEditor, useProject } from '../store';
import { useRequest } from '../hooks';
import { onMounted } from 'vue';

const route = useRoute();
const project = useProject();
const editor = useEditor();
const { get } = useRequest();

onMounted(() => {
	if (!route.params.id) {
		return;
	}
	editor.loading = true;
	get(route.params.id as string, 'designs', (state) => {
		editor.$reset();
		project.$reset();
		if (state) {
			project.$patch(state);
		}
	});
});
onBeforeRouteUpdate((to, from) => {
	if (to.path !== '/' && from.path === '/') {
		return;
	}
	editor.loading = true;
	get(to.params.id as string, 'designs', (state) => {
		editor.$reset();
		project.$reset();
		if (state) {
			project.$patch(state);
		}
	});
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
