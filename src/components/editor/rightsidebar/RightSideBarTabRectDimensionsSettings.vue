<script setup lang="ts">
import useProps from '../../../hooks/props';

const { width, height } = useProps(['width', 'height']);
</script>

<template>
	<InputGroup>
		<VTextField type="number" label="Width" v-model="width" />
		<VTextField type="number" label="Height" v-model="height" />
	</InputGroup>
</template>

<style scoped lang="scss"></style>
