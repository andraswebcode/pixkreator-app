<script setup lang="ts">
import { ref, computed } from 'vue';
import { useEditor, useNotice, useProject, useUser } from '../../../store';
import { toFixed } from '../../../utils/functions';
import templateCategories from '../../../utils/template-categories';
import useFitToScreen from '../../../hooks/fittoscreen';
import useRequest from '../../../hooks/request';
import { jsonToBlob } from '../../../utils/json-to-blob';
import { SMALL_DIALOG_WIDTH } from '../../../utils/constants';
import { getConfirmText } from '../../../utils/ai-credits';

const sizes = [
	{
		label: 'Custom',
		size: ''
	}
].concat(templateCategories);
const userData = useUser();
const editor = useEditor();
const project = useProject();
const notice = useNotice();
const fitToScreen = useFitToScreen();
const { save } = useRequest();
const tab = ref('size');
const showGoal = ref(false);
const goalMessage = ref('');
const width = computed({
	get: () => project.width,
	set: (value: any) => {
		project.width = toFixed(value);
	}
});
const height = computed({
	get: () => project.height,
	set: (value: any) => {
		project.height = toFixed(value);
	}
});
const size = computed({
	get: () => {
		const size = `${project.width}x${project.height}`;
		const isPreset = templateCategories.some((preset) => preset.size === size);
		if (isPreset) {
			return size;
		}
		return '';
	},
	set: (value: string) => {
		const [w, h] = value.split('x');
		const width = toFixed(w);
		const height = toFixed(h);
		if (width && height) {
			project.$patch({
				width,
				height
			});
		}
	}
});
const generateMeta = () => {
	if (!confirm(getConfirmText('assistant-design-meta', userData.user.ai_credits))) {
		return;
	}

	editor.aiIsGenerating = true;

	const _save = (base64) => {
		save(
			'',
			'ai/assistant',
			{
				task: 'design-meta',
				messages: {
					'user-1': goalMessage.value,
					'user-2': base64
				}
			},
			({ title, description, ...data }) => {
				console.log(data);
				project.$patch({
					title,
					description
				});
				editor.aiIsGenerating = false;
				showGoal.value = false;
			},
			(error) => {
				console.log(error);
				editor.aiIsGenerating = false;
				showGoal.value = false;
				notice.send(error.response?.data?.message || error.message, 'error');
			}
		);
	};

	jsonToBlob({
		width: project.width,
		height: project.height,
		background: project.background,
		objects: project.fabricJSON
	}).then((blob) => {
		const reader = new FileReader();
		reader.readAsDataURL(blob);
		reader.onloadend = () => {
			_save(reader.result);
		};
	});
};
</script>

<template>
	<VTabs v-model="tab">
		<VTab value="size" v-tooltip:top="'Size'">
			<VIcon icon="mdi-resize" />
		</VTab>
		<VTab value="background" v-tooltip:top="'Background'">
			<VIcon icon="mdi-format-color-fill" />
		</VTab>
		<VTab value="meta" v-tooltip:top="'Meta'">
			<VIcon icon="mdi-file-document" />
		</VTab>
	</VTabs>
	<TabItem v-if="tab === 'size'">
		<InputGroup>
			<VTextField type="number" label="Width" v-model="width" />
			<VTextField type="number" label="Height" v-model="height" />
		</InputGroup>
		<VSelect
			label="Size Presets"
			:items="sizes"
			item-value="size"
			v-model="size"
			@update:model-value="fitToScreen()"
		/>
	</TabItem>
	<TabItem v-else-if="tab === 'background'">
		<ColorPicker label="Canvas Background" clearable v-model="project.background" />
	</TabItem>
	<TabItem v-else-if="tab === 'meta'">
		<VTextField label="Title" v-model="project.title" />
		<VTextarea label="Description" v-model="project.description" />
		<VTextarea v-if="userData.user.admin" label="Keywords" v-model="project.keywords" />
		<VBtn
			block
			append-icon="mdi-creation"
			:loading="editor.aiIsGenerating"
			:disabled="project.isEmpty"
			@click="showGoal = true"
		>
			Generate With AI
		</VBtn>
	</TabItem>
	<PersistentHeaderDialog
		title="Tell About Your Goal"
		:max-width="SMALL_DIALOG_WIDTH"
		auto-height
		v-model="showGoal"
		@close="showGoal = false"
	>
		<p class="mx-1 mb-4">
			Define the specific goal of this design. Is it part of a campaign? An event invitation?
			A product launch? On which platform will it be published?
		</p>
		<VTextarea
			v-if="showGoal"
			label="Tell About Your Goal"
			hide-details
			v-model="goalMessage"
		/>
		<template v-slot:actions>
			<VBtn
				block
				variant="tonal"
				append-icon="mdi-creation"
				:loading="editor.aiIsGenerating"
				@click="generateMeta"
			>
				Generate
			</VBtn>
		</template>
	</PersistentHeaderDialog>
</template>

<style scoped lang="scss"></style>
