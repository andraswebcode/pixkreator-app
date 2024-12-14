<script setup lang="ts">
import { ref, watch } from 'vue';
import useImage from '../../../../hooks/image';
import { useEditor, useNotice, useStAI, useUser } from '../../../../store';
import { getConfirmText } from '../../../../utils/ai-credits';
import useRequest from '../../../../hooks/request';

const userData = useUser();
const editor = useEditor();
const notice = useNotice();
const stai = useStAI();
const maskUrl = ref('');
const {
	currentImageProps: { src }
} = useImage(['src']);
const { save } = useRequest();
const erase = () => {
	if (!src.value) {
		return;
	}

	if (!confirm(getConfirmText('erase'))) {
		return;
	}

	editor.aiIsGenerating = true;

	const data = new FormData();
	data.append('src', src.value);
	data.append('mask', stai.mask as Blob);

	save(
		'',
		'ai/erase',
		data,
		(data) => {
			console.log(data);
			src.value = data.image;
			editor.aiIsGenerating = false;
			stai.alphaMask = null;
			stai.mask = null;
			userData.setAndSave('stai_credits', data.stai_credits || 0);
		},
		(error) => {
			console.warn(error);
			notice.send(error.response?.data?.message || error.message, 'error');
			editor.aiIsGenerating = false;
			stai.alphaMask = null;
			stai.mask = null;
		}
	);
};

watch(
	() => stai.alphaMask,
	(newMask) => {
		if (maskUrl.value) {
			URL.revokeObjectURL(maskUrl.value);
		}
		if (newMask) {
			maskUrl.value = URL.createObjectURL(newMask);
		} else {
			maskUrl.value = '';
		}
	}
);
</script>

<template>
	{{ stai.$state }}
	<LoginNotice v-if="!userData.loggedIn" />
	<VerifyEmailAlert v-else-if="!userData.user.email_verified" class="mx-3 mt-3" />
	<div v-else-if="userData.canGenerateImage && src">
		<div class="preview mb-4">
			<LazyLoadImage aspect-ratio="1" :src="src" />
			<LazyLoadImage v-if="maskUrl" aspect-ratio="1" :src="maskUrl" />
		</div>
		<AICreditAlert fee="erase" />
		<RangeSlider
			v-if="stai.drawMask"
			label="Eraser Width"
			:min="1"
			:max="200"
			v-model="stai.brushWidth"
		/>
		<VRow v-if="stai.drawMask">
			<VCol>
				<VBtn block @click="stai.drawMask = false">Done</VBtn>
			</VCol>
			<VCol>
				<VBtn block @click="stai.clearMask++">Clear</VBtn>
			</VCol>
		</VRow>
		<div v-else>
			<VBtn class="mb-5" block @click="stai.drawMask = true">Draw Mask</VBtn>
			<VBtn block :loading="editor.aiIsGenerating" :disabled="!stai.alphaMask" @click="erase">
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
