<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue';
import { useEditor, useProject, useStAI } from '../../../store';
import { Canvas, FabricImage, PencilBrush, util } from 'fabric';
import useCanvas from '../../../hooks/canvas';
import useImage from '../../../hooks/image';

let maskCanvas: Canvas;
const canvasRef = ref<HTMLCanvasElement | null>(null);
const editor = useEditor();
const project = useProject();
const stai = useStAI();
const { viewportTransform } = useCanvas();
const { currentImageMatrix } = useImage();
const onPathCreated = () => {
	maskCanvas.setViewportTransform([1, 0, 0, 1, 0, 0]);

	const canvas = maskCanvas.toCanvasElement(1, {});

	maskCanvas.setViewportTransform(viewportTransform.value);

	const m = util.invertTransform(currentImageMatrix.value);
	const o = util.qrDecompose(m);
	const image = new FabricImage(canvas, {
		...o
	});
	image.toCanvasElement().toBlob((blob) => {
		stai.mask = blob;
	});
};

onMounted(() => {
	maskCanvas = new Canvas(canvasRef.value as HTMLCanvasElement, {
		width: editor.width,
		height: editor.height,
		isDrawingMode: true
	});
	maskCanvas.setViewportTransform(viewportTransform.value);
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
	() => [editor.zoom, editor.panX, editor.panY],
	() => {
		maskCanvas.setViewportTransform(viewportTransform.value);
	}
);
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
