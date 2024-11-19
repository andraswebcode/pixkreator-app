<script setup lang="ts">
import { ref } from 'vue';

const panels = ref([]);
</script>

<template>
	<VExpansionPanels v-model="panels">
		<VExpansionPanel title="Logos" value="logos">
			<VExpansionPanelText></VExpansionPanelText>
		</VExpansionPanel>
		<VExpansionPanel title="Colors" value="colors">
			<VExpansionPanelText>
				<InputGroup v-for="i of 4" :key="i">
					<VTextField label="Name" />
					<ColorPicker label="Color" hide-brand />
					<VBtn icon="mdi-trash-can" size="x-small" flat />
				</InputGroup>
			</VExpansionPanelText>
		</VExpansionPanel>
		<VExpansionPanel title="Fonts" value="fonts">
			<VExpansionPanelText></VExpansionPanelText>
		</VExpansionPanel>
	</VExpansionPanels>
</template>

<style scoped lang="scss"></style>
