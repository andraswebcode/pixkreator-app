<script setup lang="ts">
import { ref, watch } from 'vue';
import { useProject } from '../../../../store';
import { WEBSITE_URL } from '../../../../utils/constants';
import QRCodeStyling, { ErrorCorrectionLevel } from 'qr-code-styling';
import { debounce } from '../../../../utils/functions';
import { qrCodeECLs } from '../../../../utils/apps';

const qrCode = new QRCodeStyling();
const project = useProject();
const panels = ref(['qr']);
const preview = ref('');
const text = ref('');
const size = ref(300);
const margin = ref(0);
const ecl = ref<ErrorCorrectionLevel>('Q');

const addQRCode = () => {
	project.addLayer({
		type: 'qrcode',
		left: project.width / 2,
		top: project.height / 2,
		text: text.value || WEBSITE_URL,
		size: size.value,
		margin: margin.value,
		ecl: ecl.value
	});
};

watch(
	() => [text.value, size.value, margin.value, ecl.value],
	debounce(([newText, newSize, newMargin, newECL]) => {
		qrCode.update({
			data: newText || WEBSITE_URL,
			width: newSize,
			height: newSize,
			margin: newMargin,
			qrOptions: {
				errorCorrectionLevel: newECL
			}
		});

		qrCode.getRawData('png').then((blob) => {
			preview.value = URL.createObjectURL(blob);
		});
	}, 800),
	{
		immediate: true
	}
);
</script>

<template>
	<VImg class="mb-4" aspect-ratio="1" :src="preview" />
	<VExpansionPanels class="mb-4" v-model="panels">
		<VExpansionPanel title="QR Code" value="qr">
			<VExpansionPanelText>
				<VTextField
					label="Text"
					placeholder="Text to encode to QR code..."
					v-model="text"
				/>
				<RangeSlider label="Size" :min="200" :max="1000" :step="10" v-model="size" />
				<RangeSlider label="Margin" :min="0" :max="200" :step="1" v-model="margin" />
				<VSelect label="Error Correction Level" :items="qrCodeECLs" v-model="ecl" />
			</VExpansionPanelText>
		</VExpansionPanel>
		<VExpansionPanel title="Image" value="image">
			<VExpansionPanelText></VExpansionPanelText>
		</VExpansionPanel>
		<VExpansionPanel title="Dots" value="dots">
			<VExpansionPanelText></VExpansionPanelText>
		</VExpansionPanel>
		<VExpansionPanel title="Corner" value="corner">
			<VExpansionPanelText></VExpansionPanelText>
		</VExpansionPanel>
	</VExpansionPanels>
	<VBtn block @click="addQRCode">Add to Canvas</VBtn>
</template>

<style scoped lang="scss"></style>
