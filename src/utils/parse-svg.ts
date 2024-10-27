import { Group, loadSVGFromURL } from 'fabric';

const parseSVG = (url: string) => {
	return loadSVGFromURL(url).then(({ objects, options }) => {
		const group = new Group(objects as any);
		return {
			layers: objects.map((obj) => obj?.toJSON()),
			group: group.toJSON(),
			width: options.width,
			height: options.height
		};
	});
};

export { parseSVG };
