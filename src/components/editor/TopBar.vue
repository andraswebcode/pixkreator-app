<script setup lang="ts">
import { mdiContentSave, mdiDownload, mdiRedo, mdiShare, mdiUndo } from '@mdi/js';
import useRequest from '../../hooks/request';
import { useRoute, useRouter } from 'vue-router';
import { useEditor, useNotice, useProject, useUser } from '../../store';
import { toRaw } from 'vue';
import { jsonToBlob } from '../../utils/json-to-blob';
import { util } from 'fabric';
import { SHARE_IMAGE_MAX_SIZE } from '../../utils/constants';

const { save, updateFile } = useRequest();
const userData = useUser();
const route = useRoute();
const router = useRouter();
const project = useProject();
const editor = useEditor();
const notice = useNotice();
const shareDesign = () => {
	if (userData.loggedIn) {
		editor.openShareDialog = true;
	} else {
		editor.openLoginDialog = true;
	}
};
const downloadDesign = () => {
	if (userData.loggedIn) {
		editor.openDownloadDialog = true;
	} else {
		editor.openLoginDialog = true;
	}
};
const saveDesign = () => {
	if (!userData.loggedIn) {
		editor.openLoginDialog = true;
		return;
	}
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
				localStorage.removeItem('design');
			},
			(error) => {
				editor.loading = false;
				notice.send(error.response?.data?.message || error.message, 'error');
			}
		);
	};

	editor.loading = true;
	if (status === 'public' && upload_id) {
		const multiplier = util.findScaleToFit(
			{
				width: project.width,
				height: project.height
			},
			{
				width: SHARE_IMAGE_MAX_SIZE,
				height: SHARE_IMAGE_MAX_SIZE
			}
		);

		jsonToBlob(
			{
				width,
				height,
				background,
				objects: ids.map((id) => toRaw(byIds[id]))
			},
			'image/webp',
			0.98,
			Math.min(multiplier, 1)
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
			<VBtn :icon="mdiShare" v-tooltip="'Share'" @click="shareDesign" />
			<VBtn :icon="mdiDownload" v-tooltip="'Download'" @click="downloadDesign" />
			<VBtn :icon="mdiContentSave" v-tooltip="'Save'" @click="saveDesign" />
			<VDivider />
			<UserMenu />
		</template>
	</VAppBar>
	<ShareDialog />
	<DownloadDialog />
	<LoginDialog />
</template>

<style scoped lang="scss"></style>
