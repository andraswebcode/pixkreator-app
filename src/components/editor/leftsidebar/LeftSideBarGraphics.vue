<script setup lang="ts">
import { useProject } from '../../../store';

const project = useProject();
const testAddRect = () => {
	project.addLayer({
		type: 'rect',
		width: 200,
		height: 200,
		fill: 'rgba(0, 0, 0, 0)',
		stroke: 'black',
		strokeWidth: 12
	});
};
</script>

<template>
	<VBtn @click="testAddRect">Add Rect</VBtn>
</template>

<style scoped lang="scss"></style>
