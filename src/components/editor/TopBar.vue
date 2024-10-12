<script setup lang="ts">
import {
	mdiContentSave,
	mdiContentSaveCog,
	mdiDownload,
	mdiRedo,
	mdiShare,
	mdiUndo
} from '@mdi/js';
import useRequest from '../../hooks/request';
import { useRoute, useRouter } from 'vue-router';
import { useEditor, useNotice, useProject, useUser } from '../../store';
import { toRaw } from 'vue';
import { jsonToBlob } from '../../utils/json-to-blob';
import { util } from 'fabric';
import { LOGO_SRC, SHARE_IMAGE_MAX_SIZE } from '../../utils/constants';
import { createSlug } from '../../utils/functions';
import sizePresets from '../../utils/size-presets';

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
const saveTemplate = () => {
	const { title, description, keywords, width, height, background, ids, byIds } = project;
	// const multiplier = 1;
	const category = sizePresets.find((item) => item.width === width && item.height === height);

	if (!category?.slug) {
		return;
	}

	editor.loading = true;

	save(
		route.query.template as string,
		'templates',
		{
			title,
			slug: createSlug(title),
			description,
			category: category.slug,
			keywords,
			colors: '',
			fonts: '',
			width,
			height,
			background,
			layers: toRaw(byIds),
			layer_ids: toRaw(ids)
		},
		(response) => {
			console.log(response);
			editor.loading = false;
			/*
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
					const url = URL.createObjectURL(blob);
					console.log(url);
					URL.revokeObjectURL(url);
					editor.loading = false;
				})
				.catch(() => {
					notice.send('Can not create image file.', 'error');
					editor.loading = false;
				});
			*/
		},
		(error) => {
			console.warn(error);
			editor.loading = false;
		}
	);
};
</script>

<template>
	<VAppBar>
		<template v-slot:prepend>
			<VImg :src="LOGO_SRC" class="logo ml-3" />
		</template>
		<VBtn :icon="mdiUndo" v-tooltip="'Undo'" @click="project.undo" />
		<VBtn :icon="mdiRedo" v-tooltip="'Redo'" @click="project.redo" />
		<template v-slot:append>
			<VBtn :icon="mdiShare" v-tooltip="'Share'" @click="shareDesign" />
			<VBtn :icon="mdiDownload" v-tooltip="'Download'" @click="downloadDesign" />
			<VBtn :icon="mdiContentSave" v-tooltip="'Save'" @click="saveDesign" />
			<VBtn
				v-if="userData.user.admin"
				:icon="mdiContentSaveCog"
				v-tooltip="'Save as Template'"
				@click="saveTemplate"
			/>
			<VDivider />
			<UserMenu />
		</template>
	</VAppBar>
	<ShareDialog />
	<DownloadDialog />
	<LoginDialog />
</template>

<style scoped lang="scss">
.logo {
	width: 80px;
}
</style>
