<script setup lang="ts">
import { ref } from 'vue';
import { useProject } from '../../../store';

const project = useProject();
const panels = ref(['size']);
</script>

<template>
	<VExpansionPanels v-model="panels">
		<VExpansionPanel title="Size" value="size">
			<VExpansionPanelText>
				<InputGroup>
					<VTextField
						type="number"
						label="Width"
						v-model="project.width"
						@update:model-value="project.width = parseInt($event)"
					/>
					<VTextField
						type="number"
						label="Height"
						v-model="project.height"
						@update:model-value="project.height = parseInt($event)"
					/>
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
