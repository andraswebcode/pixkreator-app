<script setup lang="ts">
import { onUnmounted, ref } from 'vue';
import { uploadFile } from '../../../utils/upload-file';
import useRequest from '../../../hooks/request';
import { useNotice, useProject } from '../../../store';
import useFitToScreen from '../../../hooks/fittoscreen';

const { save } = useRequest();
const fitToScreen = useFitToScreen();
const notice = useNotice();
const project = useProject();
const imgRef = ref<any>(null);
const src = ref('');
const imgUrl = ref('');
const resize = ref(false);
const loading = ref(false);
const upload = () => {
	uploadFile(['image/jpeg', 'image/png', 'image/webp'])
		.then((response) => {
			const blob = response?.[0];

			if (!blob) {
				return;
			}

			loading.value = true;
			src.value = URL.createObjectURL(blob);

			const data = new FormData();

			data.append('file', blob);
			data.append('source', 'uploads');

			save(
				'',
				'uploads',
				data,
				(state) => {
					imgUrl.value = state.image;
					notice.send('Image saved successfully', 'success');
					loading.value = false;
				},
				(error) => {
					console.warn(error);
					notice.send(error.response?.data?.message || error.message, 'error');
					URL.revokeObjectURL(src.value);
					src.value = '';
					loading.value = false;
				}
			);
		})
		.catch((error) => {
			console.error(error);
			notice.send('Image upload failed.', 'error');
			loading.value = false;
		});
};
const addImage = () => {
	const { naturalWidth = 0, naturalHeight = 0 } = imgRef.value?.image || {};
	if (resize.value) {
		project.$patch({
			width: naturalWidth,
			height: naturalHeight
		});
	}
	project.addLayer({
		type: 'image',
		src: imgUrl.value,
		left: project.width / 2,
		top: project.height / 2
	});
	src.value = '';
	fitToScreen();
};

onUnmounted(() => {
	URL.revokeObjectURL(src.value);
});
</script>

<template>
	<LibraryWrapper>
		<div class="pa-4">
			<VBtn class="mb-4" block @click="upload">Upload From Computer</VBtn>
			<VImg ref="imgRef" :class="{ 'mb-4': !loading }" :src="src" />
			<VProgressLinear v-if="loading" class="mb-4" indeterminate />
			<VSwitch v-if="src && !loading" label="Resize Canvas to Image Size" v-model="resize" />
			<VBtn v-if="src && !loading" block @click="addImage">Add Image to Canvas</VBtn>
		</div>
	</LibraryWrapper>
</template>

<style scoped lang="scss"></style>
