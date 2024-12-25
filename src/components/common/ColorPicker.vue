<script setup lang="ts">
import { computed, ref } from 'vue';
import { useEditor, useNotice, useUser } from '../../store';
import { getConfirmText } from '../../utils/ai-credits';
import useRequest from '../../hooks/request';

const properties = defineProps<{
	label: string;
	disabled?: boolean;
	clearable?: boolean;
	hideBrand?: boolean;
}>();
const model = defineModel<string>();
const userData = useUser();
const editor = useEditor();
const notice = useNotice();
const { save } = useRequest();
const tab = ref(userData.isProPlan ? 'brand' : 'palette');
const swatches = [
	['#FFFFFF', '#BFBFBF', '#7F7F7F', '#3F3F3F', '#000000'], // Black to White
	['#FF0000', '#CC0000', '#990000', '#660000', '#330000'], // Red
	['#FF7F00', '#CC6600', '#994C00', '#663300', '#331900'], // Orange
	['#FFFF00', '#CCCC00', '#999900', '#666600', '#333300'], // Yellow
	['#00FF00', '#00CC00', '#009900', '#006600', '#003300'], // Green
	['#00FFFF', '#00CCCC', '#009999', '#006666', '#003333'], // Cyan
	['#0000FF', '#0000CC', '#000099', '#000066', '#000033'], // Blue
	['#7F00FF', '#6600CC', '#4C0099', '#330066', '#190033'], // Violet
	['#FF00FF', '#CC00CC', '#990099', '#660066', '#330033'], // Magenta
	['#800080', '#660066', '#4C004C', '#330033', '#190019'] // Purple
];
const brandSwatches = computed(() =>
	(userData.user.brand_colors || []).map(({ color }) => [color])
);
const loading = ref(false);
const prompt = ref('');
const moodSwatches = ref<string[][]>([]);
const addToBrandColors = () => {
	const currentColors = userData.user.brand_colors || [];
	const color = model.value || '';

	if (currentColors.find((item) => item.color === color)) {
		notice.send('This color is already exists in your brand colors.', 'warning');
		return;
	}

	const colors = currentColors.concat([
		{
			name: '',
			color
		}
	]);

	loading.value = true;

	save(
		'',
		'usermeta',
		{
			key: 'brand_colors',
			value: JSON.stringify(colors)
		},
		({ meta_key, meta_value }) => {
			notice.send('Brand color palette updated successfully.', 'success');
			userData.setAndSave(meta_key, JSON.parse(meta_value));
			loading.value = false;
		},
		(error) => {
			notice.send(error.response?.data?.message || error.message, 'error');
			loading.value = false;
		}
	);
};
const generateColors = () => {
	if (!confirm(getConfirmText('assistant-mood-to-color', userData.user.ai_credits))) {
		return;
	}

	editor.aiIsGenerating = true;
	save(
		'',
		'ai/assistant',
		{
			task: 'mood-to-color',
			messages: {
				'user-1': prompt.value
			}
		},
		({ colors }) => {
			console.log(colors);
			editor.aiIsGenerating = false;
			moodSwatches.value = colors.map(({ color }) => [color]);
		},
		(error) => {
			console.log(error);
			editor.aiIsGenerating = false;
			notice.send(error.response?.data?.message || error.message, 'error');
		}
	);
};
</script>

<template>
	<VMenu :close-on-content-click="false">
		<template v-slot:activator="{ props }">
			<VTextField
				:label="properties.label"
				dirty
				readonly
				:clearable="properties.clearable"
				clear-icon="mdi-close-circle"
				:disabled="properties.disabled"
				v-model="model"
				v-bind="props"
			>
				<template v-slot:prepend-inner>
					<VIcon icon="mdi-square" :color="model" />
				</template>
			</VTextField>
		</template>
		<VCard max-width="300">
			<VTabs v-model="tab" fixed-tabs density="compact" grow>
				<VTab
					v-if="userData.isProPlan && !properties.hideBrand"
					v-tooltip="'Brand Colors'"
					value="brand"
					size="x-small"
					min-width="0"
				>
					<VIcon icon="mdi-palette-swatch-variant" />
				</VTab>
				<VTab v-tooltip="'Color Palette'" value="palette" size="x-small" min-width="0">
					<VIcon icon="mdi-palette" />
				</VTab>
				<VTab v-tooltip="'Color Picker'" value="picker" size="x-small" min-width="0">
					<VIcon icon="mdi-eyedropper" />
				</VTab>
				<VTab v-tooltip="'Mood to Color'" value="ai" size="x-small" min-width="0">
					<VIcon icon="mdi-creation" />
				</VTab>
			</VTabs>
			<VDivider />
			<TabItem v-if="tab === 'brand' && userData.isProPlan && !properties.hideBrand">
				<VColorPicker
					hide-canvas
					hide-sliders
					hide-inputs
					elevation="0"
					rounded="0"
					show-swatches
					:swatches="brandSwatches"
					swatches-max-height="328px"
					v-model="model"
				/>
			</TabItem>
			<TabItem v-if="tab === 'palette'">
				<VColorPicker
					hide-canvas
					hide-sliders
					hide-inputs
					elevation="0"
					rounded="0"
					show-swatches
					:swatches="swatches"
					swatches-max-height="328px"
					v-model="model"
				/>
				<VBtn
					v-if="userData.isProPlan && !properties.hideBrand"
					block
					size="small"
					:loading="loading"
					@click="addToBrandColors"
				>
					Add to Brand Colors
				</VBtn>
			</TabItem>
			<TabItem v-if="tab === 'picker'">
				<VColorPicker v-model="model" elevation="0" rounded="0" />
				<VBtn
					v-if="userData.isProPlan && !properties.hideBrand"
					block
					size="small"
					:loading="loading"
					@click="addToBrandColors"
				>
					Add to Brand Colors
				</VBtn>
			</TabItem>
			<TabItem v-if="tab === 'ai' && userData.canGenerateImage">
				<VTextField
					class="mx-4 mt-4"
					label="Mood to Color"
					hint="Describe a mood or vibe to generate matching colors."
					placeholder="e.g. blue sky at dusk..."
					width="268"
					persistent-hint
					:hide-details="false"
					:disabled="editor.aiIsGenerating"
					variant="underlined"
					density="compact"
					flat
					dirty
					v-model="prompt"
				/>
				<VColorPicker
					v-if="moodSwatches.length"
					hide-canvas
					hide-sliders
					hide-inputs
					elevation="0"
					rounded="0"
					show-swatches
					:swatches="moodSwatches"
					swatches-max-height="328px"
					v-model="model"
				/>
				<VBtn
					class="mb-2"
					block
					size="small"
					append-icon="mdi-creation"
					:disabled="!prompt"
					:loading="editor.aiIsGenerating"
					@click="generateColors"
				>
					Generate
				</VBtn>
				<VBtn
					v-if="userData.isProPlan && !properties.hideBrand"
					block
					size="small"
					:disabled="!moodSwatches.length"
					:loading="loading"
					@click="addToBrandColors"
				>
					Add to Brand Colors
				</VBtn>
			</TabItem>
			<TabItem v-else-if="tab === 'ai' && !userData.loggedIn">
				<LoginNotice />
			</TabItem>
			<TabItem v-else-if="tab === 'ai' && !userData.canGenerateImage">
				<CantGenerateImageAlert />
			</TabItem>
		</VCard>
	</VMenu>
</template>

<style scoped lang="scss">
.v-text-field * {
	cursor: pointer;
}
</style>
