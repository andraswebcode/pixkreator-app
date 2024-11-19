<script setup lang="ts">
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
			<RangeSlider label="Font Size" v-model="fontSize" :min="10" :max="400" />
			<RangeSlider
				label="Line Height"
				v-model="lineHeight"
				:min="0.01"
				:max="4"
				:step="0.01"
			/>
			<RangeSlider label="Character Spacing" v-model="charSpacing" :min="0" :max="400" />
			<ButtonToggle label="Text Align" v-model="textAlign">
				<VBtn icon="mdi-format-align-left" value="left" v-tooltip="'Left'" />
				<VBtn icon="mdi-format-align-center" value="center" v-tooltip="'Center'" />
				<VBtn icon="mdi-format-align-right" value="right" v-tooltip="'Right'" />
			</ButtonToggle>
			<ButtonToggle label="Format" v-model="format" multiple :mandatory="false">
				<VBtn icon="mdi-format-bold" value="bold" />
				<VBtn icon="mdi-format-italic" value="italic" />
				<VBtn icon="mdi-format-underline" value="underline" />
			</ButtonToggle>
			<RangeSlider label="Curve" v-model="curve" :min="-100" :max="100" :step="1" />
		</VExpansionPanelText>
	</VExpansionPanel>
</template>

<style scoped lang="scss"></style>
