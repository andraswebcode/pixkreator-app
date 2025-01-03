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
		flipX: 'boolean',
		flipY: 'boolean',
		width: 'number',
		height: 'number',
		rx: 'number',
		ry: 'number',
		radius: 'number',
		cropX: 'number',
		cropY: 'number',
		strokeWidth: 'number',
		strokeDashArray: 'numberArray',
		strokeDashOffset: 'number'
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

	// @ts-ignore
	private _numberArray(value: any): number[] {
		if (!Array.isArray(value)) {
			return [];
		}
		return value.map((v) => toFixed(v));
	}

	// @ts-ignore
	private _boolean(value: any): boolean {
		return !!value;
	}
}

const _sanitizer = new Sanitizer();

const sanitize = (property: string, value: any) => _sanitizer.sanitize(property, value);

export { sanitize };
