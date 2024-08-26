<script setup lang="ts">
import { ref, toRaw, watch } from 'vue';
import { useEditor, useProject } from '../../../store';
import { jsonToBlob } from '../../../utils/json-to-blob';
import { MimeType } from '../../../types/common';
import { formatBlobSize } from '../../../utils/functions';

const editor = useEditor();
const project = useProject();
const src = ref('');
const type = ref<MimeType>('image/png');
const name = ref('');
const quality = ref(0.98);
const size = ref('');

watch<[boolean, MimeType, number]>(
	() => [editor.openDownloadDialog, type.value, quality.value],
	([open, type, quality]) => {
		if (!open) {
			return;
		}

		jsonToBlob(
			{
				width: project.width,
				height: project.height,
				background: project.background,
				objects: project.ids.map((id) => toRaw(project.byIds[id]))
			},
			type,
			quality
		).then((blob) => {
			src.value = URL.createObjectURL(blob);
			size.value = formatBlobSize(blob.size);
		});
	}
);
</script>

<template>
	<PersistentHeaderDialog
		title="Download Image"
		v-model="editor.openDownloadDialog"
		@close="editor.openDownloadDialog = false"
	>
		<VContainer>
			<VRow>
				<VCol cols="8" align-self="center">
					<VImg aspect-ratio="1.5" :src="src" />
				</VCol>
				<VCol cols="4">
					<VTextField label="File Name" v-model="name" />
					<VBtnToggle color="primary" v-model="type">
						<VBtn value="image/png">PNG</VBtn>
						<VBtn value="image/jpeg">JPEG</VBtn>
						<VBtn value="image/webp">WEBP</VBtn>
					</VBtnToggle>
					<VSlider
						v-if="type !== 'image/png'"
						label="Quality"
						min="0"
						max="1"
						step="0.01"
						v-model="quality"
					/>
					<VDivider class="my-8" />
					<div>
						Size:
						<VChip>
							{{ size }}
						</VChip>
					</div>
				</VCol>
			</VRow>
		</VContainer>
		<template v-slot:actions>
			<VBtn>Download</VBtn>
		</template>
	</PersistentHeaderDialog>
</template>

<style scoped lang="scss"></style>
