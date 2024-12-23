<script setup lang="ts">
import { ref, computed } from 'vue';
import { useProject, useUser } from '../../../store';
import { toFixed } from '../../../utils/functions';
import templateCategories from '../../../utils/template-categories';
import useFitToScreen from '../../../hooks/fittoscreen';

const sizes = [
	{
		label: 'Custom',
		size: ''
	}
].concat(templateCategories);
const userData = useUser();
const project = useProject();
const fitToScreen = useFitToScreen();
const tab = ref('size');
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
		<VBtn block append-icon="mdi-creation" :disabled="project.isEmpty">Generate With AI</VBtn>
	</TabItem>
</template>

<style scoped lang="scss"></style>
