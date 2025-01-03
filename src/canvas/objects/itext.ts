import { cache, IText, Textbox, TPathAlign } from 'fabric';
import { Defaults } from '../mixins/defaults';
import FontFaceObserver from 'fontfaceobserver';
import { loadGoogleFonts } from '../../utils/load-gfonts';
import { PROPath } from './path';
import { TextWrapControl } from '../controls/textwrap';

class PROIText extends Defaults(IText) {
	pathAlign: TPathAlign = 'center';

	private _curve = 0;

	_wordJoiners = /[ \t\r]/;
	dynamicMinWidth = 2;
	_wrapText = Textbox.prototype._wrapText;
	_wrapLine = Textbox.prototype._wrapLine;
	_measureWord = Textbox.prototype._measureWord;
	getGraphemeDataForRender = Textbox.prototype.getGraphemeDataForRender;
	wordSplit = Textbox.prototype.wordSplit;

	get curve() {
		return this._curve;
	}

	set curve(value: number) {
		this._curve = value || 0;
		this.editable = !value;

		let lineWidth = 0;

		try {
			lineWidth = this.calcTextWidth();
		} catch (e) {
			//
		}

		const radius = 8000 / this._curve;
		const path = this._curve
			? new PROPath(_createArcPath(lineWidth, radius), {
					visible: false
			  })
			: undefined;

		this.set('path', path);
	}

	_set(key: string, value: any) {
		this.originX = 'center';
		this.originY = 'center';
		return super._set(key, value);
	}

	_getModifyControls() {
		return {
			ml: new TextWrapControl({
				x: -0.5,
				y: 0
			}),
			mr: new TextWrapControl({
				x: 0.5,
				y: 0
			})
		};
	}

	// @ts-ignore
	toObject(propertiesToInclude?: string[] = []): any {
		const object = super.toObject(propertiesToInclude.concat(['curve']));
		delete object.path;
		return object;
	}

	static _fromObject<S extends any>(object: any, options?: any) {
		const family = object.fontFamily || 'Arial';
		// @ts-ignore
		const superPromise = super._fromObject<S>(object, options);
		const ffo = new FontFaceObserver(family);
		const fontPromise = ffo.load(null, 2000);

		loadGoogleFonts([{ family }]);

		return Promise.all([superPromise, fontPromise]).then(([s]) => {
			cache.clearFontCache(family);
			s.initDimensions();
			s.set('curve', object.curve);
			return s;
		});
	}
}

function _createArcPath(arcLength, radius) {
	const absRadius = Math.abs(radius);
	const angleRadians = arcLength / absRadius;
	const x = absRadius * Math.sin(angleRadians / 2);
	let y = absRadius * (1 - Math.cos(angleRadians / 2));

	if (radius < 0) {
		y = -y;
	}

	const largeArcFlag = angleRadians > Math.PI ? 1 : 0;

	return `M ${-x},${-y} A ${absRadius},${absRadius} 0 ${largeArcFlag} ${
		radius < 0 ? 0 : 1
	} ${x},${-y}`;
}

export { PROIText };
