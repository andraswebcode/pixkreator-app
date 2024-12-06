<script setup lang="ts">
import useImage from '../../../../hooks/image';
import useRequest from '../../../../hooks/request';
import { useEditor, useNotice, useUser } from '../../../../store';
import { getConfirmText } from '../../../../utils/ai-credits';

const userData = useUser();
const notice = useNotice();
const editor = useEditor();
const {
	currentImageProps: { src, width, height, scaleX, scaleY }
} = useImage(['src', 'width', 'height', 'scaleX', 'scaleY']);
const { save } = useRequest();
const upscale = () => {
	if (!src.value) {
		return;
	}

	if (!confirm(getConfirmText('upscale'))) {
		return;
	}

	editor.aiIsGenerating = true;

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
			editor.aiIsGenerating = false;
			userData.setAndSave('stai_credits', data.stai_credits || 0);
			notice.send('Image scaled successfully.', 'success');
		},
		(error) => {
			console.warn(error);
			notice.send(error.response?.data?.message || error.message, 'error');
			editor.aiIsGenerating = false;
		}
	);
};
</script>

<template>
	<LoginNotice v-if="!userData.loggedIn" />
	<VerifyEmailAlert v-else-if="!userData.user.email_verified" class="mx-3 mt-3" />
	<div v-else-if="userData.canGenerateImage && src">
		<LazyLoadImage class="mb-4" aspect-ratio="1" :src="src" />
		<AICreditAlert fee="upscale" />
		<VBtn block :loading="editor.aiIsGenerating" @click="upscale">Upscale 4x</VBtn>
	</div>
	<VAlert v-else-if="userData.canGenerateImage && !src" type="warning" icon="mdi-alert-circle">
		There is no image layer on the canvas.
	</VAlert>
	<CantGenerateImageAlert v-else />
</template>

<style scoped lang="scss"></style>
