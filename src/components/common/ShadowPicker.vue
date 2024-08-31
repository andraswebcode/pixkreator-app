<script setup lang="ts">
const model = defineModel<{
	offsetX: number;
	offsetY: number;
	blur: number;
	color: string;
}>({
	required: true,
	default: {
		offsetX: 0,
		offsetY: 0,
		blur: 0,
		color: '#000000'
	}
});
</script>

<template>
	<RangeSlider label="Offset X" :min="-100" :max="100" v-model="model.offsetX" />
	<RangeSlider label="Offset Y" :min="-100" :max="100" v-model="model.offsetY" />
	<RangeSlider label="Blur" :min="0" :max="40" v-model="model.blur" />
	<ColorPicker label="Color" v-model="model.color" />
</template>

<style scoped lang="scss"></style>
