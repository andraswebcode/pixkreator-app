<script setup lang="ts">
import useProps from '../../../hooks/props';

const { background } = useProps(['background']);
</script>

<template>
	<VExpansionPanel title="Background" value="qrcodebg">
		<VExpansionPanelText>
			<ColorPicker label="Background Color" clearable v-model="background" />
		</VExpansionPanelText>
	</VExpansionPanel>
</template>

<style scoped lang="scss"></style>
