<script setup lang="ts">
import useImage from '../../../../hooks/image';
import { useEditor, useUser } from '../../../../store';

const userData = useUser();
const editor = useEditor();
const {
	currentImageProps: { src }
} = useImage(['src']);
</script>

<template>
	<LoginNotice v-if="!userData.loggedIn" />
	<VerifyEmailAlert v-else-if="!userData.user.email_verified" class="mx-3 mt-3" />
	<div v-else-if="userData.canGenerateImage && src">
		<LazyLoadImage class="mb-4" aspect-ratio="1" :src="src" />
		<VTextarea label="Prompt" />
		<RangeSlider label="Brush Width" />
		<VBtn class="mb-5" block>Draw Mask</VBtn>
		<AICreditAlert fee="inpaint" />
		<VBtn block :loading="editor.aiIsGenerating" disabled @click="">Inpaint</VBtn>
	</div>
	<VAlert v-else-if="userData.canGenerateImage && !src" type="warning" icon="mdi-alert-circle">
		There is no image layer on the canvas.
	</VAlert>
	<CantGenerateImageAlert v-else />
</template>

<style scoped lang="scss"></style>
