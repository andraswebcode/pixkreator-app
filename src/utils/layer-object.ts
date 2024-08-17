import {
	Circle,
	Ellipse,
	FabricImage,
	Group,
	IText,
	Path,
	Polygon,
	Polyline,
	Rect,
	util
} from 'fabric';

export function createLayerObject(
	options: any = {},
	fabricObject = false,
	callback?: (obj: any) => void
) {
	let object;

	switch (options.type) {
		case 'image':
			object = new FabricImage('', options);
			// Get src from xlink:href if we load image from SVG.
			object.setSrc(
				options.src || options['xlink:href'],
				() => {
					callback && callback(object);
				},
				{
					crossOrigin: 'anonymus' // To be able to load external images.
				}
			);
			break;
		case 'text':
		case 'i-text':
		case 'textbox':
			object = new IText(options.text, options);
			callback && callback(object);
			break;
		case 'rect':
			object = new Rect(options);
			callback && callback(object);
			break;
		case 'circle':
			object = new Circle(options);
			callback && callback(object);
			break;
		case 'ellipse':
			object = new Ellipse(options);
			callback && callback(object);
			break;
		case 'path':
			object = new Path(
				Array.isArray(options.path) ? util.joinPath(options.path) : options.path,
				options
			);
			callback && callback(object);
			break;
		case 'polygon':
			object = new Polygon(options.points, options);
			callback && callback(object);
			break;
		case 'polyline':
			object = new Polyline(options.points, options);
			callback && callback(object);
			break;
		case 'qrcode':
			// object = new QRCode(options);
			// callback && callback(object);
			break;
		case 'group':
			const promises = [];
			const _objects =
				options.objects
					?.map((obj) => {
						let _obj;
						promises.push(
							new Promise<void>((resolve) => {
								_obj = createLayerObject(obj, true, () => resolve());
							})
						);
						return _obj;
					})
					.filter((obj) => !!obj) || [];
			object = new Group(_objects, options);
			// Using Promise.all() for running callback() to make sure that all images in group has been loaded.
			Promise.all(promises).then(() => {
				callback && callback(object);
			});
			break;
		default:
			break;
	}

	if (fabricObject && options.clipPath) {
		object.clipPath = createLayerObject(options.clipPath, true, callback);
	}
	if (fabricObject && options.filters?.length) {
		object.filters = options.filters.map((filter) =>
			FabricImage.filters.BaseFilter.fromObject(filter)
		);
	}

	return fabricObject ? object : object.toObject();
}
