<script setup lang="ts">
import { ref, computed } from 'vue';
import { useProject } from '../../../store';
import { toFixed } from '../../../utils/functions';

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
</script>

<template>
	<VExpansionPanels v-model="panels">
		<VExpansionPanel title="Size" value="size">
			<VExpansionPanelText>
				<InputGroup>
					<VTextField type="number" label="Width" v-model="width" />
					<VTextField type="number" label="Height" v-model="height" />
				</InputGroup>
				<VSelect label="Size Presets" />
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
