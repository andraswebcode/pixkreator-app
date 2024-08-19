<script setup lang="ts">
import { ref } from 'vue';
import useProps from '../../../hooks/props';

const panels = ref(['shape', 'transforms']);
const { left, top, scaleX, scaleY, skewX, skewY, angle } = useProps([
	'left',
	'top',
	'scaleX',
	'scaleY',
	'skewX',
	'skewY',
	'angle'
]);
</script>

<template>
	<VExpansionPanels v-model="panels">
		<VExpansionPanel title="Shape" value="shape">
			<VExpansionPanelText></VExpansionPanelText>
		</VExpansionPanel>
		<VExpansionPanel title="Transforms" value="transforms">
			<VExpansionPanelText>
				<InputGroup>
					<VTextField type="number" label="Left" v-model="left" />
					<VTextField type="number" label="Top" v-model="top" />
				</InputGroup>
				<InputGroup>
					<VTextField type="number" label="Scale X" v-model="scaleX" />
					<VTextField type="number" label="Scale Y" v-model="scaleY" />
				</InputGroup>
				<InputGroup>
					<VTextField type="number" label="Skew X" v-model="skewX" />
					<VTextField type="number" label="Skew Y" v-model="skewY" />
				</InputGroup>
				<VTextField type="number" label="Rotate" v-model="angle" />
			</VExpansionPanelText>
		</VExpansionPanel>
		<VExpansionPanel title="Appearance" value="appearance">
			<VExpansionPanelText></VExpansionPanelText>
		</VExpansionPanel>
	</VExpansionPanels>
</template>

<style scoped lang="scss"></style>
