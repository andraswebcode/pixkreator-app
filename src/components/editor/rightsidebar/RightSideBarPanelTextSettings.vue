<script setup lang="ts">
import useProps from '../../../hooks/props';

const { text, fontSize } = useProps(['text', 'fontSize']);
</script>

<template>
	<VExpansionPanel title="Text" value="text">
		<VExpansionPanelText>
			<VTextarea label="Text" v-model="text" />
			<VSlider label="Font Size" v-model="fontSize" />
		</VExpansionPanelText>
	</VExpansionPanel>
</template>

<style scoped lang="scss"></style>
