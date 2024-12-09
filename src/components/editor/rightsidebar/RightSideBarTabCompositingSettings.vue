<script setup lang="ts">
import useProps from '../../../hooks/props';
import blendingModes from '../../../utils/blending-modes';

const { opacity, globalCompositeOperation } = useProps(['opacity', 'globalCompositeOperation']);
</script>

<template>
	<RangeSlider label="Opacity" v-model="opacity" :min="0" :max="1" :step="0.01" />
	<VSelect label="Blending Mode" v-model="globalCompositeOperation" :items="blendingModes" />
</template>

<style scoped lang="scss"></style>
