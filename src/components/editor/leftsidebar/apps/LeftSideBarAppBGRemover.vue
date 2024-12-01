<script setup lang="ts">
import { ref } from 'vue';
import useImage from '../../../../hooks/image';
import useRequest from '../../../../hooks/request';
import { useNotice, useUser } from '../../../../store';

const userData = useUser();
const notice = useNotice();
const {
	currentImageProps: { src }
} = useImage(['src']);
const { save } = useRequest();
const loading = ref(false);
const removeBackground = () => {
	if (!src.value) {
		return;
	}

	loading.value = true;

	save(
		'',
		'ai/removebackground',
		{
			src: src.value
		},
		(data) => {
			console.log(data);
			src.value = data.image;
			loading.value = false;
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
	<LoginNotice v-if="!userData.loggedIn" />
	<div v-else-if="userData.canGenerateImage && src">
		<LazyLoadImage class="mb-4" aspect-ratio="1" :src="src" />
		<VBtn block :loading="loading" @click="removeBackground">Remove Background</VBtn>
	</div>
	<VAlert v-else-if="userData.canGenerateImage && !src" type="warning" icon="mdi-alert-circle">
		There is no image layer on the canvas.
	</VAlert>
	<CantGenerateImageAlert v-else />
</template>

<style scoped lang="scss"></style>
