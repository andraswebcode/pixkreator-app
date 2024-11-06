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
const panels = ref(['size']);
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
	<VExpansionPanels v-model="panels">
		<VExpansionPanel title="Size" value="size">
			<VExpansionPanelText>
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
			</VExpansionPanelText>
		</VExpansionPanel>
		<VExpansionPanel title="Meta" value="meta">
			<VExpansionPanelText>
				<VTextField label="Title" v-model="project.title" />
				<VTextarea label="Description" v-model="project.description" />
				<VTextarea v-if="userData.user.admin" label="Keywords" v-model="project.keywords" />
			</VExpansionPanelText>
		</VExpansionPanel>
		<VExpansionPanel title="Background" value="background">
			<VExpansionPanelText>
				<ColorPicker label="Canvas Background" clearable v-model="project.background" />
			</VExpansionPanelText>
		</VExpansionPanel>
	</VExpansionPanels>
</template>

<style scoped lang="scss"></style>
