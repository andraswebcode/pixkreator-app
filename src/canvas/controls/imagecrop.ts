import { controlsUtils } from 'fabric';
import { clamp } from '../../utils/functions';
import { ResizeControl } from './resize';

class ImageCropControl extends ResizeControl {
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
		const { scaleX, scaleY } = fabricObject;
		const element = fabricObject.getElement();

		if (currentControl.x) {
			const width = (Math.abs(pointerLocalPosition.x) * 2) / scaleX;
			fabricObject.width = clamp(width, 0, element.width);
			fabricObject.cropX = (element.width - fabricObject.width) / 2;
		} else if (currentControl.y) {
			const height = (Math.abs(pointerLocalPosition.y) * 2) / scaleY;
			fabricObject.height = clamp(height, 0, element.height);
			fabricObject.cropY = (element.height - fabricObject.height) / 2;
		}

		return true;
	}
}

export { ImageCropControl };
