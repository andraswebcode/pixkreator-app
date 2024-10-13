<script setup lang="ts">
import { computed, ref } from 'vue';
import { mdiAlertCircle } from '@mdi/js';
import { PRICING_URL } from '../../../utils/constants';
import { aspectRatios, outputFormats, stylePresets } from '../../../utils/ai-params';
import axios from '../../../axios';
import { useEditor, useNotice, useProject, useUser } from '../../../store';
import useFitToScreen from '../../../hooks/fittoscreen';

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
const canUseAI = computed(() => true);
const fitToScreen = useFitToScreen();
const generate = () => {
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
			notice.send('Image saved successfully', 'success');
		})
		.catch((error) => {
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
	<div v-if="canUseAI && !image" class="pa-4">
		<VTextarea label="Prompt" :disabled="editor.aiIsGenerating" v-model="prompt" />
		<VTextarea label="Negative Prompt" :disabled="editor.aiIsGenerating" v-model="nPrompt" />
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
		<VBtn block :loading="editor.aiIsGenerating" @click="generate">Generate Image</VBtn>
	</div>
	<div v-else-if="canUseAI && image" class="pa-4">
		<VImg :src="image" />
		<VSwitch label="Resize Canvas to Image Size" v-model="resize" />
		<VBtn block @click="addImage">Add Image to Canvas</VBtn>
	</div>
	<VAlert v-else class="mx-3 mt-3" type="warning" :icon="mdiAlertCircle">
		AI credits for image generation have run out. Please
		<RouterLink to="account/settings" target="_blank">add your own API key</RouterLink>
		or
		<a :href="PRICING_URL" target="_blank">upgrade to a paid plans</a>
		to continue.
	</VAlert>
</template>

<style scoped lang="scss"></style>
