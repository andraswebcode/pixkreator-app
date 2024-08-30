<script setup lang="ts">
const props = defineProps<{
	label: string;
	min?: number;
	max?: number;
	step?: number;
}>();
const model = defineModel<number>();
</script>

<template>
	<div class="range-slider mb-5">
		<span class="v-label v-field-label--floating">{{ props.label }}</span>
		<VSlider v-model="model" :min="props.min" :max="props.max" :step="props.step" />
	</div>
</template>

<style scoped lang="scss">
.v-label {
	visibility: visible;
	position: static;
}
</style>
