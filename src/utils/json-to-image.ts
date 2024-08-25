import { StaticCanvas } from 'fabric';

const jsonToImage = (
	json: { width: number; height: number; objects: any[] } = {
		width: 1,
		height: 1,
		objects: []
	}
): Promise<string> => {
	return new StaticCanvas()
		.loadFromJSON(
			json /*, (_json, obj) => {
			// @ts-ignore
			obj.set({
				originX: 'left',
				originY: 'top',
				left: _json.left + json.width / 2,
				top: _json.top + json.height / 2
			});
		}*/
		)
		.then((response) => response.toDataURL());
};

export { jsonToImage };
