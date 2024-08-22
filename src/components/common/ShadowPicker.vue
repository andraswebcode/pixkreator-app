<script setup lang="ts">
const props = defineProps<{
	label: string;
}>();
</script>

<template>
	<VSlider label="Offset X" :min="-100" :max="100" />
	<VSlider label="Offset Y" :min="-100" :max="100" />
	<VSlider label="Blur" :min="0" :max="40" />
	<ColorPicker label="Color" />
</template>

<style scoped lang="scss"></style>
