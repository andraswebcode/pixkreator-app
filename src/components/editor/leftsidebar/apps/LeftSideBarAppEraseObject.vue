<script setup lang="ts">
import { ref, watch } from 'vue';
import useImage from '../../../../hooks/image';
import { useEditor, useStAI, useUser } from '../../../../store';

const userData = useUser();
const editor = useEditor();
const stai = useStAI();
const maskUrl = ref('');
const {
	currentImageProps: { id, src }
} = useImage(['id', 'src']);
const erase = () => {
	stai.mask = null;
};

watch(
	() => stai.mask,
	(newMask) => {
		if (maskUrl.value) {
			URL.revokeObjectURL(maskUrl.value);
		}
		if (newMask) {
			maskUrl.value = URL.createObjectURL(newMask);
		}
	}
);
</script>

<template>
	<LoginNotice v-if="!userData.loggedIn" />
	<VerifyEmailAlert v-else-if="!userData.user.email_verified" class="mx-3 mt-3" />
	<div v-else-if="userData.canGenerateImage && src">
		<div class="preview mb-4">
			<LazyLoadImage aspect-ratio="1" :src="src" />
			<LazyLoadImage aspect-ratio="1" :src="maskUrl" />
		</div>
		<AICreditAlert fee="erase" />
		<RangeSlider v-if="stai.drawMask" label="Eraser Width" v-model="stai.brushWidth" />
		<VRow v-if="stai.drawMask">
			<VCol>
				<VBtn block @click="stai.drawMask = ''">Done</VBtn>
			</VCol>
			<VCol>
				<VBtn block @click="stai.clearMask++">Clear</VBtn>
			</VCol>
		</VRow>
		<div v-else>
			<VBtn class="mb-5" block @click="stai.drawMask = id">Draw Mask</VBtn>
			<VBtn block :loading="editor.aiIsGenerating" :disabled="!stai.mask" @click="erase">
				Erase Object
			</VBtn>
		</div>
	</div>
	<VAlert v-else-if="userData.canGenerateImage && !src" type="warning" icon="mdi-alert-circle">
		There is no image layer on the canvas.
	</VAlert>
	<CantGenerateImageAlert v-else />
</template>

<style scoped lang="scss">
.preview {
	position: relative;
	display: block;
	width: 100%;
	padding-bottom: 100%;
}
.v-img {
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
}
</style>
