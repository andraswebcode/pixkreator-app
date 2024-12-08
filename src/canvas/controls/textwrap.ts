import { controlsUtils } from 'fabric';
import { ResizeControl } from './resize';

class TextWrapControl extends ResizeControl {
	actionHandler(_eventData, transformData, x, y) {
		const fabricObject = transformData.target;
		const pointerLocalPosition = controlsUtils.getLocalPoint(
			transformData,
			'center',
			'center',
			x,
			y
		);
		const { width, scaleX } = fabricObject;
		const newWidth = Math.abs((pointerLocalPosition.x * 2) / scaleX);
		const textToOneLine = fabricObject.text.replace(/\n/g, ' ');
		const graphemeLines = fabricObject._wrapText([textToOneLine], newWidth);
		const newText = graphemeLines.map((line) => line.join('')).join('\n');

		// fabricObject.width = newWidth;
		fabricObject.set('text', newText);

		return width !== newWidth;
	}
}

export { TextWrapControl };
