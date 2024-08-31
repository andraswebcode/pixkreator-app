<script setup lang="ts">
import { mdiContentSave, mdiDownload, mdiRedo, mdiShare, mdiUndo } from '@mdi/js';
import useRequest from '../../hooks/request';
import { useRoute, useRouter } from 'vue-router';
import { useEditor, useNotice, useProject } from '../../store';
import { toRaw } from 'vue';
import { jsonToBlob } from '../../utils/json-to-blob';

const { save, updateFile } = useRequest();
const route = useRoute();
const router = useRouter();
const project = useProject();
const editor = useEditor();
const notice = useNotice();
const saveDesign = () => {
	const { title, description, status, upload_id, width, height, background, byIds, ids } =
		project;
	const _save = () => {
		save(
			route.params.id as string,
			'designs',
			{
				title,
				description,
				status,
				upload_id,
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
				editor.loading = false;
				notice.send(error.response?.data?.message || error.message, 'error');
			}
		);
	};

	editor.loading = true;
	if (status === 'public' && upload_id) {
		jsonToBlob(
			{
				width,
				height,
				background,
				objects: ids.map((id) => toRaw(byIds[id]))
			},
			'image/webp',
			0.98
		)
			.then((blob) => {
				const data = new FormData();
				data.append('file', blob);

				updateFile(
					upload_id as any,
					data,
					() => {
						_save();
					},
					(error) => {
						editor.loading = false;
						notice.send(error.response?.data?.message || error.message, 'error');
					}
				);
			})
			.catch(() => {
				notice.send('Can not create image file.', 'error');
			});
	} else {
		_save();
	}
};
</script>

<template>
	<VAppBar>
		<template v-slot:prepend></template>
		<VBtn :icon="mdiUndo" v-tooltip="'Undo'" @click="project.undo" />
		<VBtn :icon="mdiRedo" v-tooltip="'Redo'" @click="project.redo" />
		<template v-slot:append>
			<VBtn :icon="mdiShare" v-tooltip="'Share'" @click="editor.openShareDialog = true" />
			<VBtn
				:icon="mdiDownload"
				v-tooltip="'Download'"
				@click="editor.openDownloadDialog = true"
			/>
			<VBtn :icon="mdiContentSave" v-tooltip="'Save'" @click="saveDesign" />
			<VDivider />
			<UserMenu />
		</template>
	</VAppBar>
	<ShareDialog />
	<DownloadDialog />
</template>

<style scoped lang="scss"></style>
