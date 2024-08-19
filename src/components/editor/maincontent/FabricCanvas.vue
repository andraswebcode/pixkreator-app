<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useEditor, useProject } from './../../../store';
import Canvas from '../../../canvas/canvas';
import { Rect, util } from 'fabric';
import { isEqual, toFixed } from '../../../utils/functions';

let fabricCanvas: Canvas;
const canvasRef = ref<HTMLCanvasElement | null>(null);
const project = useProject();
const editor = useEditor();
const previousState = ref<any>({});
const startPan = ref<{ x: number; y: number }>({ x: 0, y: 0 });
const isPanning = ref(false);

const updateCanvas = () => {
	if (fabricCanvas) {
		const panX = editor.width / 2 - (project.width / 2) * editor.zoom + editor.panX;
		const panY = editor.height / 2 - (project.height / 2) * editor.zoom + editor.panY;
		fabricCanvas.setViewportTransform([editor.zoom, 0, 0, editor.zoom, panX, panY]);
		fabricCanvas.clipPath?.set({
			width: project.width,
			height: project.height
		});
		fabricCanvas.set('backgroundColor', project.background);
	}
};
const onResize = ({ width, height }: { width: number; height: number }) => {
	editor.width = width;
	editor.height = height;
	if (fabricCanvas) {
		fabricCanvas.setWidth(width);
		fabricCanvas.setHeight(height);
	}
	updateCanvas();
};
const onPanStart = (e) => {
	startPan.value = {
		x: e.clientX - editor.panX,
		y: e.clientY - editor.panY
	};
	isPanning.value = true;
};
const onPanMove = (e) => {
	if (isPanning.value) {
		editor.panX = e.clientX - startPan.value.x;
		editor.panY = e.clientY - startPan.value.y;
	}
};
const onPanEnd = () => {
	isPanning.value = false;
};
const onObjectSelection = () => {
	editor.activeLayerIds = fabricCanvas.getActiveObjects().map((obj) => obj.id);
};
const onObjectModified = ({ target }) => {
	if (target?.type === 'activeSelection') {
		// Coming soon...
		return;
	}

	const { id, left, top, scaleX, scaleY, skewX, skewY, angle } = target;
	const newProps = {
		left: toFixed(left, 0),
		top: toFixed(top, 0),
		scaleX: toFixed(scaleX, 2),
		scaleY: toFixed(scaleY, 2),
		skewX: toFixed(skewX, 0),
		skewY: toFixed(skewY, 0),
		angle: toFixed(angle, 0)
	};

	project.updateProps(id, newProps);
};

onMounted(() => {
	const { clientWidth = 0, clientHeight = 0 } = document.getElementById('canvas') || {};
	fabricCanvas = new Canvas(canvasRef.value as HTMLCanvasElement, {
		backgroundColor: '#FFF',
		width: clientWidth,
		height: clientHeight,
		clipPath: new Rect({
			top: 0,
			left: 0,
			width: project.width,
			height: project.height,
			originX: 'left',
			originY: 'top'
		})
	});
	fabricCanvas.on('selection:created', onObjectSelection);
	fabricCanvas.on('selection:updated', onObjectSelection);
	fabricCanvas.on('selection:cleared', onObjectSelection);
	fabricCanvas.on('object:modified', onObjectModified);
	// @ts-ignore
	window._fc = fabricCanvas;
	editor.width = clientWidth;
	editor.height = clientHeight;
	updateCanvas();
});

watch(
	() => project.byIds,
	(newLayers) => {
		const canvasObjects = fabricCanvas.getObjects();
		const newState = Object.keys(newLayers).reduce((acc, key) => {
			acc[key] = {
				id: key,
				...newLayers[key]
			};
			return acc;
		}, {});
		const modifiedObjects = Object.keys(newState)
			.filter((id) => {
				const previousObj = previousState.value[id];
				return !previousObj || !isEqual(previousObj, newState[id]);
			})
			.map((id) => newState[id]);

		modifiedObjects.forEach((modifiedObj) => {
			const existingObject = canvasObjects.find((obj: any) => obj.id === modifiedObj.id);

			if (existingObject) {
				existingObject.set(modifiedObj);
				fabricCanvas.requestRenderAll();
			} else {
				// This is an easier way to update object list, and keep order as well.
				fabricCanvas.remove(...fabricCanvas.getObjects());
				util.enlivenObjects(project.ids.map((id) => project.byIds[id])).then(
					(objects: any) => {
						fabricCanvas.add(...objects);
					}
				);
			}
		});

		canvasObjects.forEach((obj: any) => {
			if (!newState[obj.id]) {
				fabricCanvas.remove(obj);
			}
		});

		fabricCanvas.requestRenderAll();

		previousState.value = newState;
	},
	{ deep: true }
);
watch(
	() => [
		project.width,
		project.height,
		project.background,
		editor.zoom,
		editor.panX,
		editor.panY
	],
	updateCanvas
);
</script>

<template>
	<div id="canvas" class="canvas position-relative" v-dom-resize="onResize">
		<canvas ref="canvasRef" />
		<div
			v-if="editor.mode === 'pan'"
			class="pan position-absolute"
			@mousedown="onPanStart"
			@mousemove="onPanMove"
			@mouseup="onPanEnd"
			@mouseleave="onPanEnd"
		></div>
	</div>
</template>

<style scoped lang="scss">
.canvas {
	width: 100%;
	height: 100%;
}
.pan {
	width: 100%;
	height: 100%;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	cursor: grab;
}
</style>
