<script setup lang="ts">
import useImage from '../../../../hooks/image';
import useRequest from '../../../../hooks/request';
import { useEditor, useNotice, useUser } from '../../../../store';
import { getConfirmText } from '../../../../utils/ai-credits';

const userData = useUser();
const notice = useNotice();
const editor = useEditor();
const {
	currentImageProps: { src }
} = useImage(['src']);
const { save } = useRequest();
const removeBackground = () => {
	if (!src.value) {
		return;
	}

	if (!confirm(getConfirmText('removebg', userData.user.ai_credits))) {
		return;
	}

	editor.aiIsGenerating = true;

	save(
		'',
		'ai/removebackground',
		{
			src: src.value
		},
		(data) => {
			console.log(data);
			src.value = data.image;
			editor.aiIsGenerating = false;
			userData.setAndSave('stai_credits', data.stai_credits || 0);
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
		<LazyLoadImage class="mb-4" aspect-ratio="2" :src="src" />
		<VBtn
			block
			append-icon="mdi-creation"
			:loading="editor.aiIsGenerating"
			@click="removeBackground"
		>
			Remove Background
		</VBtn>
	</div>
	<VAlert v-else-if="userData.canGenerateImage && !src" type="warning" icon="mdi-alert-circle">
		There is no image layer on the canvas.
	</VAlert>
	<CantGenerateImageAlert v-else />
</template>

<style scoped lang="scss"></style>
