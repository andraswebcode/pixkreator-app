<script setup lang="ts">
import useProps from '../../../hooks/props';
import { qrCodeCornerSquareTypes, qrCodeCornerDotTypes } from '../../../utils/apps';

const { cornerSquareType, cornerSquareColor, cornerDotType, cornerDotColor } = useProps([
	'cornerSquareType',
	'cornerSquareColor',
	'cornerDotType',
	'cornerDotColor'
]);
</script>

<template>
	<VSelect
		label="Corner Square Shape"
		:items="qrCodeCornerSquareTypes"
		v-model="cornerSquareType"
	/>
	<ColorPicker label="Corner Square Color" clearable v-model="cornerSquareColor" />
	<VSelect label="Corner Dots Shape" :items="qrCodeCornerDotTypes" v-model="cornerDotType" />
	<ColorPicker label="Corner Dots Color" clearable v-model="cornerDotColor" />
</template>

<style scoped lang="scss"></style>
