<script setup lang="ts">
import useProps from '../../../hooks/props';

const { imageSrc, imageSize, imageMargin } = useProps(['imageSrc', 'imageSize', 'imageMargin']);
</script>

<template>
	<ImageSelect btn-label="Add Logo" v-model:src="imageSrc" />
	<RangeSlider label="Size (%)" v-model="imageSize" :min="0.01" :max="1" :step="0.01" />
	<RangeSlider label="Margin" v-model="imageMargin" />
</template>

<style scoped lang="scss"></style>
