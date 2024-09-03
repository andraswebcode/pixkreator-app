<script setup lang="ts">
import useProps from '../../../hooks/props';

const { fill, strokeWidth, stroke } = useProps(['fill', 'strokeWidth', 'stroke']);
</script>

<template>
	<VExpansionPanel title="Appearance" value="appearance">
		<VExpansionPanelText>
			<ColorPicker label="Fill Color" v-model="fill" />
			<VDivider class="mb-4" />
			<RangeSlider label="Stroke Width" v-model="strokeWidth" />
			<ColorPicker label="Stroke Color" v-model="stroke" />
		</VExpansionPanelText>
	</VExpansionPanel>
</template>

<style scoped lang="scss"></style>
