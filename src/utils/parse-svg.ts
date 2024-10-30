import { Group, loadSVGFromURL } from 'fabric';

const parseSVG = (url: string) => {
	return loadSVGFromURL(url).then(({ objects, options }) => {
		const layers = objects.map((o) => o?.toJSON());
		const group = new Group(objects as any, {
			left: 0,
			top: 0
		});
		const groupLayer = group.toJSON();
		groupLayer.objects = groupLayer.objects.map((object) => ({
			...object,
			left: object.left + (object.width * object.scaleX) / 2,
			top: object.top + (object.height * object.scaleY) / 2
		}));
		console.log(groupLayer);

		return {
			layers: layers,
			group: groupLayer,
			width: options.width,
			height: options.height
		};
	});
};

export { parseSVG };
