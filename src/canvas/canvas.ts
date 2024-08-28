import { ActiveSelection, Canvas as FabricCanvas, ModifierKey } from 'fabric';
import { unique } from '../utils/functions';
import { PROPencilBrush } from './brushes/pencil';

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

	constructor(el?, options?) {
		super(el, options);
		this.freeDrawingBrush = new PROPencilBrush(this);
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

		const activeSelection = new ActiveSelection(objects, {
			canvas: this
		});

		this.setActiveObject(activeSelection);
		this.requestRenderAll();
	}
}

export default Canvas;
