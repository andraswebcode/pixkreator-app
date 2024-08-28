<script setup lang="ts">
import { onBeforeRouteUpdate, useRoute } from 'vue-router';
import { useEditor, useNotice, useProject } from '../store';
import { useRequest } from '../hooks';
import { onMounted } from 'vue';
import useFitToScreen from '../hooks/fittoscreen';

const route = useRoute();
const project = useProject();
const editor = useEditor();
const notice = useNotice();
const fitToScreen = useFitToScreen();
const { get } = useRequest();

const fetchProject = (obj: any) => {
	if (obj.params.id) {
		const open = editor.openShareDialog;
		editor.loading = true;
		get(
			obj.params.id as string,
			'designs',
			(state) => {
				project.$reset();

				editor.loading = false;
				editor.openShareDialog = open;

				if (state) {
					project.$patch(state);
					project.resetStack();
					fitToScreen();
				}
			},
			(error) => {
				notice.send(error.response?.data?.message || error.message, 'error');
				editor.loading = false;
			}
		);
	} else if (obj.query.template) {
		editor.loading = true;
		get(
			obj.query.template as string,
			'templates',
			(state) => {
				project.$reset();
				if (state) {
					project.$patch(state);
					project.resetStack();
					fitToScreen();
				}
			},
			(error) => {
				notice.send(error.response?.data?.message || error.message, 'error');
				editor.loading = false;
			}
		);
	} else {
		project.$reset();
		project.resetStack();
		editor.openStartDialog = !!obj.query.start;
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
