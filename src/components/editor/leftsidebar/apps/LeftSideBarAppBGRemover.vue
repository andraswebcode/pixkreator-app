<script setup lang="ts">
import useImage from '../../../../hooks/image';
// import useProps from '../../../../hooks/props';
// import useRequest from '../../../../hooks/request';
import { /* useNotice, */ useUser } from '../../../../store';

const userData = useUser();
// const notice = useNotice();
// const { src } = useProps(['src']);
const { currentImage } = useImage();
// const { save } = useRequest();
const removeBackground = () => {
	/*
	if (!currentImage.value) {
		return;
	}

	save(
		'',
		'ai/removebackground',
		{
			src: currentImage.value.src
		},
		(data) => {
			console.log(data);
			src.value = data.image;
		},
		(error) => {
			console.warn(error);
			notice.send('Error', 'error');
		}
	);*/
};
</script>

<template>
	<div v-if="userData.canGenerateImage && currentImage">
		<VImg class="mb-4" aspect-ratio="1" :src="currentImage.src" />
		<VBtn block @click="removeBackground">Remove Background</VBtn>
	</div>
	<VAlert
		v-else-if="userData.canGenerateImage && !currentImage"
		type="warning"
		icon="mdi-alert-circle"
	>
		There is no image layer on the canvas.
	</VAlert>
	<CantGenerateImageAlert v-else />
</template>

<style scoped lang="scss"></style>
