<script setup lang="ts">
import useProps from '../../../hooks/props';

const { text, fontSize } = useProps(['text', 'fontSize']);
</script>

<template>
	<VExpansionPanel title="Text" value="text">
		<VExpansionPanelText>
			<VTextarea label="Text" v-model="text" />
			<RangeSlider label="Font Size" v-model="fontSize" :min="16" :max="400" />
		</VExpansionPanelText>
	</VExpansionPanel>
</template>

<style scoped lang="scss"></style>
