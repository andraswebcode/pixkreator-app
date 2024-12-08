import { Control, controlsUtils } from 'fabric';

class ResizeControl extends Control {
	constructor(options = {}) {
		super(options);
		this.actionName = 'resize';
		this.sizeX = this.x ? 4 : 12;
		this.sizeY = this.y ? 4 : 12;
	}

	render(ctx, left, top, styleOverride, fabricObject) {
		controlsUtils.renderSquareControl.call(this, ctx, left, top, styleOverride, fabricObject);
	}

	// @ts-ignore
	actionHandler(_eventData, transformData, x, y) {
		const fabricObject = transformData.target;
		const currentControl = fabricObject.controls[transformData.corner];
		const pointerLocalPosition = controlsUtils.getLocalPoint(
			transformData,
			'center',
			'center',
			x,
			y
		);
		const { width, height, scaleX, scaleY } = fabricObject;
		const newWidth = Math.abs((pointerLocalPosition.x * 2) / scaleX);
		const newHeight = Math.abs((pointerLocalPosition.y * 2) / scaleY);

		if (currentControl.x) {
			if (fabricObject.type === 'circle') {
				fabricObject.radius = newWidth / 2;
				fabricObject.width = newWidth;
				fabricObject.height = newWidth;
			} else {
				fabricObject.width = newWidth;
				if (fabricObject.type === 'ellipse') {
					fabricObject.rx = newWidth / 2;
				}
			}
		} else if (currentControl.y) {
			if (fabricObject.type === 'circle') {
				fabricObject.radius = newHeight / 2;
				fabricObject.width = newHeight;
				fabricObject.height = newHeight;
			} else {
				fabricObject.height = newHeight;
				if (fabricObject.type === 'ellipse') {
					fabricObject.ry = newHeight / 2;
				}
			}
		}

		return width !== newWidth || height !== newHeight;
	}

	cursorStyleHandler(eventData, control, fabricObject) {
		return controlsUtils.scaleCursorStyleHandler(eventData, control, fabricObject);
	}
}

export { ResizeControl };
