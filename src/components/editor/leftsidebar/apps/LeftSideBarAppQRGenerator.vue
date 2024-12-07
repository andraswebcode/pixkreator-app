<script setup lang="ts">
import { ref } from 'vue';
import { useProject } from '../../../../store';
import { WEBSITE_URL } from '../../../../utils/constants';
import {
	qrCodeCornerDotTypes,
	qrCodeCornerSquareTypes,
	qrCodeDotTypes,
	qrCodeECLs
} from '../../../../utils/apps';
import useQRCode from '../../../../hooks/qrcode';

const project = useProject();
const panels = ref(['qr']);
const {
	text,
	size,
	margin,
	ecl,
	bg,
	imgSrc,
	imgSize,
	imgMargin,
	dotsColor,
	dotsType,
	cornerSquareType,
	cornerSquareColor,
	cornerDotType,
	cornerDotColor,
	preview
} = useQRCode();

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
		imageSize: imgSize.value,
		imageMargin: imgMargin.value,
		dotsColor: dotsColor.value,
		dotsType: dotsType.value,
		cornerSquareType: cornerSquareType.value,
		cornerSquareColor: cornerSquareColor.value,
		cornerDotType: cornerDotType.value,
		cornerDotColor: cornerDotColor.value
	});
};
</script>

<template>
	<LazyLoadImage class="mb-4" aspect-ratio="1" :src="preview" />
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
				<RangeSlider label="Size (%)" v-model="imgSize" :min="0.01" :max="1" :step="0.01" />
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
