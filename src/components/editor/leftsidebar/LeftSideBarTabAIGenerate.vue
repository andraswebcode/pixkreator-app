<script setup lang="ts">
import { ref } from 'vue';
import { aspectRatios, outputFormats, stylePresets } from '../../../utils/ai-params';
import axios from '../../../axios';
import { useEditor, useNotice, useProject, useUser } from '../../../store';
import useFitToScreen from '../../../hooks/fittoscreen';
import { getConfirmText } from '../../../utils/ai-credits';

const userData = useUser();
const editor = useEditor();
const project = useProject();
const notice = useNotice();
const prompt = ref('');
const nPrompt = ref('');
const format = ref('webp');
const style = ref('');
const aspect = ref('1:1');
const image = ref('');
const width = ref(0);
const height = ref(0);
const resize = ref(false);
const fitToScreen = useFitToScreen();
const generate = () => {
	if (!confirm(getConfirmText('generate'))) {
		return;
	}

	editor.aiIsGenerating = true;

	axios
		.post(
			'ai/generate',
			{
				prompt: prompt.value,
				negative_prompt: nPrompt.value,
				output_format: format.value,
				style_preset: style.value,
				aspect_ratio: aspect.value
			},
			{
				headers: {
					Authorization: userData.bearerToken
				}
			}
		)
		.then(({ data }) => {
			console.log(data);

			image.value = data.image;
			width.value = data.width;
			height.value = data.height;
			editor.aiIsGenerating = false;
			userData.setAndSave('stai_credits', data.stai_credits || 0);
			notice.send('Image saved successfully', 'success');
		})
		.catch((error) => {
			console.warn(error);

			editor.aiIsGenerating = false;
			notice.send(error.response?.data?.message || error.message, 'error');
		});
};
const addImage = () => {
	if (resize.value) {
		project.$patch({
			width: width.value,
			height: height.value
		});
	}
	project.addLayer({
		type: 'image',
		src: image.value,
		left: project.width / 2,
		top: project.height / 2
	});
	image.value = '';
	fitToScreen();
};
</script>

<template>
	<VerifyEmailAlert v-if="!userData.user.email_verified" class="mx-3 mt-3" />
	<div v-else-if="userData.canGenerateImage && !image" class="pa-4">
		<VTextarea label="Prompt" rows="3" :disabled="editor.aiIsGenerating" v-model="prompt" />
		<VTextarea
			label="Negative Prompt"
			rows="1"
			:disabled="editor.aiIsGenerating"
			v-model="nPrompt"
		/>
		<VSelect
			label="Image Format"
			:disabled="editor.aiIsGenerating"
			:items="outputFormats"
			v-model="format"
		/>
		<VSelect
			label="Style Preset"
			:disabled="editor.aiIsGenerating"
			:items="stylePresets"
			v-model="style"
		/>
		<VSelect
			label="Aspect Ratio"
			:disabled="editor.aiIsGenerating"
			:items="aspectRatios"
			v-model="aspect"
		/>
		<AICreditAlert fee="generate" />
		<VBtn block :loading="editor.aiIsGenerating" @click="generate">Generate Image</VBtn>
	</div>
	<div v-else-if="userData.canGenerateImage && image" class="pa-4">
		<VImg :src="image" max-height="40vh" />
		<VSwitch label="Resize Canvas to Image Size" v-model="resize" />
		<VBtn block @click="addImage">Add Image to Canvas</VBtn>
	</div>
	<CantGenerateImageAlert v-else class="mx-3 mt-3" />
</template>

<style scoped lang="scss"></style>
