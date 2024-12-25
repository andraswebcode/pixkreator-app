<script setup lang="ts">
import { ref, shallowRef, watch } from 'vue';
import { VFileUpload, VFileUploadItem } from 'vuetify/labs/components';
import useRequest from '../../hooks/request';
import { useNotice } from '../../store';
import { isValidMimeType } from '../../utils/functions';
import { MimeType } from '../../types/common';

const emit = defineEmits(['add']);
const { save } = useRequest();
const notice = useNotice();
const items = ref<any>({});
const loadings = ref<any>({});
const files = shallowRef<File[]>([]);

watch(
	() => files.value,
	(newFiles) => {
		newFiles.forEach((file) => {
			if (!isValidMimeType(file.type as MimeType)) {
				return;
			}

			loadings.value[file.name] = true;

			const img = new Image();
			const url = URL.createObjectURL(file);

			img.src = url;

			img.onload = () => {
				const data = new FormData();

				data.append('file', file);
				data.append('source', 'uploads');
				data.append('width', img.width as any);
				data.append('height', img.height as any);

				save(
					'',
					'uploads',
					data,
					(state) => {
						console.log(state);
						items.value[file.name] = state;
						loadings.value[file.name] = false;
					},
					(error) => {
						console.warn(error);
						notice.send('Image upload failed.', 'error');
					}
				);
			};
		});
	}
);
</script>

<template>
	<VFileUpload multiple density="comfortable" show-size v-model="files">
		<template v-slot:item="{ file }">
			<VFileUploadItem v-if="isValidMimeType(file.type as MimeType)">
				<template v-slot:append>
					<VBtn
						v-if="!loadings[file.name]"
						icon="mdi-plus"
						density="compact"
						@click="emit('add', items[file.name] || {})"
					/>
				</template>
			</VFileUploadItem>
			<VProgressLinear v-if="loadings[file.name]" indeterminate />
		</template>
	</VFileUpload>
</template>

<style scoped lang="scss"></style>
