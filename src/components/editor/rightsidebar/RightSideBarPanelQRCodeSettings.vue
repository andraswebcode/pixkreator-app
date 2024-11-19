<script setup lang="ts">
import useProps from '../../../hooks/props';

const { text, size } = useProps(['text', 'size']);
</script>

<template>
	<VExpansionPanel title="QR Code" value="qrcode">
		<VExpansionPanelText>
			<VTextField label="Text" v-model="text" />
			<RangeSlider label="Size" :min="50" :max="1000" :step="10" v-model="size" />
		</VExpansionPanelText>
	</VExpansionPanel>
</template>

<style scoped lang="scss"></style>
