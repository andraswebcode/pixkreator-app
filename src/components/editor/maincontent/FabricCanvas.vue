<script setup lang="ts">
import { ref, onMounted, watch, toRaw } from 'vue';
import { useEditor, useProject } from './../../../store';
import Canvas from '../../../canvas/canvas';
import { Rect, util } from 'fabric';
import { toFixed } from '../../../utils/functions';
import { EditorModeType, EditorPencilType } from '../../../store/editor';
import { ByID } from '../../../store/project';

let fabricCanvas: Canvas;
const canvasRef = ref<HTMLCanvasElement | null>(null);
const project = useProject();
const editor = useEditor();
const startPan = ref<{ x: number; y: number }>({ x: 0, y: 0 });
const isPanning = ref(false);

const updateCanvas = () => {
	if (fabricCanvas) {
		const panX = editor.width / 2 - (project.width / 2) * editor.zoom + editor.panX;
		const panY = editor.height / 2 - (project.height / 2) * editor.zoom + editor.panY;
		fabricCanvas.setViewportTransform([editor.zoom, 0, 0, editor.zoom, panX, panY]);
		fabricCanvas.clipPath?.set({
			width: toFixed(project.width),
			height: toFixed(project.height)
		});
		fabricCanvas.set('backgroundColor', project.background);
	}
};
const onResize = ({ width, height }: { width: number; height: number }) => {
	editor.width = width;
	editor.height = height;
	if (fabricCanvas) {
		fabricCanvas.set({ width, height });
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
const onObjectSelection = ({ e, selected = [] }) => {
	if (e) {
		editor.activeLayerIds = selected.map(({ id }) => id);
	}
};
const onObjectModified = ({ target }) => {
	if (target?.type === 'activeselection') {
		const newProps = target.getObjects().reduce((memo, obj) => {
			const matrix = obj.calcTransformMatrix();
			const { angle, scaleX, scaleY, skewX, skewY, translateX, translateY } =
				util.qrDecompose(matrix);
			memo[obj.id] = {
				left: toFixed(translateX, 0),
				top: toFixed(translateY, 0),
				scaleX: toFixed(scaleX, 2),
				scaleY: toFixed(scaleY, 2),
				skewX: toFixed(skewX, 0),
				skewY: toFixed(skewY, 0),
				angle: toFixed(angle, 0)
			};
			return memo;
		}, {});
		project.updateProps(newProps);
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
const onPathCreated = ({ path }) => {
	const layer = path.toObject();
	const sw2 = layer.strokeWidth / 2;
	fabricCanvas.remove(path);
	project.addLayer({
		...layer,
		left: layer.left + layer.width / 2 + sw2,
		top: layer.top + layer.height / 2 + sw2
	});
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
			height: project.height
		})
	});
	fabricCanvas.on('selection:created', onObjectSelection);
	fabricCanvas.on('selection:updated', onObjectSelection);
	fabricCanvas.on('selection:cleared', onObjectSelection);
	fabricCanvas.on('object:modified', onObjectModified);
	fabricCanvas.on('path:created', onPathCreated);
	// @ts-ignore
	window._fc = fabricCanvas;
	editor.width = clientWidth;
	editor.height = clientHeight;
	updateCanvas();
});

watch(
	(): [string[], any] => [toRaw(project.ids), project.byIds],
	([newIds], [oldIds]) => {
		const newLayers: ByID[] = [];

		newIds.forEach((id) => {
			const object = fabricCanvas.getObjectById(id);
			const layer = project.byIds[id];
			if (object) {
				const { id: _id, type: _type, ..._layer } = layer;
				object.set(_layer);
			} else {
				newLayers.push(layer);
			}
		});

		if (newLayers.length) {
			util.enlivenObjects(newLayers).then((objects: any) => {
				fabricCanvas.add(...objects);
			});
		}

		oldIds.forEach((id) => {
			if (!newIds.includes(id)) {
				const object = fabricCanvas.getObjectById(id);
				if (object) {
					fabricCanvas.remove(object);
				}
			}
		});

		fabricCanvas.requestRenderAll();
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
watch(
	(): [EditorModeType, EditorPencilType, number, string] => [
		editor.mode,
		editor.pencil,
		editor.penWidth,
		editor.penColor
	],
	([newMode, _newPencil, newWidth, newColor]) => {
		fabricCanvas.isDrawingMode = newMode === 'draw';
		fabricCanvas.freeDrawingBrush!.width = newWidth;
		fabricCanvas.freeDrawingBrush!.color = newColor;
	}
);
watch(
	() => editor.activeLayerIds,
	(newIds) => {
		fabricCanvas.setActiveObjectsByIds(newIds);
	}
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
