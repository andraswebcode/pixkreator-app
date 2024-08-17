<script setup lang="ts">
import { useCanvas } from './../../../hooks';

const { canvasRef, getFabricCanvas } = useCanvas();
const onResize = ({ width, height }) => {
	const canvas = getFabricCanvas();
	if (canvas) {
		canvas.setWidth(width);
		canvas.setHeight(height);
	}
};
</script>

<template>
	<div id="canvas" class="canvas" v-dom-resize="onResize">
		<canvas ref="canvasRef" />
	</div>
</template>

<style scoped lang="scss">
.canvas {
	width: 100%;
	height: 100%;
}
</style>
