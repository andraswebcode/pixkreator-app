import { IText } from 'fabric';
import { Defaults } from '../mixins/defaults';
import FontFaceObserver from 'fontfaceobserver';
import { loadGoogleFonts } from '../../utils/load-gfonts';

/*
const createCirclePath = (radius: number, curve: number) => {
	const centerX = 0;
	const centerY = 0;

	const sweepFlag = curve > 0 ? 1 : 0;

	return `
        M ${centerX} ${centerY - radius} 
        A ${radius} ${radius} 0 1 ${sweepFlag} ${centerX} ${centerY + radius}
        A ${radius} ${radius} 0 1 ${sweepFlag} ${centerX} ${centerY - radius}
    `;
};
*/

class PROIText extends Defaults(IText) {
	/*
	private _curve = 0;
	private _radius = 0;
	
	get curve() {
		return this._curve;
	}

	set curve(value: number) {
		this._curve = value;
		this._radius = 8000 / value;
		this.editable = !value;

		const path = value
			? new PROPath(createCirclePath(this._radius, this._curve), {
					//visible: false,
					selectable: false,
					fill: null,
					strokeWidth: 1,
					stroke: 'black'
			  })
			: undefined;

		let pso = 0;

		try {
			pso = this.calcTextWidth();
		} catch (e) {
			//
		}

		this.set({
			path,
			pathStartOffset: pso
		});
	}
*/
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

	// calcOwnMatrix(): TMat2D {}
}

export { PROIText };
