<script setup lang="ts">
import useProps from '../../../hooks/props';

const { fill, strokeWidth, stroke, strokeDashArray, strokeDashOffset, shadow } = useProps([
	'fill',
	'strokeWidth',
	'stroke',
	'strokeDashArray',
	'strokeDashOffset',
	'shadow'
]);
</script>

<template>
	<VExpansionPanel title="Appearance" value="appearance">
		<VExpansionPanelText>
			<ColorPicker label="Fill Color" clearable v-model="fill" />
			<VDivider class="mb-4" />
			<ColorPicker label="Stroke Color" clearable v-model="stroke" />
			<RangeSlider label="Stroke Width" v-model="strokeWidth" />
			<StrokeDashControl label="Stroke Dash Array" v-model="strokeDashArray" />
			<VTextField type="number" label="Stroke Dash Offset" v-model="strokeDashOffset" />
			<VDivider class="mb-4" />
			<ShadowPicker label="Shadow" v-model="shadow" />
		</VExpansionPanelText>
	</VExpansionPanel>
</template>

<style scoped lang="scss"></style>
