<script setup lang="ts">
import useProps from '../../../hooks/props';

const { background } = useProps(['background']);
</script>

<template>
	<ColorPicker label="Background Color" clearable v-model="background" />
</template>

<style scoped lang="scss"></style>
