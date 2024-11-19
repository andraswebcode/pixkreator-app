<script setup lang="ts">
import { useProject } from '../../../store';

const project = useProject();
const addChart = () => {
	project.addLayer({
		type: 'chart'
	});
};
</script>

<template>
	<VBtn block @click="addChart">Add to Canvas</VBtn>
</template>

<style scoped lang="scss"></style>
