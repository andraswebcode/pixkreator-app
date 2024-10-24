<script setup lang="ts">
import { onBeforeRouteUpdate, useRoute } from 'vue-router';
import { useEditor, useNotice, useProject, useUser } from '../store';
import { onBeforeUnmount, onMounted } from 'vue';
import useRequest from '../hooks/request';
import useFitToScreen from '../hooks/fittoscreen';
import { PhotoSize } from '../types/common';
import { getCroppedImageDimensions } from '../utils/functions';

const route = useRoute();
const userData = useUser();
const project = useProject();
const editor = useEditor();
const notice = useNotice();
const fitToScreen = useFitToScreen();
const { get } = useRequest();

const fetchProject = (obj: any) => {
	const id = parseInt(obj.params.id) || 0;
	if (id) {
		const open = editor.openShareDialog;
		editor.loading = true;
		get(
			obj.params.id as string,
			'designs',
			(state) => {
				project.$reset();

				// editor.loading = false;
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

				// editor.loading = false;

				if (state) {
					project.$patch({
						...state,
						keywords: state.keywords.join(', ')
					});
					project.resetStack();
					fitToScreen();
				}
			},
			(error) => {
				notice.send(error.response?.data?.message || error.message, 'error');
				editor.loading = false;
			}
		);
	} else if (obj.query.photo) {
		editor.loading = true;
		get(
			obj.query.photo as string,
			'photos',
			(state) => {
				project.$reset();

				// editor.loading = false;

				if (state) {
					const size: PhotoSize = obj.query.size || 'src';
					const src = state.proxy[size];
					const { width, height } = getCroppedImageDimensions(
						state.width,
						state.height,
						size
					);
					if (src) {
						project.$patch({
							title: state.title,
							width,
							height
						});
						project.addLayer({
							type: 'image',
							src,
							left: width / 2,
							top: height / 2
						});
						project.resetStack();
						fitToScreen();
					}
				}
			},
			(error) => {
				notice.send(error.response?.data?.message || error.message, 'error');
				editor.loading = false;
			}
		);
	} else {
		project.$reset();

		const design = localStorage.getItem('design');
		if (design) {
			setTimeout(() => {
				project.$patch(JSON.parse(design));
				project.resetStack();
				fitToScreen();
			}, 20);
		}
	}
	editor.activeLayerIds = [];
	editor.openStartDialog = !!obj.query.start;
};
const onBeforeUnload = () => {
	localStorage.setItem('design', JSON.stringify(project.$state));
};

onMounted(() => {
	fetchProject(route);
	if (!userData.loggedIn) {
		window.addEventListener('beforeunload', onBeforeUnload);
	}
});
onBeforeRouteUpdate((to, from) => {
	if (to.path !== '/' && from.path === '/') {
		return;
	}
	fetchProject(to);
});
onBeforeUnmount(() => {
	window.removeEventListener('beforeunload', onBeforeUnload);
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
