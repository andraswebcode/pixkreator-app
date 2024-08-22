<script setup lang="ts">
import { mdiContentSave, mdiDownload, mdiRedo, mdiShare, mdiUndo } from '@mdi/js';
import { useRequest } from '../../hooks';
import { useRoute, useRouter } from 'vue-router';
import { useEditor, useNotice, useProject } from '../../store';
import { toRaw } from 'vue';

const { save } = useRequest();
const route = useRoute();
const router = useRouter();
const project = useProject();
const editor = useEditor();
const notice = useNotice();
const saveDesign = () => {
	const { title, description, status, width, height, background, byIds, ids } = project;

	editor.loading = true;
	save(
		route.params.id as string,
		{
			title,
			description,
			status,
			width,
			height,
			background,
			layers: toRaw(byIds),
			layer_ids: toRaw(ids)
		},
		({ id }) => {
			router.push({
				params: { id }
			});
			editor.loading = false;
			notice.send('Design Saved Successfully', 'success');
		},
		(error) => {
			console.log(error);
			editor.loading = false;
			notice.send(error.response?.data?.message || error.message, 'error');
		}
	);
};
</script>

<template>
	<VAppBar>
		<template v-slot:prepend></template>
		<VBtn :icon="mdiUndo" v-tooltip="'Undo'" @click="project.undo" />
		<VBtn :icon="mdiRedo" v-tooltip="'Redo'" @click="project.redo" />
		<template v-slot:append>
			<VBtn :icon="mdiShare" v-tooltip="'Share'" />
			<VBtn :icon="mdiDownload" v-tooltip="'Download'" />
			<VBtn :icon="mdiContentSave" v-tooltip="'Save'" @click="saveDesign" />
			<VDivider />
			<UserMenu />
		</template>
	</VAppBar>
</template>

<style scoped lang="scss"></style>
