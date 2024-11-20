<script setup lang="ts">
import { ref, watch } from 'vue';
import { useProject } from '../../../../store';
import { WEBSITE_URL } from '../../../../utils/constants';
import QRCodeStyling, {
	CornerDotType,
	CornerSquareType,
	DotType,
	ErrorCorrectionLevel
} from 'qr-code-styling';
import { debounce } from '../../../../utils/functions';
import {
	qrCodeCornerDotTypes,
	qrCodeCornerSquareTypes,
	qrCodeDotTypes,
	qrCodeECLs
} from '../../../../utils/apps';

const qrCode = new QRCodeStyling();
const project = useProject();
const panels = ref(['qr']);
const preview = ref('');
const text = ref('');
const size = ref(300);
const margin = ref(0);
const ecl = ref<ErrorCorrectionLevel>('Q');
const bg = ref('');
const imgSrc = ref('');
const imgSize = ref(0.4);
const imgMargin = ref(0);
const dotsColor = ref('#000');
const dotsType = ref<DotType>('square');
const cornerSquareType = ref<CornerSquareType | ''>('');
const cornerSquareColor = ref('');
const cornerDotType = ref<CornerDotType | ''>('');
const cornerDotColor = ref('');

const addQRCode = () => {
	project.addLayer({
		type: 'qrcode',
		left: project.width / 2,
		top: project.height / 2,
		text: text.value || WEBSITE_URL,
		size: size.value,
		margin: margin.value,
		ecl: ecl.value,
		background: bg.value,
		imageSrc: imgSrc.value,
		imageMargin: imgMargin.value,
		dotsColor: dotsColor.value,
		dotsType: dotsType.value,
		cornerSquareType: cornerSquareType.value,
		cornerSquareColor: cornerSquareColor.value,
		cornerDotType: cornerDotType.value,
		cornerDotColor: cornerDotColor.value
	});
};

watch(
	() => [
		text.value,
		size.value,
		margin.value,
		ecl.value,
		bg.value,
		imgSrc.value,
		imgSize.value,
		imgMargin.value,
		dotsColor.value,
		dotsType.value,
		cornerSquareType.value,
		cornerSquareColor.value,
		cornerDotType.value,
		cornerDotColor.value
	],
	debounce(
		([
			newText,
			newSize,
			newMargin,
			newECL,
			newBg,
			newImgSrc,
			newImgSize,
			newImgMargin,
			newDotsColor,
			newDotsType,
			newCornerSquareType,
			newCornerSquareColor,
			newCornerDotType,
			newCornerDotColor
		]) => {
			qrCode.update({
				data: newText || WEBSITE_URL,
				width: newSize,
				height: newSize,
				margin: newMargin,
				image: newImgSrc,
				qrOptions: {
					errorCorrectionLevel: newECL
				},
				backgroundOptions: {
					color: newBg
				},
				imageOptions: {
					imageSize: newImgSize,
					margin: newImgMargin
				},
				dotsOptions: {
					type: newDotsType,
					color: newDotsColor
				},
				cornersSquareOptions: newCornerSquareType
					? {
							type: newCornerSquareType,
							color: newCornerSquareColor
					  }
					: undefined,
				cornersDotOptions: newCornerDotType
					? {
							type: newCornerDotType,
							color: newCornerDotColor
					  }
					: undefined
			});

			qrCode.getRawData('png').then((blob) => {
				preview.value = URL.createObjectURL(blob);
			});
		},
		800
	),
	{
		immediate: true
	}
);
</script>

<template>
	<VImg class="mb-4" aspect-ratio="1" :src="preview">
		<template v-slot:placeholder>
			<div class="d-flex align-center justify-center fill-height">
				<VProgressCircular color="grey-lighten-4" indeterminate />
			</div>
		</template>
	</VImg>
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
		<VExpansionPanel title="Background" value="background">
			<VExpansionPanelText>
				<ColorPicker label="Background Color" clearable v-model="bg" />
			</VExpansionPanelText>
		</VExpansionPanel>
		<VExpansionPanel title="Logo" value="image">
			<VExpansionPanelText>
				<ImageSelect btn-label="Add Logo" v-model:src="imgSrc" />
				<RangeSlider label="Size (%)" v-model="imgSize" />
				<RangeSlider label="Margin" v-model="imgMargin" />
			</VExpansionPanelText>
		</VExpansionPanel>
		<VExpansionPanel title="Dots" value="dots">
			<VExpansionPanelText>
				<VSelect label="Dot Shape" :items="qrCodeDotTypes" v-model="dotsType" />
				<ColorPicker label="Dot Color" v-model="dotsColor" />
			</VExpansionPanelText>
		</VExpansionPanel>
		<VExpansionPanel title="Corner" value="corner">
			<VExpansionPanelText>
				<VSelect
					label="Corner Square Shape"
					:items="qrCodeCornerSquareTypes"
					v-model="cornerSquareType"
				/>
				<ColorPicker label="Corner Square Color" v-model="cornerSquareColor" />
				<VSelect
					label="Corner Dots Shape"
					:items="qrCodeCornerDotTypes"
					v-model="cornerDotType"
				/>
				<ColorPicker label="Corner Dots Color" v-model="cornerDotColor" />
			</VExpansionPanelText>
		</VExpansionPanel>
	</VExpansionPanels>
	<VBtn block @click="addQRCode">Add to Canvas</VBtn>
</template>

<style scoped lang="scss"></style>
