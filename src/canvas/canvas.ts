import { Canvas as FabricCanvas, ModifierKey } from 'fabric';

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

	getObjectById(id = '') {
		// @ts-ignore
		return this._objects.find((obj) => obj.id === id);
	}
}

export default Canvas;
