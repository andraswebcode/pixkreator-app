<script setup lang="ts">
import { ref } from 'vue';
import useImage from '../../../../hooks/image';
import useRequest from '../../../../hooks/request';
import { useNotice, useUser } from '../../../../store';

const userData = useUser();
const notice = useNotice();
const {
	currentImageProps: { src, width, height, scaleX, scaleY }
} = useImage(['src', 'width', 'height', 'scaleX', 'scaleY']);
const { save } = useRequest();
const loading = ref(false);
const upscale = () => {
	if (!src.value) {
		return;
	}

	loading.value = true;

	save(
		'',
		'ai/upscale',
		{
			src: src.value
		},
		(data) => {
			console.log(data);
			src.value = data.image;
			width.value = data.width;
			height.value = data.height;
			scaleX.value = scaleX.value / 4;
			scaleY.value = scaleY.value / 4;
			loading.value = false;
			notice.send('Image scaled successfully.', 'success');
		},
		(error) => {
			console.warn(error);
			notice.send('Error', 'error');
			loading.value = false;
		}
	);
};
</script>

<template>
	<div v-if="userData.canGenerateImage && src">
		<LazyLoadImage class="mb-4" aspect-ratio="1" :src="src" />
		<VBtn block :loading="loading" @click="upscale">Upscale 4x</VBtn>
	</div>
	<VAlert v-else-if="userData.canGenerateImage && !src" type="warning" icon="mdi-alert-circle">
		There is no image layer on the canvas.
	</VAlert>
	<CantGenerateImageAlert v-else />
</template>

<style scoped lang="scss"></style>
