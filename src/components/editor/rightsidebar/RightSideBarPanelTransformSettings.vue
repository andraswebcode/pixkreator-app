<script setup lang="ts">
import useProps from '../../../hooks/props';

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
			<VRow>
				<VCol class="py-0">
					<VCheckbox label="Flip X" v-model="flipX" />
				</VCol>
				<VCol class="py-0">
					<VCheckbox label="Flip Y" v-model="flipY" />
				</VCol>
			</VRow>
		</VExpansionPanelText>
	</VExpansionPanel>
</template>

<style scoped lang="scss"></style>
