<script setup lang="ts">
import {
	mdiFormatAlignCenter,
	mdiFormatAlignLeft,
	mdiFormatAlignRight,
	mdiFormatBold,
	mdiFormatItalic,
	mdiFormatUnderline
} from '@mdi/js';
import useProps from '../../../hooks/props';
import { computed } from 'vue';

type Format = 'bold' | 'italic' | 'underline';

const {
	text,
	fontFamily,
	fontSize,
	lineHeight,
	charSpacing,
	textAlign,
	fontStyle,
	fontWeight,
	underline,
	curve
} = useProps([
	'text',
	'fontFamily',
	'fontSize',
	'lineHeight',
	'charSpacing',
	'textAlign',
	'fontStyle',
	'fontWeight',
	'underline',
	'curve'
]);
const format = computed<Format[]>({
	get() {
		const value: Format[] = [];

		if (fontWeight.value === 'bold') {
			value.push('bold');
		}
		if (fontStyle.value === 'italic') {
			value.push('italic');
		}
		if (underline.value) {
			value.push('underline');
		}

		return value;
	},
	set(value: Format[]) {
		fontWeight.value = value.includes('bold') ? 'bold' : 'normal';
		fontStyle.value = value.includes('italic') ? 'italic' : 'normal';
		underline.value = value.includes('underline');
	}
});
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
			<ButtonToggle label="Format" v-model="format" multiple :mandatory="false">
				<VBtn :icon="mdiFormatBold" value="bold" />
				<VBtn :icon="mdiFormatItalic" value="italic" />
				<VBtn :icon="mdiFormatUnderline" value="underline" />
			</ButtonToggle>
			<RangeSlider label="Curve" v-model="curve" :min="-400" :max="400" :step="1" />
		</VExpansionPanelText>
	</VExpansionPanel>
</template>

<style scoped lang="scss"></style>
