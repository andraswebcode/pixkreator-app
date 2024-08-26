import { StaticCanvas } from 'fabric';
import { MimeType } from '../types/common';

const jsonToBlob = (
	json: { width: number; height: number; background?: string; objects: any[] } = {
		width: 1,
		height: 1,
		objects: []
	},
	type: MimeType = 'image/webp',
	quality = 1
): Promise<Blob> => {
	return new StaticCanvas().loadFromJSON(json).then((response) => {
		const canvas = response.toCanvasElement();

		return new Promise((resolve, reject) => {
			canvas.toBlob(
				(blob) => {
					if (blob) {
						resolve(blob);
					} else {
						reject();
					}
				},
				type,
				quality
			);
		});
	});
};

export { jsonToBlob };
