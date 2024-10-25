import { toFixed } from './functions';

class Sanitizer {
	private _types = {
		left: 'number',
		top: 'number',
		scaleX: 'number',
		scaleY: 'number',
		skewX: 'number',
		skewY: 'number',
		angle: 'number',
		width: 'number',
		height: 'number',
		cropX: 'number',
		cropY: 'number',
		strokeWidth: 'number'
	};

	public sanitize(property: string, value: any): any {
		const type = this._types[property];

		if (!type) {
			return value;
		}

		const fn = this['_' + type];

		if (!fn) {
			return value;
		}

		return fn(value);
	}

	// @ts-ignore
	private _number(value: any): number {
		return toFixed(value);
	}
}

const _sanitizer = new Sanitizer();

const sanitize = (property: string, value: any) => _sanitizer.sanitize(property, value);

export { sanitize };
