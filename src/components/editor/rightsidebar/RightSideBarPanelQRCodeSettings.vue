<script setup lang="ts">
import useProps from '../../../hooks/props';
import { qrCodeECLs } from '../../../utils/apps';

const { text, size, margin, ecl } = useProps(['text', 'size', 'margin', 'ecl']);
</script>

<template>
	<VExpansionPanel title="QR Code" value="qrcode">
		<VExpansionPanelText>
			<VTextField label="Text" v-model="text" />
			<RangeSlider label="Size" :min="200" :max="1000" :step="10" v-model="size" />
			<RangeSlider label="Margin" :min="0" :max="200" :step="1" v-model="margin" />
			<VSelect label="Error Correction Level" :items="qrCodeECLs" v-model="ecl" />
		</VExpansionPanelText>
	</VExpansionPanel>
</template>

<style scoped lang="scss"></style>
