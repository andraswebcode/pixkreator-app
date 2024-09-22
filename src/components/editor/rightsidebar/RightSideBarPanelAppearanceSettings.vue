<script setup lang="ts">
import useProps from '../../../hooks/props';

const { fill, strokeWidth, stroke, shadow } = useProps(['fill', 'strokeWidth', 'stroke', 'shadow']);
</script>

<template>
	<VExpansionPanel title="Appearance" value="appearance">
		<VExpansionPanelText>
			<ColorPicker label="Fill Color" v-model="fill" />
			<VDivider class="mb-4" />
			<RangeSlider label="Stroke Width" v-model="strokeWidth" />
			<ColorPicker label="Stroke Color" v-model="stroke" />
			<VDivider class="mb-4" />
			<ShadowPicker label="Shadow" v-model="shadow" />
		</VExpansionPanelText>
	</VExpansionPanel>
</template>

<style scoped lang="scss"></style>
