<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, toRaw } from 'vue';
import { useEditor, useNotice, useProject, useStAI } from './../../../store';
import Canvas from '../../../canvas/canvas';
import { Rect, TPointerEvent, util } from 'fabric';
import { debounce, isAround, toFixed } from '../../../utils/functions';
import { EditorModeType, EditorPencilType } from '../../../store/editor';
import { SNAP_THRESHOLD } from '../../../utils/constants';
import useCanvas from '../../../hooks/canvas';
import useImage from '../../../hooks/image';

let fabricCanvas: Canvas;
const canvasRef = ref<HTMLCanvasElement | null>(null);
const project = useProject();
const editor = useEditor();
const notice = useNotice();
const stai = useStAI();
const { viewportTransform } = useCanvas();
const { currentImageId } = useImage();

const updateCanvas = () => {
	if (fabricCanvas) {
		fabricCanvas.setViewportTransform(viewportTransform.value);
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
		fabricCanvas.setWidth(width);
		fabricCanvas.setHeight(height);
	}
	updateCanvas();
};

const onObjectSelection = ({ e, selected = [], deselected = [] }) => {
	if (e) {
		editor.activeLayerIds = selected.map(({ id }) => id);
	}
	if (deselected.length) {
		deselected.forEach((object: any) => {
			object.switchControls('transform');
		});
	}
};
const onDoubleClick = ({ target }) => {
	if (target) {
		target.switchControls();
	}
};
const onMouseDown = ({ e: { button }, target }) => {
	editor.showContextMenu = false;
	if (button === 2 && editor.mode === 'select') {
		if (target?.selectable) {
			fabricCanvas.setActiveObject(target, {} as TPointerEvent);
		} else {
			fabricCanvas.discardActiveObject({} as TPointerEvent);
		}
		fabricCanvas.requestRenderAll();
	}
};
const onMouseUp = ({ e: { button }, target, pointer }) => {
	if (button === 2 && editor.mode === 'select') {
		if (target?.selectable) {
			editor.$patch({
				showContextMenu: true,
				contextMenuX: pointer.x,
				contextMenuY: pointer.y
			});
		} else {
			editor.showContextMenu = false;
		}
	}
};
const onObjectMoving = ({ target }) => {
	if (!editor.snap) {
		return;
	}

	const threshold = SNAP_THRESHOLD / Math.sqrt(editor.zoom);
	const m = editor.margin;
	const cw = project.width;
	const ch = project.height;
	const { width, height } = target.getBoundingRect(true);
	const ow2 = width / 2;
	const oh2 = height / 2;
	const hGuides = [m, cw / 2, cw - m];
	const vGuides = [m, ch / 2, ch - m];
	let { left, top } = target;

	fabricCanvas.ereaseHelperLine();

	hGuides.forEach((v) => {
		const isACenter = isAround(left, v, threshold);
		const isALeft = isAround(left - ow2, v, threshold);
		const isARight = isAround(left + ow2, v, threshold);

		if (isACenter || isALeft || isARight) {
			fabricCanvas.drawHelperLine('h', v);
		}

		left = isACenter ? v : isALeft ? v + ow2 : isARight ? v - ow2 : left;
	});
	vGuides.forEach((v) => {
		const isAMiddle = isAround(top, v, threshold);
		const isATop = isAround(top - oh2, v, threshold);
		const isABottom = isAround(top + oh2, v, threshold);

		if (isAMiddle || isATop || isABottom) {
			fabricCanvas.drawHelperLine('v', v);
		}

		top = isAMiddle ? v : isATop ? v + oh2 : isABottom ? v - oh2 : top;
	});

	target.set({ left, top });
};
const onObjectModified = ({ target }) => {
	// Erease helper drawn on object moving.
	fabricCanvas.ereaseHelperLine();
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
		// const ids = editor.activeLayerIds.concat();
		editor.activeLayerIds = [];
		project.updateProps(newProps);
		/* setTimeout(() => {
			editor.activeLayerIds = ids;
		}, 20); */
		return;
	}

	const {
		id,
		left,
		top,
		scaleX,
		scaleY,
		skewX,
		skewY,
		angle,
		width,
		height,
		cropX,
		cropY,
		rx,
		ry,
		radius,
		text,
		path,
		points
	} = target;
	const newProps = {
		left: toFixed(left, 0),
		top: toFixed(top, 0),
		scaleX: toFixed(scaleX, 2),
		scaleY: toFixed(scaleY, 2),
		skewX: toFixed(skewX, 0),
		skewY: toFixed(skewY, 0),
		angle: toFixed(angle, 0),
		width: toFixed(width, 0),
		height: toFixed(height, 0),
		cropX: toFixed(cropX, 0),
		cropY: toFixed(cropY, 0),
		rx: toFixed(rx, 0),
		ry: toFixed(ry, 0),
		radius: toFixed(radius, 0),
		text,
		path,
		points
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
const onTextChanged = ({ target }) => {
	const { id, text, width, height } = target;
	project.updateProps(id, {
		text,
		width,
		height
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
	fabricCanvas.showMargin = editor.showMargin;
	fabricCanvas.margin = editor.margin;
	fabricCanvas.snap = editor.snap;
	// @ts-ignore
	fabricCanvas.on('selection:created', onObjectSelection);
	// @ts-ignore
	fabricCanvas.on('selection:updated', onObjectSelection);
	// @ts-ignore
	fabricCanvas.on('selection:cleared', onObjectSelection);
	// @ts-ignore
	fabricCanvas.on('mouse:dblclick', onDoubleClick);
	// @ts-ignore
	fabricCanvas.on('mouse:down', onMouseDown);
	// @ts-ignore
	fabricCanvas.on('mouse:up', onMouseUp);
	fabricCanvas.on('object:moving', onObjectMoving);
	fabricCanvas.on('object:modified', onObjectModified);
	fabricCanvas.on('path:created', onPathCreated);
	fabricCanvas.on('text:changed', onTextChanged);
	// @ts-ignore
	window._fc = fabricCanvas;
	editor.width = clientWidth;
	editor.height = clientHeight;
	updateCanvas();
});

onUnmounted(() => {
	fabricCanvas.destroy();
	// @ts-ignore
	fabricCanvas.off('selection:created', onObjectSelection);
	// @ts-ignore
	fabricCanvas.off('selection:updated', onObjectSelection);
	// @ts-ignore
	fabricCanvas.off('selection:cleared', onObjectSelection);
	// @ts-ignore
	fabricCanvas.off('mouse:dblclick', onDoubleClick);
	fabricCanvas.off('mouse:down', onMouseDown);
	fabricCanvas.off('mouse:up', onMouseUp);
	fabricCanvas.off('object:moving', onObjectMoving);
	fabricCanvas.off('object:modified', onObjectModified);
	fabricCanvas.off('path:created', onPathCreated);
	fabricCanvas.off('text:changed', onTextChanged);
});

watch(
	(): [string[], any] => [toRaw(project.ids), project.byIds],
	debounce(([newIds], [oldIds]) => {
		const newLayers: any[] = [];

		newIds.forEach((id) => {
			const object: any = fabricCanvas.getObjectById(id);
			const layer = project.getFirstLayer(id);
			if (object) {
				const { id: _id, type: _type, filters, src, ..._layer } = layer;
				object.set(_layer).setCoords();
				if (_type === 'Image') {
					// Set src
					if (object.src !== src) {
						object.setSrc(src).then(() => {
							object.setCoords();
							fabricCanvas.requestRenderAll();
						});
					}
					// Set filters
					if (filters?.length) {
						util.enlivenObjects(toRaw(filters))
							.then((response) => {
								// @ts-ignore
								object.applyFilters(response);
							})
							.catch(console.warn);
					} else {
						object.applyFilters([]);
					}
				} else if (_type === 'QRCode') {
					object.updateImage().then(() => {
						fabricCanvas.requestRenderAll();
					});
				} else if (_type === 'Group') {
					object.forEachObject((child) => {
						const { id, type, ..._layer } = project.getFirstLayer(child.id);
						child.set(_layer);
					});
				}
			} else {
				if (layer.type === 'Group') {
					newLayers.push({
						...layer,
						objects: (layer.childIds || []).map((id) => project.getFirstLayer(id))
					});
				} else {
					newLayers.push(layer);
				}
			}
		});

		if (newLayers.length) {
			util.enlivenObjects(newLayers)
				.then((objects: any) => {
					fabricCanvas.add(...objects);
					editor.loading = false;
				})
				.catch((error) => {
					notice.send('Can not loading some layers.', 'error');
					editor.loading = false;
					console.warn(error);
				});
		} else {
			editor.loading = false;
		}

		// Remove old objects.
		oldIds.forEach((id) => {
			if (!newIds.includes(id)) {
				const object = fabricCanvas.getObjectById(id);
				if (object) {
					fabricCanvas.remove(object);
				}
			}
		});

		// Resort layers in stack if it is needed.
		if (newIds.length === oldIds.length && JSON.stringify(newIds) !== JSON.stringify(oldIds)) {
			fabricCanvas.sortObjectsByIds(newIds);
		}

		fabricCanvas.requestRenderAll();
	}, 200),
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
	([newMode, newPencil, newWidth, newColor]) => {
		fabricCanvas.setPencil(newPencil);
		fabricCanvas.isDrawingMode = newMode === 'draw';
		fabricCanvas.freeDrawingBrush!.width = newWidth;
		fabricCanvas.freeDrawingBrush!.color = newColor;
	}
);
watch(
	(): [boolean, number, boolean] => [editor.showMargin, editor.margin, editor.snap],
	([newShowMargin, newMargin, newSnap]) => {
		fabricCanvas.showMargin = newShowMargin;
		fabricCanvas.margin = newMargin;
		fabricCanvas.snap = newSnap;
		fabricCanvas.requestRenderAll();
	}
);
watch(
	() => editor.activeLayerIds,
	(newIds) => {
		fabricCanvas.setActiveObjectsByIds(newIds);
	}
);
watch(
	() => stai.alphaMask,
	(newAlphaMask) => {
		const img = fabricCanvas.getObjectById(currentImageId.value);
		if (!img) {
			return;
		}
		// @ts-ignore
		img.setAlphaMask(newAlphaMask);
	}
);
</script>

<template>
	<div id="canvas" class="canvas" v-dom-resize="onResize">
		<canvas ref="canvasRef" />
	</div>
</template>

<style scoped lang="scss">
.canvas {
	position: relative;
	width: 100%;
	height: 100%;
}
</style>
