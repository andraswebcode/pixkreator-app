<script setup lang="ts">
import { ref } from 'vue';
import { useEditor } from '../../../store';

const editor = useEditor();
const startPan = ref<{ x: number; y: number }>({ x: 0, y: 0 });
const isPanning = ref(false);

const onPanStart = (e) => {
	const fingers = e.touches;
	const x = fingers?.length ? fingers[0].clientX : e.clientX;
	const y = fingers?.length ? fingers[0].clientY : e.clientY;

	startPan.value = {
		x: x - editor.panX,
		y: y - editor.panY
	};
	isPanning.value = true;
};
const onPanMove = (e) => {
	if (!isPanning.value) {
		return;
	}

	const fingers = e.touches;
	const x = fingers?.length ? fingers[0].clientX : e.clientX;
	const y = fingers?.length ? fingers[0].clientY : e.clientY;

	editor.panX = x - startPan.value.x;
	editor.panY = y - startPan.value.y;
};
const onPanEnd = () => {
	isPanning.value = false;
};
</script>

<template>
	<div
		@mousedown="onPanStart"
		@mousemove="onPanMove"
		@mouseup="onPanEnd"
		@mouseleave="onPanEnd"
		@touchstart="onPanStart"
		@touchmove="onPanMove"
		@touchend="onPanEnd"
	/>
</template>

<style scoped lang="scss">
div {
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	cursor: grab;
}
</style>
