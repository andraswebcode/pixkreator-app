import { IText } from 'fabric';
import { Defaults } from '../mixins/defaults';
import FontFaceObserver from 'fontfaceobserver';
import { loadGoogleFonts } from '../../utils/load-gfonts';

class PROIText extends Defaults(IText) {
	_set(key: string, value: any) {
		this.originX = 'center';
		this.originY = 'center';
		return super._set(key, value);
	}

	static _fromObject<S extends any>(object: any, options?: any) {
		const family = object.fontFamily || 'Arial';
		// @ts-ignore
		const superPromise = super._fromObject<S>(object, options);
		const ffo = new FontFaceObserver(family);
		const fontPromise = ffo.load(null, 2000);

		loadGoogleFonts([{ family }]);

		return Promise.all([superPromise, fontPromise]).then(([s]) => s);
	}
}

export { PROIText };
