<script setup lang="ts">
import { computed, ref } from 'vue';
import {
	imageModels,
	openaiQualities,
	openaiSizes,
	openaiStyles,
	staiAspectRatios,
	staiOutputFormats,
	staiStylePresets
} from '../../../utils/ai-params';
import axios from '../../../axios';
import { useEditor, useNotice, useProject, useUser } from '../../../store';
import useFitToScreen from '../../../hooks/fittoscreen';
import { AICreditFeeKey, getConfirmText } from '../../../utils/ai-credits';
import { ImageModel } from '../../../types/ai';

const userData = useUser();
const editor = useEditor();
const project = useProject();
const notice = useNotice();
const model = ref<ImageModel>('stable-image-core');
const prompt = ref('');
const nPrompt = ref('');
const staiFormat = ref('webp');
const staiStyle = ref('');
const staiAspect = ref('1:1');
const openaiQuality = ref('standard');
const openaiSize = ref('1024x1024');
const openaiStyle = ref('vivid');
const image = ref('');
const width = ref(0);
const height = ref(0);
const resize = ref(false);
const generateAction = computed<AICreditFeeKey>(() => {
	if (model.value === 'dall-e-3') {
		return ('generate-dall-e-3--' +
			openaiQuality.value +
			'--' +
			openaiSize.value) as AICreditFeeKey;
	}
	return ('generate-' + model.value) as AICreditFeeKey;
});
const fitToScreen = useFitToScreen();
const generate = () => {
	if (!confirm(getConfirmText(generateAction.value, userData.user.ai_credits))) {
		return;
	}

	editor.aiIsGenerating = true;

	axios
		.post(
			'ai/generate',
			{
				model: model.value,
				prompt: prompt.value,
				negative_prompt: nPrompt.value,
				output_format: staiFormat.value,
				style_preset: staiStyle.value,
				aspect_ratio: staiAspect.value,
				quality: openaiQuality.value,
				size: openaiSize.value,
				style: openaiStyle.value
			},
			{
				headers: {
					Authorization: userData.bearerToken
				}
			}
		)
		.then(({ data }) => {
			console.log(data);
			const creditKey = model.value === 'dall-e-3' ? 'openai_credits' : 'stai_credits';

			image.value = data.image;
			width.value = data.width;
			height.value = data.height;
			editor.aiIsGenerating = false;
			userData.setAndSave('ai_credits', data.ai_credits);
			userData.setAndSave(creditKey, data[creditKey] || 0);
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
		<VSelect label="Model" :items="imageModels" v-model="model" />
		<VTextarea label="Prompt" rows="3" :disabled="editor.aiIsGenerating" v-model="prompt" />
		<VTextarea
			v-if="model === 'stable-image-core' || model === 'stable-image-ultra'"
			label="Negative Prompt"
			rows="1"
			:disabled="editor.aiIsGenerating"
			v-model="nPrompt"
		/>
		<VSelect
			v-if="model === 'stable-image-core' || model === 'stable-image-ultra'"
			label="Image Format"
			:disabled="editor.aiIsGenerating"
			:items="staiOutputFormats"
			v-model="staiFormat"
		/>
		<VSelect
			v-if="model === 'stable-image-core'"
			label="Style Preset"
			:disabled="editor.aiIsGenerating"
			:items="staiStylePresets"
			v-model="staiStyle"
		/>
		<VSelect
			v-if="model === 'stable-image-core' || model === 'stable-image-ultra'"
			label="Aspect Ratio"
			:disabled="editor.aiIsGenerating"
			:items="staiAspectRatios"
			v-model="staiAspect"
		/>
		<VSelect
			v-if="model === 'dall-e-3'"
			label="Quality"
			:items="openaiQualities"
			v-model="openaiQuality"
		/>
		<VSelect
			v-if="model === 'dall-e-3'"
			label="Size"
			:items="openaiSizes"
			v-model="openaiSize"
		/>
		<VSelect
			v-if="model === 'dall-e-3'"
			label="Style"
			:items="openaiStyles"
			v-model="openaiStyle"
		/>
		<VBtn block append-icon="mdi-creation" :loading="editor.aiIsGenerating" @click="generate">
			Generate Image
		</VBtn>
	</div>
	<div v-else-if="userData.canGenerateImage && image" class="pa-4">
		<VImg :src="image" max-height="40vh" />
		<VSwitch label="Resize Canvas to Image Size" v-model="resize" />
		<VBtn block @click="addImage">Add Image to Canvas</VBtn>
	</div>
	<CantGenerateImageAlert v-else class="mx-3 mt-3" />
</template>

<style scoped lang="scss"></style>
