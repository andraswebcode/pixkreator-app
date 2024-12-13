<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue';
import { useEditor, useStAI } from '../../../store';
import { Canvas, PencilBrush } from 'fabric';

let maskCanvas: Canvas;
const canvasRef = ref<HTMLCanvasElement | null>(null);
const editor = useEditor();
const stai = useStAI();
const onPathCreated = () => {
	maskCanvas.toCanvasElement().toBlob((blob) => {
		stai.mask = blob;
	});
};

onMounted(() => {
	maskCanvas = new Canvas(canvasRef.value as HTMLCanvasElement, {
		width: editor.width,
		height: editor.height,
		isDrawingMode: true
	});
	maskCanvas.freeDrawingBrush = new PencilBrush(maskCanvas);
	maskCanvas.freeDrawingBrush.width = stai.brushWidth;
	// @ts-ignore
	window._mc = maskCanvas;
	// @ts-ignore
	maskCanvas.on('path:created', onPathCreated);
});
onUnmounted(() => {
	maskCanvas.destroy();
	// @ts-ignore
	maskCanvas.off('path:created', onPathCreated);
});

watch(
	() => stai.brushWidth,
	(newWidth) => {
		maskCanvas.freeDrawingBrush!.width = newWidth;
	}
);
watch(
	() => stai.clearMask,
	(newClear, oldClear) => {
		if (newClear !== oldClear) {
			maskCanvas.clear();
		}
	}
);
</script>

<template>
	<div class="mask">
		<canvas ref="canvasRef" />
	</div>
</template>

<style scoped lang="scss">
.mask {
	position: absolute;
	width: calc(100% - 32px);
	height: calc(100% - 32px);
	top: 16px;
	bottom: 16px;
	left: 16px;
	right: 16px;
}
</style>
