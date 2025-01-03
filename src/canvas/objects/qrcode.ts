import { FabricObject, FabricObjectProps, TClassProperties, util } from 'fabric';
import { Defaults } from '../mixins/defaults';
import QRCodeStyling, {
	CornerDotType,
	CornerSquareType,
	DotType,
	ErrorCorrectionLevel,
	Options
} from 'qr-code-styling';
import { WEBSITE_URL } from '../../utils/constants';
import { QRCodeOptions } from '../../types/apps';

interface QRCodeProps extends QRCodeOptions, FabricObjectProps {}

const QRCODE_PROPS = [
	'text',
	'size',
	'margin',
	'ecl',
	'background',
	'imageSrc',
	'imageSize',
	'imageMargin',
	'dotsType',
	'dotsColor',
	'cornerSquareType',
	'cornerSquareColor',
	'cornerDotType',
	'cornerDotColor'
] as const;

const qrCodeDefaultValues: Partial<TClassProperties<PROQRCode>> = {
	text: WEBSITE_URL,
	size: 300,
	margin: 0,
	ecl: 'Q'
};

class PROQRCode extends Defaults(FabricObject) implements QRCodeProps {
	declare text: string;
	declare size: number;
	declare margin: number;
	declare ecl: ErrorCorrectionLevel;
	declare background: string;
	declare imageSrc: string;
	declare imageSize: number;
	declare imageMargin: number;
	declare dotsType: DotType;
	declare dotsColor: string;
	declare cornerSquareType: '' | CornerSquareType;
	declare cornerSquareColor: string;
	declare cornerDotType: '' | CornerDotType;
	declare cornerDotColor: string;

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
			height: this.size,
			margin: this.margin,
			image: this.imageSrc,
			qrOptions: {
				errorCorrectionLevel: this.ecl
			},
			backgroundOptions: {
				color: this.background
			},
			imageOptions: {
				imageSize: this.imageSize,
				margin: this.imageMargin,
				crossOrigin: 'anonymus'
			},
			dotsOptions: {
				type: this.dotsType,
				color: this.dotsColor
			},
			cornersSquareOptions: this.cornerSquareType
				? {
						type: this.cornerSquareType,
						color: this.cornerSquareColor
				  }
				: undefined,
			cornersDotOptions: this.cornerDotType
				? {
						type: this.cornerDotType,
						color: this.cornerDotColor
				  }
				: undefined
		};
	}
}

export { PROQRCode };
