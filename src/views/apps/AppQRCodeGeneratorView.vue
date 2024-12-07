<script setup lang="ts">
import { ref } from 'vue';
import useQRCode from '../../hooks/qrcode';
import {
	qrCodeCornerDotTypes,
	qrCodeCornerSquareTypes,
	qrCodeDotTypes,
	qrCodeECLs
} from '../../utils/apps';

const {
	text,
	margin,
	ecl,
	bg,
	dotsColor,
	dotsType,
	cornerSquareType,
	cornerSquareColor,
	cornerDotType,
	cornerDotColor,
	preview
} = useQRCode();
const step = ref(1);
</script>

<template>
	<VRow>
		<VCol class="options" cols="12" md="8">
			<VStepper v-model="step">
				<VStepperHeader>
					<VStepperItem title="Content" :value="1" editable />
					<VDivider />
					<VStepperItem title="Design" :value="2" editable />
					<VDivider />
					<VStepperItem title="Dots" :value="3" editable />
					<VDivider />
					<VStepperItem title="Corners" :value="4" editable />
					<VDivider />
					<VStepperItem title="Download" :value="5" editable />
				</VStepperHeader>
				<VCard v-if="step === 1" flat>
					<VCardItem>
						<VTextarea
							label="Text"
							placeholder="Text to encode to QR code..."
							v-model="text"
						/>
						<VSelect label="Error Correction Level" :items="qrCodeECLs" v-model="ecl" />
					</VCardItem>
				</VCard>
				<VCard v-else-if="step === 2" flat>
					<VCardItem>
						<RangeSlider
							label="Margin"
							:min="0"
							:max="200"
							:step="1"
							v-model="margin"
						/>
						<ColorPicker label="Background Color" clearable v-model="bg" />
					</VCardItem>
				</VCard>
				<VCard v-else-if="step === 3" flat>
					<VCardItem>
						<VSelect label="Dot Shape" :items="qrCodeDotTypes" v-model="dotsType" />
						<ColorPicker label="Dot Color" v-model="dotsColor" />
					</VCardItem>
				</VCard>
				<VCard v-else-if="step === 4" flat>
					<VCardItem>
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
					</VCardItem>
				</VCard>
				<VCard v-else-if="step === 5" flat>
					<VCardItem>
						<VSelect label="Size" />
						<VBtn block>Download QR Code</VBtn>
					</VCardItem>
				</VCard>
				<VStepperActions @click:next="step++" @click:prev="step--" />
			</VStepper>
		</VCol>
		<VCol class="preview" cols="12" md="4">
			<VCard>
				<VCardItem>
					<LazyLoadImage aspect-ratio="1" :src="preview" />
				</VCardItem>
			</VCard>
		</VCol>
	</VRow>
</template>

<style scoped lang="scss"></style>
