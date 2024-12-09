<script setup lang="ts">
import useProps from '../../../hooks/props';

const { shadow } = useProps(['shadow']);
</script>

<template>
	<ShadowPicker v-model="shadow" />
</template>

<style scoped lang="scss"></style>
