import { Canvas as FabricCanvas, ModifierKey } from 'fabric';
import { unique } from '../utils/functions';
import { PROPencilBrush } from './brushes/pencil';
import { PROActiveSelection } from './objects/active-selection';
import { EditorPencilType } from '../store/editor';
import { PRORectBrush } from './brushes/rect';
import { PROEllipseBrush } from './brushes/ellipse';

class Canvas extends FabricCanvas {
	selectionColor = 'rgba(16, 187, 229, 0.1)';
	selectionBorderColor = '#10BBE5';
	selectionDashArray = [4, 2];
	preserveObjectStacking = true;
	controlsAboveOverlay = true;
	// perPixelTargetFind = true;
	targetFindTolerance = 10;
	stopContextMenu = true;
	fireRightClick = true;
	selectionKey: ModifierKey = 'ctrlKey';
	altActionKey: ModifierKey = 'ctrlKey';
	uniScaleKey = null;

	showMargin = true;
	margin = 20;
	snap = true;
	marginColor = '#EEEEEE';
	marginDashArray = [1, 5];
	helperLineColor = '#10BBE5';
	helperDashArray = [1, 5];

	constructor(el?, options?) {
		super(el, options);
		this.freeDrawingBrush = new PROPencilBrush(this);
	}

	setPencil(pencil: EditorPencilType) {
		switch (pencil) {
			case 'rect':
				this.freeDrawingBrush = new PRORectBrush(this);
				break;
			case 'ellipse':
				this.freeDrawingBrush = new PROEllipseBrush(this);
				break;
			default:
				this.freeDrawingBrush = new PROPencilBrush(this);
				break;
		}
	}

	getObjectById(id = '') {
		// @ts-ignore
		return this._objects.find((obj) => obj.id === id);
	}

	setActiveObjectsByIds(ids: string[] = []) {
		if (!ids.length) {
			this.discardActiveObject();
			this.requestRenderAll();
			return;
		}

		const objects = unique(ids)
			.map((id) => this.getObjectById(id))
			.filter((obj) => !!obj);

		if (objects.length === 1) {
			this.setActiveObject(objects[0]);
			this.requestRenderAll();
			return;
		}

		const activeSelection = new PROActiveSelection(objects, {
			canvas: this
		});

		this.setActiveObject(activeSelection);
		this.requestRenderAll();
	}

	sortObjectsByIds(ids: string[] = []) {
		ids.forEach((id, index) => {
			const object = this.getObjectById(id);
			if (object) {
				this.moveObjectTo(object, index);
			}
		});

		return this;
	}

	getSceneSize() {
		const { width = 0, height = 0 } = this.clipPath || {};
		return { width, height };
	}

	drawHelperLine(orientation: 'h' | 'v', position: number) {
		const ctx = this.getTopContext();
		const vpt = this.viewportTransform;
		const { width, height } = this.getSceneSize();
		const isH = orientation === 'h';
		const mx = isH ? position : 0;
		const my = isH ? 0 : position;
		const lx = isH ? position : width;
		const ly = isH ? height : position;

		ctx.save();
		ctx.transform(...vpt);

		ctx.beginPath();
		ctx.moveTo(mx, my);
		ctx.lineTo(lx, ly);

		ctx.lineWidth = 1 / this.getZoom();
		ctx.strokeStyle = this.helperLineColor;
		ctx.setLineDash(this.helperDashArray);
		ctx.stroke();

		ctx.restore();
	}

	ereaseHelperLine() {
		this.clearContext(this.getTopContext());
	}

	_renderBackgroundOrOverlay(
		ctx: CanvasRenderingContext2D,
		property: 'background' | 'overlay'
	): void {
		super._renderBackgroundOrOverlay(ctx, property);
		if (property === 'background' && this.showMargin) {
			this._renderMarginHelper(ctx);
		}
	}

	_renderMarginHelper(ctx: CanvasRenderingContext2D) {
		const m = this.margin;
		const vpt = this.viewportTransform;
		const { width, height } = this.getSceneSize();

		ctx.save();
		ctx.transform(...vpt);

		ctx.beginPath();
		ctx.moveTo(m, m);
		ctx.lineTo(width - m, m);
		ctx.lineTo(width - m, height - m);
		ctx.lineTo(m, height - m);
		ctx.closePath();

		ctx.lineWidth = 1 / this.getZoom();
		ctx.strokeStyle = this.marginColor;
		ctx.setLineDash(this.marginDashArray);
		ctx.stroke();

		ctx.restore();
	}
}

export default Canvas;
