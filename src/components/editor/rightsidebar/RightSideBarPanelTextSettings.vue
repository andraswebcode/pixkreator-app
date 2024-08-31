<script setup lang="ts">
import { mdiFormatAlignCenter, mdiFormatAlignLeft, mdiFormatAlignRight } from '@mdi/js';
import useProps from '../../../hooks/props';

const { text, fontFamily, fontSize, lineHeight, charSpacing, textAlign } = useProps([
	'text',
	'fontFamily',
	'fontSize',
	'lineHeight',
	'charSpacing',
	'textAlign'
]);
</script>

<template>
	<VExpansionPanel title="Text" value="text">
		<VExpansionPanelText>
			<VTextarea label="Text" v-model="text" />
			<FontSelect label="Font Family" v-model="fontFamily" />
			<RangeSlider label="Font Size" v-model="fontSize" :min="16" :max="400" />
			<RangeSlider
				label="Line Height"
				v-model="lineHeight"
				:min="0.01"
				:max="4"
				:step="0.01"
			/>
			<RangeSlider label="Character Spacing" v-model="charSpacing" :min="0" :max="400" />
			<ButtonToggle label="Text Align" v-model="textAlign">
				<VBtn :icon="mdiFormatAlignLeft" value="left" v-tooltip="'Left'" />
				<VBtn :icon="mdiFormatAlignCenter" value="center" v-tooltip="'Center'" />
				<VBtn :icon="mdiFormatAlignRight" value="right" v-tooltip="'Right'" />
			</ButtonToggle>
		</VExpansionPanelText>
	</VExpansionPanel>
</template>

<style scoped lang="scss"></style>
