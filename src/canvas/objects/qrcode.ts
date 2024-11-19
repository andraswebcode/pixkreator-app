import { FabricObject, FabricObjectProps, TClassProperties, util } from 'fabric';
import { Defaults } from '../mixins/defaults';
import QRCodeStyling, { Options } from 'qr-code-styling';
import { WEBSITE_URL } from '../../utils/constants';
import { QRCodeOptions } from '../../types/apps';

interface QRCodeProps extends QRCodeOptions, FabricObjectProps {}

const QRCODE_PROPS = ['text', 'size'] as const;

const qrCodeDefaultValues: Partial<TClassProperties<PROQRCode>> = {
	text: WEBSITE_URL,
	size: 300
};

class PROQRCode extends Defaults(FabricObject) implements QRCodeProps {
	declare text: string;
	declare size: number;

	private _element = new Image();

	private _qrCode: QRCodeStyling | null = null;

	static type = 'QRCode';

	static cacheProperties = [...FabricObject.cacheProperties, ...QRCODE_PROPS];

	static ownDefaults = qrCodeDefaultValues;

	static getDefaults(): Record<string, any> {
		return {
			...super.getDefaults(),
			...PROQRCode.ownDefaults
		};
	}

	static fromObject(object, options) {
		return super
			.fromObject(object, options)
			.then((obj: any) => obj.updateImage().then(() => obj));
	}

	constructor(options?: QRCodeProps) {
		super();
		this.setOptions({
			...PROQRCode.ownDefaults,
			...options
		});
		this._initQRCode();
	}

	updateImage() {
		this._qrCode?.update(this._getQRCodeOptions());
		return this._qrCode?.getRawData('png').then((blob) => {
			return util.loadImage(URL.createObjectURL(blob)).then((img) => {
				this._element = img;
			});
		});
	}

	_set(key: string, value: any) {
		super._set(key, value);

		switch (key) {
			case 'size':
				this.size = value;
				this.set({
					width: value,
					height: value
				});
				break;
			default:
				break;
		}
		return this;
	}

	_render(ctx: CanvasRenderingContext2D) {
		ctx.drawImage(this._element, -this.width / 2, -this.height / 2);
	}

	toObject(propertiesToInclude: string[] = []) {
		return super.toObject([...propertiesToInclude, ...QRCODE_PROPS]);
	}

	_toSVG(): string[] {
		return [];
	}

	private _initQRCode() {
		this._qrCode = new QRCodeStyling(this._getQRCodeOptions());
	}

	private _getQRCodeOptions(): Partial<Options> {
		return {
			data: this.text || WEBSITE_URL,
			width: this.size,
			height: this.size
		};
	}
}

export { PROQRCode };
