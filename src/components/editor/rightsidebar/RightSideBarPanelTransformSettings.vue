<script setup lang="ts">
import { computed } from 'vue';
import useProps from '../../../hooks/props';

type FlipDirection = 'x' | 'y';

const { left, top, scaleX, scaleY, skewX, skewY, angle, flipX, flipY } = useProps([
	'left',
	'top',
	'scaleX',
	'scaleY',
	'skewX',
	'skewY',
	'angle',
	'flipX',
	'flipY'
]);
const flip = computed<FlipDirection[]>({
	get() {
		const value: FlipDirection[] = [];
		if (flipX.value) {
			value.push('x');
		}
		if (flipY.value) {
			value.push('y');
		}
		return value;
	},
	set(value: FlipDirection[]) {
		flipX.value = value.includes('x');
		flipY.value = value.includes('y');
	}
});
</script>

<template>
	<VExpansionPanel title="Transforms" value="transforms">
		<VExpansionPanelText>
			<InputGroup>
				<VTextField type="number" label="Left" v-model="left" />
				<VTextField type="number" label="Top" v-model="top" />
			</InputGroup>
			<InputGroup>
				<VTextField type="number" label="Scale X" v-model="scaleX" min="0" step="0.01" />
				<VTextField type="number" label="Scale Y" v-model="scaleY" min="0" step="0.01" />
			</InputGroup>
			<InputGroup>
				<VTextField type="number" label="Skew X" v-model="skewX" />
				<VTextField type="number" label="Skew Y" v-model="skewY" />
			</InputGroup>
			<VTextField type="number" label="Rotate" v-model="angle" />
			<ButtonToggle label="Flip" v-model="flip" multiple :mandatory="false">
				<VBtn icon="mdi-flip-horizontal" value="x" />
				<VBtn icon="mdi-flip-vertical" value="y" />
			</ButtonToggle>
		</VExpansionPanelText>
	</VExpansionPanel>
</template>

<style scoped lang="scss"></style>
