<script setup lang="ts">
import { ref, computed } from 'vue';
import { useProject } from '../../../store';
import { toFixed } from '../../../utils/functions';
import sizePresets from '../../../utils/size-presets';

const sizes = [
	{
		label: 'Custom',
		value: ''
	}
].concat(sizePresets);
const project = useProject();
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
		const value = `${project.width}x${project.height}`;
		const isPreset = sizePresets.some((preset) => preset.value === value);
		if (isPreset) {
			return value;
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
				<VSelect label="Size Presets" :items="sizes" v-model="size" />
			</VExpansionPanelText>
		</VExpansionPanel>
		<VExpansionPanel title="Meta" value="meta">
			<VExpansionPanelText>
				<VTextField label="Title" v-model="project.title" />
				<VTextarea label="Description" v-model="project.description" />
			</VExpansionPanelText>
		</VExpansionPanel>
		<VExpansionPanel title="Background" value="background">
			<VExpansionPanelText>
				<ColorPicker label="Canvas Background" v-model="project.background" />
			</VExpansionPanelText>
		</VExpansionPanel>
	</VExpansionPanels>
</template>

<style scoped lang="scss"></style>
